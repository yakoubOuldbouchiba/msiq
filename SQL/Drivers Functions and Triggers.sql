ALTER PROCEDURE GETCHAUFFEURS
AS
BEGIN
	SELECT * FROM chauffeur
	where shown = 1
END

ALTER PROCEDURE SETCHAUFFEUR
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

CREATE PROCEDURE UPDATECHAUFFEUR
	@chauffeur_id int,
	@nom AS varchar(50),
	@prenom AS varchar(50),
	@type_permis AS varchar(50),
	@telephone AS varchar(50),
	@email AS varchar(50)
AS
BEGIN
	UPDATE chauffeur
	set
	nom = @nom,
	prenom = @prenom,
	type_permis = @type_permis,
	telephone = @telephone,
	email = @email
	where chauffeur_id = @chauffeur_id
END

ALTER PROCEDURE DELETECHAUFFEUR
	@chauffeur_id as int
AS
BEGIN
	update chauffeur
	set shown= 0
	where chauffeur_id = @chauffeur_id
END