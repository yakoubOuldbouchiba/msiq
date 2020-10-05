CREATE PROCEDURE GETPRODUITS
AS
BEGIN 
	SELECT * FROM produit
END

CREATE PROCEDURE SETPRODUIT
@cp as varchar(50),
@desig as varchar(50),
@qty as int 
AS
BEGIN
 INSERT INTO produit VALUES(@cp,@desig,@qty)
END

CREATE PROCEDURE DELETEOBJET
@code_objet as varchar(50)
AS
BEGIN
	DELETE FROM objet where code_objet = @code_objet
END