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