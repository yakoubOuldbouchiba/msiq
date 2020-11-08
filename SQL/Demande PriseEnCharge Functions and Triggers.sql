ALTER PROCEDURE InsertDemandePriseEnCharge
	@userID 	AS varchar(50), 
    @Col1_ID 	AS varchar(50), 
    @Col2_ID 	AS varchar(50), 
    @Col3_ID 	AS varchar(50), 
    @Col4_ID 	AS varchar(50), 
    @Col5_ID 	AS varchar(50),  
    @Dest 		AS varchar(MAX),
    @Objet 		AS varchar(MAX), 
    @SD 		AS date,
    @ED 		AS date,
    @MDT 		AS varchar(250), 
    @A 			AS varchar(250), 
    @HV 		AS varchar(50),
	@DID		AS int OUTPUT,
	@FID AS int OUTPUT,--for notif
	@recevoir_ID as varchar(max) OUTPUT,--for notif
	@DDATE		AS datetime OUTPUT,
	@etat		AS varchar(50)
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
	INSERT INTO demande_priseEnCharge 
	VALUES(		(SELECT IDENT_CURRENT('demande')),
				@Col1_ID, 
				@Col2_ID, 
				@Col3_ID, 
				@Col4_ID, 
				@Col5_ID, 
				@Dest,
				@Objet, 
				@SD, 
				@ED, 
				@MDT, 
				@A, 
				@HV)
	SELECT @DID = IDENT_CURRENT('demande')
	DECLARE @email as varchar(max) 
	SELECT @email = U.email
	FROM utilisateurs U , (
		SELECT U.structure , U.departement
		FROM utilisateurs U
		WHERE U.email = @userID	
	)as I
	WHERE I.structure = U.structure
	AND I.departement = U.departement
	AND U.typeUtilisateur = 'Chef departement'
	EXECUTE CREE_NOTIFICATION @DID,@email ,'est effecut�(e) une nouvelle demande de prise en charge', 'flight'
		--for Notif--
	SELECT @FID = IDENT_CURRENT('notification')
	set @recevoir_ID = @email
END

ALTER PROCEDURE DeleteDemandePEC
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
		SELECT @recevoir_ID = dbo.GetChefDepartementByDI(@id)--for notif
		DELETE FROM notification WHERE demande_ID = @id
		DELETE FROM demande_priseEnCharge WHERE demande_P_ID = @id;
		DELETE FROM demande WHERE demande_ID = @id
		set @typedelete = 0;
	END
END

ALTER PROCEDURE GetDemandePEC
	@id AS int 
AS
BEGIN
	SELECT	demande_P_ID,
			collegue1_ID Collegues, 
			collegue2_ID Collegues, 
			collegue3_ID Collegues, 
			collegue4_ID Collegues, 
			collegue5_ID Collegues, 
			destination, 
			objet_mission, 
			startDate, 
			EndDate, 
			moyen_transport, 
			aeroport, 
			heureDeVol,
			U.email,
			U.nomUtilisateur, 
			U.prenomUtilisateur,
			U.departement,
			U.structure,
			U.posteTelephonique,
			D.*
	FROM	demande_priseEnCharge DPEC, utilisateurs U, demande D
	WHERE	DPEC.demande_P_ID = @id
	AND		D.demande_ID = DPEC.demande_P_ID
	AND		U.email = D.utilisateurs_ID
END

/*-------------------------------------------------------------------------------------------*/

ALTER PROCEDURE UpdateDemandePEC
	@id AS int,
    @Col1_ID AS varchar(50), 
    @Col2_ID AS varchar(50), 
    @Col3_ID AS varchar(50), 
    @Col4_ID AS varchar(50), 
    @Col5_ID AS varchar(50),  
    @Dest AS varchar(MAX),
    @Objet AS varchar(MAX), 
    @SD AS date,
    @ED AS date,
    @MDT AS varchar(250), 
    @A AS varchar(250), 
    @HV AS varchar(50),
	@NID AS int OUTPUT,--For notif
	@recevoir_ID as varchar(max) OUTPUT--For notif
AS
BEGIN
	UPDATE demande_priseEnCharge
	SET collegue1_ID = @Col1_ID,
		collegue2_ID = @Col2_ID,
		collegue3_ID = @Col3_ID,
		collegue4_ID = @Col4_ID,
		collegue5_ID = @Col5_ID,
	    destination	 = @Dest,
		objet_mission = @Objet,
		startDate = @SD,
		EndDate = @ED,
		moyen_transport = @MDT,
		aeroport = @A,
		heureDeVol = @HV	
	WHERE demande_P_ID= @id
	DECLARE @describ  varchar(max);
	SELECT @recevoir_ID = email
	FROM demande D , utilisateurs U
	WHERE D.utilisateurs_ID = U.email
	AND D.demande_ID = @id
	SELECT @recevoir_ID = dbo.GetChefDepartement(@recevoir_ID) --for notif
	SELECT @NID = dbo.GetNotifID(@id);-- for notif
	SELECT @describ = 'est modif�(e) la demande de prise en charge num�ro '+ CONVERT(Varchar(max) , @id)    
	Execute Update_NOTIFICATION @id , @recevoir_ID , @describ
END