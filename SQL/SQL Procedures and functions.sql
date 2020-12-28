CREATE PROCEDURE GETSTRUCTURE 
AS
BEGIN
	SELECT * FROM structure
END
EXECUTE GETSTRUCTURE 

CREATE PROCEDURE GETDESTINATION
AS
BEGIN
	SELECT * FROM destination
END
EXECUTE GETDESTINATION

alter Function GestDestinationMail (@DID as varchar(max))
	RETURNS varchar(max)
AS
BEGIN
	DECLARE @email as varchar(max)
	select @email = email
	FROM utilisateurs
	where structure in (select destination_id
	FROM  demande_client DC 
	WHERE DC.demande_C_ID = @DID)
	AND typeUtilisateur= 'Directeur'
	return @email
END

Select  dbo.GestDestinationMail (600)