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
 
/*Create type objet*/
DROP TYPE ObjetType;
CREATE TYPE ObjetType as Table(
	code_object int,
	qty_demande int	
);

CREATE PROCEDURE InsertObject

ALTER PROCEDURE InsertDemandeFourniture
	@userID AS varchar(50)
	--@objects AS ObjetType READONLY--
AS
BEGIN
   SELECT * from objet
END