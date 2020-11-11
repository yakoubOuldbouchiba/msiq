ALTER PROCEDURE InsertDemandeClient
	@userID AS varchar(50),
	@nature AS varchar(50),
	@objet AS varchar(50),
	@etat AS varchar(50),
	@description AS varchar(max),
	@DID AS int OUTPUT,
	@FID AS int OUTPUT,--For notif
	@recevoir_ID as varchar(max) OUTPUT,--For notif
	@DDATE AS datetime OUTPUT
AS
BEGIN
	
	INSERT INTO	demande 
	VALUES(		(SELECT CONVERT (datetime, SYSDATETIME())),
				@userID,
				@etat, 
				null, 
				0,
				1
	)
	SELECT @DDATE = (CONVERT (datetime, SYSDATETIME()))
	INSERT INTO demande_client 
	VALUES(		(SELECT IDENT_CURRENT('demande')),
				@description, 
				@nature, 
				@objet, 
				null, 
				null , 
				null, 
				null,
				null,
				null
	)	
	SELECT @DID = IDENT_CURRENT('demande')
	DECLARE @email as varchar(max) 
	IF (@etat = 'Directeur')
	BEGIN
		select	@email = dbo.GetDirecteurByDI(@DID);
	END
	ELSE IF (@etat = 'DAM')
	BEGIN
		select	@email = dbo.GetUserByType('Responsable DAM');
	END
	ELSE IF (@etat = 'Chef Departement')
	BEGIN
		select	@email = dbo.GetChefDepartementByDI(@DID);
	END
	EXECUTE CREE_NOTIFICATION @DID, @email ,'est effecuté(e) une nouvelle demande client' , 'devices'
	SELECT @FID = IDENT_CURRENT('notification')
	set @recevoir_ID = @email
END

------------------------------------------------------
Declare @typedelete  bit 
Execute DeleteDemandeClient  167 , @typedelete 

ALTER PROCEDURE DeleteDemandeClient 
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
		SELECT @recevoir_ID =dbo.GetRecevoirByDI(@id)--for notif
		DELETE FROM notification WHERE demande_ID = @id
		DELETE FROM demande_client WHERE demande_C_ID = @id;
		DELETE FROM demande WHERE demande_ID = @id;
		set @typedelete = 1;
	END
END

-------------------------------------------------------------

ALTER PROCEDURE GetDemandeClient 
	@id as int
AS
BEGIN
	SELECT	DC.*,
			D.etat,
			U.email,
			U.nomUtilisateur, 
			U.prenomUtilisateur,
			U.departement,
			U.posteTelephonique,
			U.structure,                      
			D.*
	FROM	demande_client DC,utilisateurs U,demande D
	WHERE	DC.demande_C_ID = @id 
	AND		D.demande_ID = DC.demande_C_ID
	AND		U.email = D.utilisateurs_ID
END


----------------------------------------------------------------


ALTER PROCEDURE updateDemandeClient
	@demande_C_ID AS INT,
	@nature AS varchar(50),
	@objet 	AS varchar(50),
	@des 	AS varchar(max),
	@MED 	AS bit,
	@DMED 	AS Date,
	@achat 	AS bit,
	@nAchat AS int,
	@Dachat AS Date,
	@oAchat AS varchar(max),
	@etat AS varchar(max),-- for notif
	@NID AS int OUTPUT,--For notif
	@recevoir_ID as varchar(max) OUTPUT,--For notif
	@DDATE AS datetime OUTPUT
AS
BEGIN
	update 	demande_client 
	set 	nature	= @nature,
			objet	= @objet ,
			demande_C_description	= @des,
			mise_disposition		= @MED,
			date_mise_dispostion	= @DMED,
			achat	= @achat,
			nAchat	= @nAchat,
			date_achat = @Dachat,
			oAchats	= @oAchat
	WHERE 	demande_C_ID = @demande_C_ID
	--for notif
		DECLARE @describ  varchar(max);
		IF (@etat = 'Directeur')
		BEGIN
			select	@recevoir_ID = dbo.GetDirecteurByDI(@demande_C_ID);
			SELECT @NID = dbo.GetNotifID(@demande_C_ID);-- for notif
			SELECT @describ = 'est modifé(e) la demande client numéro '+ CONVERT(Varchar(max) , @demande_C_ID)    
			Execute Update_NOTIFICATION @demande_C_ID , @recevoir_ID , @describ
		END
		ELSE IF (@etat = 'DAM')
		BEGIN
			select	@recevoir_ID = dbo.GetUserByType('Responsable DAM');
			SELECT @NID = dbo.GetNotifID(@demande_C_ID);-- for notif
			SELECT @describ = 'est modifé(e) la demande client numéro '+ CONVERT(Varchar(max) , @demande_C_ID)    
			Execute Update_NOTIFICATION @demande_C_ID , @recevoir_ID , @describ
		END
		ELSE IF (@etat = 'Chef Departement')
		BEGIN
			select	@recevoir_ID = dbo.GetChefDepartementByDI(@demande_C_ID);
			SELECT @NID = dbo.GetNotifID(@demande_C_ID);-- for notif
			SELECT @describ = 'est modifé(e) la demande client numéro '+ CONVERT(Varchar(max) , @demande_C_ID)    
			Execute Update_NOTIFICATION @demande_C_ID , @recevoir_ID , @describ
		END
		SELECT @DDATE = (CONVERT (datetime, SYSDATETIME()))
END