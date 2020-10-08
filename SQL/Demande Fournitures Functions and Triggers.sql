CREATE PROCEDURE GETOBJETS
AS
BEGIN 
	SELECT * FROM objet
END

CREATE PROCEDURE SEOJETS
@co as varchar(50),
@desig as varchar(50),
@qty as int 
AS
BEGIN
 INSERT INTO objet VALUES(@co,@desig,@qty)
END

CREATE PROCEDURE DELETEOBJET
@code_objet as varchar(50)
AS
BEGIN
	DELETE FROM objet where code_objet = @code_objet
END