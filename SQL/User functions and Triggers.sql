
CREATE PROCEDURE GetUsers 
AS
BEGIN
	SELECT email,nomUtilisateur,prenomUtilisateur,typeUtilisateur,dateNaissance,mobile,fonction,structure,posteTelephonique,departement,shown 
	FROM utilisateurs
END

/*----------------------------------------------------------------------------------*/


CREATE PROCEDURE DeleteUser 
@email AS VarChar(50)
AS
BEGIN
	DELETE FROM demande_client 
	Where demande_C_ID in (
	 select demande_C_ID
	 FROM demande , demande_client
	 WHERE demande_C_ID = demande_ID
	 AND utilisateurs_ID = @email
	 AND dbo.DemandeEtat (demande_ID)= 'Encours'
	)
	DELETE FROM demande_tirage 
	Where demande_T_ID in (
	 select demande_T_ID
	 FROM demande , demande_tirage
	 WHERE demande_T_ID = demande_ID
	 AND utilisateurs_ID = @email
	 AND dbo.DemandeEtat (demande_ID)= 'Encours'
	)
	DELETE FROM demande_vehicule 
	Where demande_V_ID in (
	 select demande_V_ID
	 FROM demande , demande_vehicule
	 WHERE demande_V_ID = demande_ID
	 AND utilisateurs_ID = @email
	 AND dbo.DemandeEtat (demande_ID)= 'Encours'
	)
	DELETE FROM demande_relex
	Where demande_R_ID in (
	 select demande_R_ID
	 FROM demande , demande_relex
	 WHERE demande_R_ID = demande_ID
	 AND utilisateurs_ID = @email
	 AND dbo.DemandeEtat (demande_ID)= 'Encours'
	)
	DELETE FROM demande_priseEnCharge
	Where demande_P_ID in (
	 select demande_P_ID
	 FROM demande , demande_priseEnCharge
	 WHERE demande_P_ID = demande_ID
	 AND utilisateurs_ID = @email
	 AND dbo.DemandeEtat (demande_ID)= 'Encours'
	)
	DELETE FROM demande_fourniture_object
	Where demande_F_ID in (
	 select demande_F_ID
	 FROM demande , demande_fourniture_object
	 WHERE demande_F_ID = demande_ID
	 AND utilisateurs_ID = @email
	 AND dbo.DemandeEtat (demande_ID)= 'Encours'
	)
	DELETE FROM demande_fourniture
	 Where demande_F_ID in (
	 select demande_F_ID
	 FROM demande , demande_fourniture
	 WHERE demande_F_ID = demande_ID
	 AND utilisateurs_ID = @email
	 AND dbo.DemandeEtat (demande_ID)= 'Encours'
	)

	DELETE FROM notification
	 Where demande_ID in (
	 select N.demande_ID
	 FROM demande D , notification N
	 WHERE D.demande_ID = N.demande_ID
	 AND utilisateurs_ID = @email
	)

	DELETE FROM notification
	WHERE recevoir_ID = @email 
	
	
	AND dbo.DemandeEtat (demande_ID)= 'Encours'
	DELETE FROM demande
	WHERE utilisateurs_ID = @email 
	AND dbo.DemandeEtat (demande_ID)= 'Encours'
	
	DECLARE @shown as bit
	SELECT @shown = shown
	FROM utilisateurs
	WHERE email=@email;
	if(@shown=1) set @shown =0
	else set @shown =1
	UPDATE utilisateurs
	SET shown= @shown
	WHERE email=@email;
END

/*----------------------------------------------------------------------------------*/

CREATE PROCEDURE SetUsers
	@email AS varChar(50),
	@pw AS nvarchar(Max),
	@ln AS varChar(50),
	@fn AS varChar(50),
	@tu AS varChar(50),
	@bd AS DATE ,
	@tel AS varchar(15),
	@job AS varChar(50),
	@struc AS varChar(50),
	@depart AS varChar(50),
	@pt AS varchar(15)
AS
BEGIN 
	INSERT INTO utilisateurs
	Values(@email, @pw, @ln, @fn, @tu, @bd, @tel, @job, @struc, @pt, @depart ,1)
END

/*----------------------------------------------------------------------------------*/

CREATE PROCEDURE LOGIN
	@email AS VARCHAR(30)
AS
BEGIN
	SELECT userPassword , typeUtilisateur
	FROM utilisateurs
	Where email=@email 
	AND shown = '1'
END

LOGIN 'Yacinelalmi19@gmail.com'

/*----------------------------------------------------------------------------------*/

CREATE PROCEDURE GetUser
	@email  AS VarChar(50)
AS
BEGIN
SELECT email,nomUtilisateur,prenomUtilisateur,typeUtilisateur,dateNaissance,mobile,fonction,structure,posteTelephonique,departement 
FROM utilisateurs
WHERE email=@email
END

/*----------------------------------------------------------------------------------*/

CREATE PROCEDURE setAccountDemand
	@email AS varChar(50),
	@pw AS nvarchar(max),
	@ln AS varChar(50),
	@fn AS varChar(50),
	@tu AS varChar(50),
	@bd AS DATE ,
	@tel AS int,
	@job AS varChar(50),
	@struc AS varChar(50),
	@depart AS varChar(50),
	@pt as int
	AS
BEGIN 
	INSERT INTO demande_compte
	VALUES(@email, @pw, @ln, @fn, @tu, @bd, @tel, @job, @struc, @pt, @depart );
	INSERT INTO utilisateurs 
	VALUES (@email, @pw, @ln, @fn, 'Client', @bd, @tel, @job, @struc, @pt, @depart , 1);
END

/*----------------------------------------------------------------------------------*/

CREATE PROCEDURE UpdatePassword
	@email AS varchar(50),
	@npw AS varchar(max)
AS
BEGIN
	UPDATE utilisateurs
	SET userPassword = @npw
	WHERE email=@email
END

/*----------------------------------------------------------------------------------*/

CREATE PROCEDURE UpdateUser
	@email AS varchar(50),
	@ln AS varChar(50),
	@fn AS varChar(50),
	@bd AS DATE ,
	@tel AS int,
	@job AS varChar(50),
	@struc AS varChar(50),
	@depart AS varChar(50),
	@pt as int
	AS
BEGIN 
	UPDATE utilisateurs
	SET nomUtilisateur = @ln,
		prenomUtilisateur = @fn,
		dateNaissance = @bd,
		mobile = @tel,
		fonction = @job,
		structure = @struc,
		posteTelephonique = @pt,
		departement = @depart
	WHERE email=@email
END

CREATE PROCEDURE TAccDemande
	@email	AS varchar(50),
	@Msg	AS varchar(10)
AS
BEGIN
	IF(@Msg = 'Accept')
	BEGIN
		UPDATE	utilisateurs
		SET		typeUtilisateur = (SELECT typeUtilisateur FROM demande_compte WHERE email = @email)

		DELETE FROM demande_compte WHERE email = @email
	END
	IF(@Msg = 'Reject')
	BEGIN
		UPDATE	utilisateurs
		SET		shown = 0

		DELETE FROM demande_compte WHERE email = @email
	END
END