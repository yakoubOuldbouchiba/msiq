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

ALTER PROCEDURE InsertDemandeFourniture
	@userID AS varchar(50),
	@demande_id AS int output
AS
BEGIN 
	INSERT INTO demande VALUES ((SELECT CONVERT (datetime, SYSDATETIME())),@userID,'Encours', null)
	INSERT INTO demande_fourniture VALUES ((SELECT IDENT_CURRENT('demande')), null );
	SELECT @demande_id = IDENT_CURRENT('demande')
END

ALTER PROCEDURE InserObjetOftDemandeFourniture
    @demande_id as int, 
	@code_objet as int,
	@qty_demande as int 
AS
BEGIN
	INSERT INTO demande_fourniture_object(demande_F_ID , code_object , qty_demande)
		VALUES (@demande_id,@code_objet,@qty_demande)
END

--------------------------------------------------------------------------------------------

ALTER PROCEDURE GetObjetOftDemandeFourniture
	@demande_f_id as int
AS
BEGIN
	SELECT * FROM demande_fourniture_object
	WHERE demande_F_ID = @demande_f_id
END

ALTER PROCEDURE deleteObjetOftDemandeFourniture
    @demande_id as int
AS
BEGIN
	DELETE  FROM demande_fourniture_object where demande_F_ID = @demande_id
END