ALTER PROCEDURE InsertDemandeTirage
	@userID AS varchar(50),
	@FN		AS varchar(max),
	@NF		AS int,
	@NE		AS int,
	@NTF	AS int,
	@TF		AS varchar(max),
	@A		AS varchar(max),
	@SFN	AS varchar(max),
	@FF		AS varchar(10),
	@DID	AS int OUTPUT,
	@DDATE	AS datetime OUTPUT,
	@etat	AS varchar(50)
AS
BEGIN
	INSERT INTO demande 
	VALUES (	(SELECT CONVERT (datetime, SYSDATETIME())),
				@userID,
				@etat, 
				null,
				0,
				1)
	SELECT @DDATE = (CONVERT (datetime, SYSDATETIME()))
	INSERT INTO document 
	VALUES (	@FN, 
				@NF, 
				@NE, 
				@NTF, 
				@TF, 
				@A, 
				@SFN, 
				@FF)
	INSERT INTO demande_tirage 
	VALUES (	(SELECT IDENT_CURRENT('demande')), 
				null, 
				null, 
				(SELECT IDENT_CURRENT('document')))
	SELECT @DID = IDENT_CURRENT('demande')
END

ALTER PROCEDURE DeleteDemandeTirage
	@id as int,
	@typedelete as bit output
AS
BEGIN
	Declare @etat  varchar(max)
	select @etat = D.etat 
	From demande D
	where D.demande_ID = @id
	IF(@etat='Acceptee'or @etat='Rejetee')
	BEGIN
		Update demande
		set shown = 0
		where demande_ID = @id;
		set @typedelete = 0;
	END
	ELSE
	BEGIN
		DELETE FROM demande_tirage WHERE demande_T_ID = @id;
		DELETE FROM document WHERE document_ID = (select document_ID from demande_tirage where demande_T_ID = @id) ;
		DELETE FROM demande WHERE demande_ID = @id
		set @typedelete = 1;
	END
END

ALTER PROCEDURE GetDemandeTirage
	@id AS int
AS
BEGIN
	SELECT	DT.*, 
			Dc.nom_document, 
			Dc.nombre_feuille,
			Dc.total_feuille,
			Dc.nombre_exemplaire,
			Dc.type_document,
			Dc.autre,
			Dc.stored_name,
			U.email,
			U.nomUtilisateur,
			U.prenomUtilisateur,
			U.departement,
			D.*,
			U.structure
	FROM	demande_tirage DT, document Dc, utilisateurs U, demande D
	WHERE	DT.demande_T_ID = D.demande_ID
	AND		DT.document_ID = Dc.document_ID
	AND		D.utilisateurs_ID = U.email
	AND		DT.demande_T_ID = @id
END
GetDemandeTirage 1
ALTER PROCEDURE UpdatetDemandeTirage
	@id AS int,
	@NF AS int,
	@NE AS int,
	@NTF AS int,
	@TF AS varchar(max),
	@A AS varchar(max),
	@NO AS int,
	@DP AS Date
AS
BEGIN
	UPDATE 	document
	SET 	nombre_feuille		= @NF,
			nombre_exemplaire	= @NE,
			total_feuille		= @NTF,
			type_document		= @TF,
			autre				= @A
	WHERE 	document_ID 		= (SELECT document_ID 
									FROM demande_tirage 
									WHERE demande_T_ID = @id)
	UPDATE	demande_tirage
	SET		numero_ordre = @NO,
			date_prestation = @DP
	WHERE	demande_T_ID = @id

END