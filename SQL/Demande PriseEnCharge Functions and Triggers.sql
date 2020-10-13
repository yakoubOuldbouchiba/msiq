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