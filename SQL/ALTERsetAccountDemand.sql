USE [Msiq_db]
GO

/****** Object:  StoredProcedure [dbo].[setAccountDemand]    Script Date: 10/8/2020 4:37:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*CREATE PROCEDURE GetUsers 
AS
BEGIN
SELECT * FROM utilisateurs;
END*/
/*CREATE PROCEDURE DeleteUser 
@email AS VarChar(50)
AS
BEGIN
DElETE FROM utilisateurs
WHERE email=@email;
END*/

/*CREATE PROCEDURE SetUsers
	@email AS varChar(50),
	@pw AS nvarchar(50),
	@ln AS varChar(50),
	@fn AS varChar(50),
	@tu AS varChar(50),
	@bd AS DATE ,
	@tel AS varChar(50),
	@job AS varChar(50),
	@struc AS varChar(50),
	@depart AS varChar(50)
	AS
	BEGIN 
	INSERT INTO utilisateurs
	Values(@email , @pw , @ln , @fn , @tu , @bd , @tel , @job , @struc , @depart)
	END
*/

/*CREATE PROCEDURE LOGIN
	@email AS VARCHAR(30)
AS
BEGIN
	SELECT userPassword , typeUtilisateur
	FROM utilisateurs
	Where email=@email 
END*/



/*CREATE PROCEDURE GetUser
	@email  AS VarChar(50)
AS
BEGIN
SELECT email, nomUtilisateur, prenomUtilisateur, fonction , typeUtilisateur 
FROM utilisateurs
WHERE email=@email
END*/

ALTER PROCEDURE [dbo].[setAccountDemand]
	@email AS varChar(50),
	@pw AS nvarchar(50),
	@ln AS varChar(50),
	@fn AS varChar(50),
	@tu AS varChar(50),
	@bd AS DATE ,
	@tel AS varChar(50),
	@job AS varChar(50),
	@struc AS varChar(50),
	@depart AS varChar(50)
	AS
BEGIN 
	INSERT INTO demande_compte
	Values(@email , @pw , @ln , @fn , @tu , @bd , @tel , @job , @struc , @depart);
	INSERT INTO utilisateurs 
	Values (@email , @pw , @ln , @fn , 'Client' , @bd , @tel , @job , @struc , @depart);
END










GO


