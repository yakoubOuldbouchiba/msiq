CREATE PROCEDURE DeleteDemande
	@id as int
AS
BEGIN
	DELETE FROM demande WHERE demande_ID = @id
END