CREATE PROCEDURE InsertDemandeRelex
	@userID AS varchar(50),
	@destination AS varchar(max),
	@objet_mission as varchar(max),
	@date_depart as datetime,
	@date_retour as datetime,
	@prise_en_charge as bit ,
	@demande_V_ID as int,
	@DID AS int OUTPUT,
	@FID AS int OUTPUT,--for notif
	@recevoir_ID as varchar(max) OUTPUT,--for notif
	@DDATE AS datetime OUTPUT,
	@etat AS varchar(50)
AS
BEGIN
	INSERT INTO demande 
	VALUES (	(SELECT CONVERT (datetime, SYSDATETIME())),
				@userID,
				@etat, 
				null,
				0,
				1)
	SELECT 		@DDATE = CONVERT (datetime, SYSDATETIME())
	INSERT INTO demande_relex 
	VALUES (	(SELECT IDENT_CURRENT('demande')), 
				@destination,
				@objet_mission,
				@date_depart,
				@date_retour,
				@prise_en_charge,
				@demande_V_ID)
	SELECT 		@DID= IDENT_CURRENT('demande')
	--For notification--
	DECLARE @email as varchar(max) 
	IF (@etat = 'Directeur')
	BEGIN
		select	@email = dbo.GetDirecteurByDI(@DID);
	END
	ELSE IF (@etat = 'Acceptee')
	BEGIN
		select	@email = dbo.GetUserByType('Responsable AR');
	END
	ELSE IF (@etat = 'Chef Departement')
	BEGIN
		select	@email = dbo.GetChefDepartementByDI(@DID);
	END
	EXECUTE CREE_NOTIFICATION @DID,@email , 'est effecuté(e) une nouvelle demande activité relex' , 'hotel'
	SELECT @FID = IDENT_CURRENT('notification')
	set @recevoir_ID = @email
END

--------------------------------------
execute DeleteDemandeRelex 99
CREATE PROCEDURE DeleteDemandeRelex
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
		SELECT @recevoir_ID = dbo.GetRecevoirByDI(@id)--for notif
		DELETE FROM notification WHERE demande_ID = @id
		DELETE FROM demande_relex WHERE demande_R_ID = @id;
		DELETE FROM demande_vehicule WHERE demande_V_ID = (select demande_V_ID from demande_relex where demande_R_ID = @id );
		DELETE FROM demande WHERE demande_ID = @id
		set @typedelete = 1;
	END
END

-----------------------------------------------

CREATE PROCEDURE GetDemandeRelex
	@id as int
AS
BEGIN
	SELECT	DR.*,
			U.email,
			U.nomUtilisateur,
			U.prenomUtilisateur,
			U.departement,
			U.fonction,
			U.structure,
			D.*
	FROM	demande_relex DR, demande D, utilisateurs U
	WHERE	DR.demande_R_ID = D.demande_ID
	AND		D.utilisateurs_ID = U.email
	AND		DR.demande_R_ID = @id
END

-- update relex demande  --

CREATE PROCEDURE UpdateDemandeRelex
	@destination AS varchar(max),
	@objet_mission as varchar(max),
	@date_depart as datetime,
	@date_retour as datetime,
	@prise_en_charge as bit ,
	@demande_R_ID as int,
	@NID AS int OUTPUT,--For notif
	@recevoir_ID as varchar(max) OUTPUT,--For notif
	@etat AS varchar(max),--For notif
	@DDATE AS datetime OUTPUT
AS
BEGIN
	UPDATE demande_relex
	SET destination = @destination,
	objet_mission = @objet_mission,
	date_depart = @date_depart,
	date_retour = @date_retour,
	prise_en_charge = @prise_en_charge
	WHERE demande_R_ID = @demande_R_ID
	--Notif--
	DECLARE @describ  varchar(max);
	IF (@etat = 'Directeur')
	BEGIN
		select	@recevoir_ID = dbo.GetDirecteurByDI(@demande_R_ID);
	END
	ELSE IF (@etat = 'Acceptee')
	BEGIN
		select	@recevoir_ID = dbo.GetUserByType('Responsable AR');
	END
	ELSE IF (@etat = 'Chef Departement')
	BEGIN
		select	@recevoir_ID = dbo.GetChefDepartementByDI(@demande_R_ID);
	END
	SELECT @recevoir_ID = dbo.GetChefDepartement(@recevoir_ID) --for notif
	SELECT @NID = dbo.GetNotifID(@demande_R_ID);-- for notif
	SELECT @describ = 'est modifé(e) la demande activité(e) numéro '+ CONVERT(Varchar(max) , @demande_R_ID)    
	Execute Update_NOTIFICATION @demande_R_ID , @recevoir_ID , @describ
	SELECT @DDATE = (CONVERT (datetime, SYSDATETIME()))
END