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

ALTER PROCEDURE InsertDemandeFourniture
	@userID AS varchar(50),
	@demande_id AS int OUTPUT
AS
BEGIN
	INSERT INTO demande VALUES ((SELECT CONVERT (datetime, SYSDATETIME())),@userID,'Encours', null)
	INSERT INTO demande_fourniture VALUES ((SELECT IDENT_CURRENT('demande')), null);
	SELECT @demande_id =  IDENT_CURRENT('demande')
END

CREATE PROCEDURE InserObjetOftDemandeFourniture
	@demande_id AS int ,
	@code_objet AS int,
	@qty_demande As int
AS
BEGIN
		INSERT INTO demande_fourniture_object(demande_F_ID,code_object,qty_demande)
			VALUES (@demande_id,@code_objet,@qty_demande)
END