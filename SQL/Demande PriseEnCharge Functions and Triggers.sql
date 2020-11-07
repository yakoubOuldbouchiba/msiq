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
END

ALTER PROCEDURE DeleteDemandePEC
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

CREATE PROCEDURE UpdateDemandePEC
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
    @HV AS varchar(50)
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
END