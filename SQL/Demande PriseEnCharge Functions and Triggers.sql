CREATE PROCEDURE InsertDemandePriseEnCharge
	@userID AS varchar(50), 
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
	SELECT @userID ,@Col1_ID ,@Col2_ID ,@Col3_ID ,@Col4_ID ,@Col5_ID ,@Dest ,@Objet ,@SD ,@ED ,@MDT ,@A ,@HV
	INSERT INTO demande VALUES ((SELECT CONVERT (datetime, SYSDATETIME())),@userID,'Encours', null)
	INSERT INTO demande_priseEnCharge 
	VALUES((SELECT IDENT_CURRENT('demande')),
		@Col1_ID, @Col2_ID, @Col3_ID, 
		@Col4_ID, @Col5_ID, @Dest,
		@Objet, @SD, @ED, @MDT, @A, @HV)
END

CREATE PROCEDURE DeleteDemandePEC
	@id as int
AS
BEGIN
	DELETE FROM demande_priseEnCharge WHERE demande_P_ID = @id;
	DELETE FROM demande WHERE demande_ID = @id
END

ALTER PROCEDURE GetDemandePEC
	@id AS int 
AS
BEGIN
	SELECT collegue1_ID, collegue2_ID, collegue3_ID, collegue4_ID, collegue5_ID, 
		destination, objet_mission, startDate, EndDate, moyen_transport, aeroport, heureDeVol
	FROM demande_priseEnCharge
	WHERE demande_P_ID = @id
END