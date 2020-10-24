ALTER PROCEDURE InsertDemandeClient
	@userID AS varchar(50),
	@nature AS varchar(50),
	@objet AS varchar(50),
	@description AS varchar(max),
	@DID AS int OUTPUT,
	@DDATE AS datetime OUTPUT
AS
BEGIN
	
	INSERT INTO demande VALUES ((SELECT CONVERT (datetime, SYSDATETIME())),@userID,'Encours', null)
	SELECT @DDATE = (CONVERT (datetime, SYSDATETIME()))
	INSERT INTO demande_client VALUES ((SELECT IDENT_CURRENT('demande')), @description, @nature, @objet, null, null , null, null)	
	SELECT @DID = IDENT_CURRENT('demande')

END

------------------------------------------------------

CREATE PROCEDURE DeleteDemandeClient 
	@id as int

AS
BEGIN
	DELETE FROM demande_client WHERE demande_C_ID = @id;
	DELETE FROM demande WHERE demande_ID = @id
END

-------------------------------------------------------------

ALTER PROCEDURE GetDemandeClient 
	@id as int
AS
BEGIN
	SELECT	DC.*,
			U.nomUtilisateur, 
			U.prenomUtilisateur,
			U.departement,
			D.demande_Date
	FROM	demande_client DC,utilisateurs U,demande D
	WHERE	DC.demande_C_ID = @id 
	AND		D.demande_ID = DC.demande_C_ID
	AND		U.email = D.utilisateurs_ID
END

----------------------------------------------------------------


ALTER PROCEDURE updateDemandeClient
	@demande_C_ID AS INT,
	@nature AS varchar(50),
	@objet AS varchar(50),
	@description AS varchar(max)
AS
BEGIN
	update demande_client 
	set nature = @nature,
	objet = @objet ,
	demande_C_description = @description
	WHERE demande_C_ID = @demande_C_ID
END


SELECT * FROM demande,demande_client