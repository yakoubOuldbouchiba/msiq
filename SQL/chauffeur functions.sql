CREATE PROCEDURE GETCHAUFFEURS
AS
BEGIN
SELECT * FROM chauffeur
END

CREATE PROCEDURE SETCHAUFFEUR
@nom AS varchar(50),
@prenom AS varchar(50),
@type_permis AS varchar(50),
@telephone AS varchar(50),
@email AS varchar(50)
AS
BEGIN
	INSERT INTO chauffeur(nom,prenom,type_permis,telephone,email)
	Values(@nom,@prenom,@type_permis,@telephone,@email)
END

CREATE PROCEDURE DELETECHAUFFEUR
@chauffeur_id as int
AS
BEGIN
DELETE FROM chauffeur where chauffeur_id = @chauffeur_id
END