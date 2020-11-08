CREATE PROCEDURE GETOBJETS
AS
BEGIN 
	SELECT * FROM objet
END

CREATE PROCEDURE SEOJETS
@co as varchar(50),
@desig as varchar(50),
@qty as int 
AS
BEGIN
 INSERT INTO objet VALUES(@co,@desig,@qty)
END

CREATE PROCEDURE DELETEOBJET
@code_objet as varchar(50)
AS
BEGIN
	DELETE FROM objet where code_objet = @code_objet
END
 
/*Create type objet*/

ALTER PROCEDURE InsertDemandeFourniture
	@userID AS varchar(50),
	@demande_id AS int output,
	@FID AS int OUTPUT,--for notif
	@recevoir_ID as varchar(max) OUTPUT,--for notif
    @DDATE AS DateTime OUTPUT
AS
BEGIN 
	INSERT INTO demande 
	VALUES (	(SELECT CONVERT (datetime, SYSDATETIME())),
				@userID,
				'Chef Departement', 
				null,
				0,
				1)
	SELECT @DDATE = CONVERT (datetime, SYSDATETIME())
	INSERT INTO demande_fourniture 
	VALUES (	(SELECT IDENT_CURRENT('demande')), 
				null);
	SELECT @demande_id = IDENT_CURRENT('demande')
		
	DECLARE @email as varchar(max) 
	SELECT @email = U.email
	FROM utilisateurs U , (
		SELECT U.structure , U.departement
		FROM utilisateurs U
		WHERE U.email = @userID	
	)as I
	WHERE I.structure = U.structure
	AND I.departement = U.departement
	AND U.typeUtilisateur = 'Chef departement'
	EXECUTE CREE_NOTIFICATION @demande_id, @email ,'est effecuté(e) une nouvelle demande fourniture', 'edit'
	--for Notif--
	SELECT @FID = IDENT_CURRENT('notification')
	set @recevoir_ID = @email
END

ALTER PROCEDURE InserObjetOftDemandeFourniture
    @demande_id as int, 
	@code_objet as varchar(6),
	@qty_demande as int 
AS
BEGIN
	INSERT INTO demande_fourniture_object(demande_F_ID , code_object , qty_demande)
		VALUES (@demande_id,@code_objet,@qty_demande)
END

--------------------------------------------------------------------------------------------

ALTER PROCEDURE GetObjetOftDemandeFourniture
	@demande_f_id as int
AS
BEGIN
	SELECT 
		DFC.demande_F_ID ,DFC.code_object ,  O.designation , DFC.qty_demande
	FROM demande_fourniture_object  DFC , objet O
	WHERE DFC.demande_F_ID = @demande_f_id
	AND O.code_object = DFC.code_object
END

Execute GetObjetOftDemandeFourniture 1133


Execute GetObjetOftDemandeFourniture 1130

ALTER PROCEDURE deleteObjetOftDemandeFourniture
    @demande_id as int,
	@NID AS int OUTPUT,--For notif
	@recevoir_ID as varchar(max) OUTPUT--For notif
AS
BEGIN
	DELETE  FROM demande_fourniture_object where demande_F_ID = @demande_id
	DECLARE @describ  varchar(max);
	SELECT @recevoir_ID = email
	FROM demande D , utilisateurs U
	WHERE D.utilisateurs_ID = U.email
	AND D.demande_ID = @demande_id
	SELECT @recevoir_ID = dbo.GetChefDepartement(@recevoir_ID) --for notif
	SELECT @NID = dbo.GetNotifID(@demande_id);-- for notif
	SELECT @describ = 'est modifé(e) la demande fourniture numéro '+ CONVERT(Varchar(max) , @demande_id)    
	Execute Update_NOTIFICATION @demande_id , @recevoir_ID , @describ
END
ALTER PROCEDURE deleteDemandeFourniture
    @id as int,
	@typedelete as bit output,
	@recevoir_ID as varchar(max) OUTPUT--For notif
AS
BEGIN
	Declare @etat  varchar(max)
	select @etat = D.etat 
	From demande D
	where D.demande_ID = @id
	IF(@etat='Acceptee'or @etat='Rejetee')
	BEGIN
		Update demande
		set shown = 0
		where demande_ID = @id;
		set @typedelete = 0;
	END
	ELSE
	BEGIN
		SELECT @recevoir_ID = dbo.GetChefDepartementByDI(@id)--for notif
		DELETE FROM notification WHERE demande_ID = @id
		DELETE  FROM demande_fourniture_object where demande_F_ID = @id;
		DELETE  FROM demande_fourniture where demande_F_ID = @id;
		DELETE  FROM demande where demande_ID = @id;
		set @typedelete = 1;	
	END
END

