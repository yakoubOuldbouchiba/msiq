CREATE PROCEDURE InsertDemandeClient
	@userID AS varchar(50),
	@nature AS varchar(50),
	@objet AS varchar(50),
	@description AS varchar(max)
AS
BEGIN
	INSERT INTO demande VALUES ((SELECT CONVERT (datetime, SYSDATETIME())),@userID,'Encours', null)
	INSERT INTO demande_client VALUES ((SELECT IDENT_CURRENT('demande')), @description, @nature, @objet, null, null , null, null)
END

------------------------------------------------------

CREATE PROCEDURE DeleteDemandeClient 
	@id as int

AS
BEGIN
	DELETE FROM demande_client WHERE demande_C_ID = @id;
	DELETE FROM demande WHERE demande_ID = @id
END