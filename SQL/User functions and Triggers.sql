
CREATE PROCEDURE GetUsers 
AS
BEGIN
	SELECT email,nomUtilisateur,prenomUtilisateur,typeUtilisateur,dateNaissance,mobile,fonction,structure,posteTelephonique,departement 
	FROM utilisateurs
END

/*----------------------------------------------------------------------------------*/


CREATE PROCEDURE DeleteUser 
@email AS VarChar(50)
AS
BEGIN
DElETE FROM utilisateurs
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
	@tel AS int,
	@job AS varChar(50),
	@struc AS varChar(50),
	@depart AS varChar(50),
	@pt AS int
AS
BEGIN 
	INSERT INTO utilisateurs
	Values(@email, @pw, @ln, @fn, @tu, @bd, @tel, @job, @struc, @pt, @depart)
END

/*----------------------------------------------------------------------------------*/

CREATE PROCEDURE LOGIN
	@email AS VARCHAR(30)
AS
BEGIN
	SELECT userPassword , typeUtilisateur
	FROM utilisateurs
	Where email=@email 
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
	VALUES(@email, @pw, @ln, @fn, @tu, @bd, @tel, @job, @struc, @pt, @depart);
	INSERT INTO utilisateurs 
	VALUES (@email, @pw, @ln, @fn, 'Client', @bd, @tel, @job, @struc, @pt, @depart);
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

SELECT  * FROM utilisateurs