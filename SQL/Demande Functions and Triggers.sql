CREATE PROCEDURE DeleteDemande
	@id as int
AS
BEGIN
	DELETE FROM demande WHERE demande_ID = @id
END

CREATE PROCEDURE GetDemande
	@id as int
AS
BEGIN
	SELECT 
		D.* ,
		U.nomUtilisateur,
		U.prenomUtilisateur,
		U.structure,
		U.posteTelephonique
	FROM demande D, utilisateurs U
	WHERE D.demande_ID = @id
	AND U.email = D.utilisateurs_ID
END