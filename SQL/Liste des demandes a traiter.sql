CREATE VIEW 	Demandes_A_Traiter 
	AS
	SELECT 	U.departement, 
			U.structure,
			dbo.DemandeType(D.demande_ID) as type_demande, 
			D.*
	FROM	demande D, utilisateurs U
	where	D.utilisateurs_ID = U.email;

ALTER VIEW 	Demandes_A_Traiter 
	AS
	SELECT dbo.DemandeType(D.demande_ID) as type_demande, 
			D.*
	FROM	demande D, utilisateurs U
	where	D.utilisateurs_ID = U.email;


SELECT * FROM demande_compte

EXECUTE getDemandeATraiter 'chefdepart@gmail.com'


ALTER PROCEDURE getDemandeATraiter 
	@email as varchar(max)
AS
BEGIN
	SELECT * 
	from Demandes_A_Traiter
	where reciever = @email
END

 ALTER PROCEDURE UpdateDemandState 
	@Demand_ID	AS int,
	@motif		AS varchar(max),
	@State		AS varchar(50),
	@userID AS varchar(max) output,-- add it for notif
	@NID AS int output, -- add it for notif
	@desc AS varchar(max) output,-- add it for notif
	@desc_C AS varchar(max) output,-- add it for notif
	@userID_C AS varchar(max) output,-- add it for notif
	@DT AS varchar(max),
	@UT AS varchar(max),
	@DDATE AS datetime OUTPUT
AS
BEGIN
	UPDATE	demande
	SET		etat = @State, 
			motif= @motif
	WHERE	demande_ID = @Demand_ID
	--for notif--
	
	SELECT @NID = dbo.GetNotifID(@Demand_ID)
	IF (@State = 'Rejetee')
	BEGIN
		SELECT @userID = dbo.GetUserByDI(@Demand_ID);
		SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' est rejetée' 
		Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
	END
	ELSE IF (@State = 'Acceptee')
	BEGIN
		IF (@DT = 'Demande activité relex')
		BEGIN
			SELECT @userID =dbo.GetUserByType('Responsable AR')
			SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
			SELECT @userID_C = dbo.GetUserByDI(@Demand_ID);
			SELECT @desc_C =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' est acceptée' 
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
			Execute CREE_NOTIFICATION @Demand_ID , @userID_C , @desc_C , 'hotel'
		END 
		ELSE IF (@DT = 'Demande de tirage' )
		BEGIN
			Update notification
			set seen = 1
			where notification_ID = @NID
			SELECT @userID_C = dbo.GetUserByDI(@Demand_ID);
			SELECT @desc_C =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' est acceptée'
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
			Execute CREE_NOTIFICATION @Demand_ID , @userID_C , @desc_C , 'print'
		END
		ELSE IF (@DT = 'Demande de prise en charge')
		BEGIN
			SELECT @userID =dbo.GetUserByType('Responsable PEC')
			SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
			SELECT @userID_C = dbo.GetUserByDI(@Demand_ID);
			SELECT @desc_C =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' est acceptée'
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
			Execute CREE_NOTIFICATION @Demand_ID , @userID_C , @desc_C , 'flight'
		END
		ELSE IF (@DT = 'Demande véhicule')
		BEGIN
			Update notification
			set seen = 1
			where notification_ID = @NID
			SELECT @userID_C = dbo.GetUserByDI(@Demand_ID);
			SELECT @desc_C =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+'est acceptée'
			Execute CREE_NOTIFICATION @Demand_ID , @userID_C , @desc_C , 'commute'
		END
		ELSE IF (@DT = 'Demande client' )
		BEGIN
			SELECT @userID =dbo.GetUserByType('Agent de magasin')
			SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
			SELECT @userID_C = dbo.GetUserByDI(@Demand_ID);
			SELECT @desc_C =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' est acceptée'
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
			Execute CREE_NOTIFICATION @Demand_ID , @userID_C , @desc_C , 'devices'
		END
		ELSE IF (@DT = 'Demande fourniture'  )
		BEGIN
			SELECT @userID =dbo.GetUserByType('Agent de magasin')
			SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
			SELECT @userID_C = dbo.GetUserByDI(@Demand_ID);
			SELECT @desc_C =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' est acceptée'
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc;
			Execute CREE_NOTIFICATION @Demand_ID , @userID_C , @desc_C , 'edit';
		END
	END
	ELSE IF (@State = 'Directeur')
	BEGIN
		SELECT @userID =dbo.GetDirecteurByDI(@Demand_ID);
		SELECT @desc =  'Il y a une '+dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
		Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
	END
	ELSE IF (@State = 'DAM')
	BEGIN
		SELECT @userID =dbo.GetUserByType('Responsable DAM')
		SELECT @desc =  'Il y a une '+dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
		Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
	END
	ELSE IF (@State = 'Informatique')
	BEGIN
		SELECT @userID =dbo.GestDestinationMail(@Demand_ID)
		SELECT @desc =  'Il y a une '+dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
		Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
	END
	ELSE IF (@State = 'Chef de parc')
	BEGIN
			SELECT @userID =dbo.GetUserByType('Chef de parc')
			SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
	END
	ELSE IF (@State = 'Agent de Tirage')
	BEGIN
			SELECT @userID =dbo.GetUserByType('Agent de Tirage')
			SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
	END
	SELECT @DDATE = (CONVERT (datetime, SYSDATETIME()))
END