CREATE PROCEDURE GETVEHICULE
AS
BEGIN
	SELECT * FROM vehicule
END

CREATE PROCEDURE SETVEHICULE 
@matricule as varchar(50),
@nom as varchar(50),
@annee as varchar(50),
@type_vehicule as varchar(50)
AS
BEGIN
	INSERT INTO vehicule 
	VALUES(@matricule , @nom ,@annee , @type_vehicule)
END

CREATE PROCEDURE DELETEVEHICULE
@matricule as varchar(50)
AS
BEGIN
	DELETE FROM vehicule where matricule = @matricule
END