ALTER PROCEDURE GETCHAUFFEURS
AS
BEGIN
	SELECT * FROM chauffeur
	where shown = 1
END

CREATE PROCEDURE GETDISPOCHAUFFEURS
	@date_depart as datetime
AS
BEGIN
	SELECT * FROM chauffeur
	where shown = 1
	AND chauffeur_id not in (
		select chauffeur_id 
		from demande_vehicule
		where @date_depart between date_depart and date_retour
	)
END

ALTER PROCEDURE SETCHAUFFEUR
@nom AS varchar(50),
@prenom AS varchar(50),
@type_permis AS varchar(50),
@telephone AS varchar(50),
@email AS varchar(50)
AS
BEGIN
	INSERT INTO chauffeur
	Values(@nom,@prenom,@type_permis,@telephone,@email,1,1)
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
	@chauffeur_id as int,
	@deleted as bit output
AS
BEGIN
	update chauffeur
	set shown= 0
	where chauffeur_id = @chauffeur_id
	AND chauffeur_ID not in (
		select chauffeur_ID 
		from demande_vehicule
		where (date_depart >= GETDATE()
		OR date_retour >= GETDATE())
		AND chauffeur_id = @chauffeur_id
	)
	
	set @deleted = 1;
	
	select @deleted = 0
	FROM demande_vehicule
	WHERE chauffeur_ID  in (
		select chauffeur_ID 
		from demande_vehicule 
		where (date_depart >= GETDATE()
		OR date_retour >= GETDATE())
		AND chauffeur_id = @chauffeur_id
	)

END
