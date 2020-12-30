CREATE PROCEDURE GETSTRUCTURE 
AS
BEGIN
	SELECT * FROM structure
END
EXECUTE GETSTRUCTURE 

ALTER Function GestDestinationMail (@DIST  as int , @DID as varchar , @DE as varchar(max) )
	RETURNS varchar(max)
AS
BEGIN
	Declare @mail as varchar(max)
	IF (@DE ='Directeur')
	BEGIN
		Select @mail=  email 
		from utilisateurs
		where structure in
		(SELECT U.structure
		From utilisateurs U , demande D
		where U.email = D.utilisateurs_ID
		AND D.demande_ID = @DID)
		AND typeUtilisateur = 'Directeur'
		AND shown = 1
	END
	ELSE IF (@DE ='Chef Departement')
	BEGIN
		Select @mail=  email 
		from utilisateurs
		where structure in
		(SELECT U.structure
		From utilisateurs U , demande D
		where U.email = D.utilisateurs_ID
		AND D.demande_ID = @DID)
		AND departement in (
		SELECT U.departement
		From utilisateurs U , demande D
		where U.email = D.utilisateurs_ID
		AND D.demande_ID = @DID)
		AND typeUtilisateur = 'Chef departement'
		AND shown = 1
	END
	ELSE IF (@DE ='Directeur Destination')
	BEGIN
		Select @mail=  email 
		from utilisateurs U
		Where U.structure = (
			select destination_id
			FROM demande 
			WHERE demande_ID = @DID
		)
		AND typeUtilisateur = 'Directeur'
		AND shown = 1
	END
	ELSE IF (@DE ='Agent de Tirage')
	BEGIN
		SELECT @mail= email
		FROM utilisateurs
		WHERE typeUtilisateur ='Agent de Tirage'
		AND shown = 1
	END
	ELSE IF (@DE ='Agent de magasin')
	BEGIN
		SELECT @mail= email
		FROM utilisateurs
		WHERE typeUtilisateur ='Agent de magasin'
		AND shown = 1
	END
	ELSE IF (@DE ='Chef de parc')
	BEGIN
		SELECT @mail= email
		FROM utilisateurs
		WHERE typeUtilisateur ='Chef de parc'
		AND shown = 1
	END
	ELSE IF (@DE ='Directeur DAM')
	BEGIN
		SELECT @mail=email
		FROM utilisateurs
		WHERE structure = 2
		AND shown = 1
	END
	ELSE
	BEGIN
		SET @mail = @DIST --chef dep dist + employee + chef service 
	END
	return @mail
END

Select  dbo.GestDestinationMail (null , 586 , 'Agent de Tirage');
