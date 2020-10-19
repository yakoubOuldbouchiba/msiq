CREATE PROCEDURE InsertDemandeTirage
	@userID AS varchar(50),
	@FN AS varchar(max),
	@NF AS int,
	@NE AS int,
	@NTF AS int,
	@TF AS varchar(max),
	@A AS varchar(max),
	@SFN AS varchar(max),
	@FF AS varchar(10)
AS
BEGIN
	INSERT INTO demande VALUES ((SELECT CONVERT (datetime, SYSDATETIME())),@userID,'Encours', null)
	INSERT INTO document VALUES (@FN, @NF, @NE, @NTF, @TF, @A, @SFN, @FF)
	INSERT INTO demande_tirage VALUES ((SELECT IDENT_CURRENT('demande')), null, null, (SELECT IDENT_CURRENT('document')))
END
ALTER PROCEDURE DeleteDemandeTirage
	@id as int
AS
BEGIN
	DELETE FROM demande_tirage WHERE demande_T_ID = @id;
	DELETE FROM document WHERE document_ID = (select document_ID from demande_tirage where demande_T_ID = @id) ;
	DELETE FROM demande WHERE demande_ID = @id
END

CREATE PROCEDURE GetDemandeTirage
	@id AS int
AS
BEGIN
	SELECT demande_T_ID, nom_document, nombre_feuille, nombre_exemplaire 
	FROM demande_tirage,document
	WHERE demande_T_ID = @id
END

ALTER PROCEDURE UpdatetDemandeTirage
	@id AS int,
	@NF AS int,
	@NE AS int,
	@NTF AS int,
	@TF AS varchar(max),
	@A AS varchar(max)
AS
BEGIN
	UPDATE document
	SET nombre_feuille	= @NF,
		nombre_exemplaire	= @NE,
		total_feuille	= @NTF,
		type_document	= @TF,
		autre			= @A
	WHERE document_ID = ( SELECT document_ID 
							FROM demande_tirage 
							WHERE demande_T_ID = @id)
END