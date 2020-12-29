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
	@FID AS int OUTPUT,--for notif
	@recevoir_ID as varchar(max) OUTPUT,--for notif
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
				1,
				null --to update
				)
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
	--for notif--
	DECLARE @email as varchar(max)  
	IF (@etat = 'Directeur')
	BEGIN
		select	@email = dbo.GetDirecteurByDI(@DID);
	END
	ELSE IF (@etat ='Acceptee')
	BEGIN
		select	@email = dbo.GetUserByType('Agent de tirage');
	END
	ELSE IF (@etat = 'Chef Departement')
	BEGIN
		select	@email = dbo.GetChefDepartementByDI(@DID);
	END
	EXECUTE CREE_NOTIFICATION @DID,@email ,'est effecuté(e) une nouvelle demande de tirage', 'print'
	SELECT @FID = IDENT_CURRENT('notification')
	set @recevoir_ID = @email
END

CREATE PROCEDURE DeleteDemandeTirage
	@id as int,
	@typedelete as bit output,
	@recevoir_ID as varchar(max) OUTPUT--For notif
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
		SELECT @recevoir_ID = dbo.GetRecevoirByDI(@id)--for notif
		DELETE FROM notification WHERE demande_ID = @id
		DELETE FROM demande_tirage WHERE demande_T_ID = @id;
		DELETE FROM document WHERE document_ID = (select document_ID from demande_tirage where demande_T_ID = @id) ;
		DELETE FROM demande WHERE demande_ID = @id
		set @typedelete = 1;
	END
END

CREATE PROCEDURE GetDemandeTirage
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
	@NID AS int OUTPUT,--For notif
	@recevoir_ID as varchar(max) OUTPUT,--For notif
	@NO AS int,
	@DP AS Date,
	@etat as varchar(max),
	@describ as varchar(max) output,
	@DDATE AS datetime OUTPUT
AS
BEGIN
	Declare @state as varchar(max);
	select @state = etat
	FROM demande
	Where demande_ID=@id

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
	--for notif
	IF (@etat = 'Directeur')
	BEGIN
		select	@recevoir_ID = dbo.GetDirecteurByDI(@id);
		SELECT @NID = dbo.GetNotifID(@id);-- for notif
		SELECT @describ = 'est modifé(e) la demande de tirage numéro '+ CONVERT(Varchar(max) , @id)    
		Execute Update_NOTIFICATION @id , @recevoir_ID , @describ
	END
	ELSE IF (@etat = 'Agent de Tirage' and @state !='Acceptee')
	BEGIN
		select	@recevoir_ID  = dbo.GetUserByType('Agent de Tirage');
		SELECT @NID = dbo.GetNotifID(@id);-- for notif
		SELECT @describ = 'est modifé(e) la demande de tirage numéro '+ CONVERT(Varchar(max) , @id)    
		Execute Update_NOTIFICATION @id , @recevoir_ID , @describ
	END
	ELSE IF (@etat = 'Chef Departement')
	BEGIN
		select	@recevoir_ID = dbo.GetChefDepartementByDI(@id);
		SELECT @NID = dbo.GetNotifID(@id);-- for notif
		SELECT @describ = 'est modifé(e) la demande de tirage numéro '+ CONVERT(Varchar(max) , @id)    
		Execute Update_NOTIFICATION @id , @recevoir_ID , @describ
	END
	SELECT @DDATE = (CONVERT (datetime, SYSDATETIME()))
END
