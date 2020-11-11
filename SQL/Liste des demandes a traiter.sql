ALTER VIEW 	Demandes_A_Traiter 
	AS
	SELECT 	U.departement, 
			U.structure,
			dbo.DemandeType(D.demande_ID) as type_demande, 
			D.*
	FROM	demande D, utilisateurs U
	where	D.utilisateurs_ID = U.email;

ALTER VIEW 	Demandes_A_Traiter 
	AS
	SELECT 	U.departement, 
			U.structure,
			dbo.DemandeType(D.demande_ID) as type_demande, 
			D.*
	FROM	demande D, utilisateurs U
	where	D.utilisateurs_ID = U.email;

ALTER PROCEDURE getDemandeATraiter 
	@UserType AS varchar(50),
	@Depart   AS varchar(50),
	@Struct		AS varchar(50)

AS
BEGIN
	if(@UserType = 'Chef departement')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Chef Departement' 
		AND		departement = @Depart

	if(@UserType = 'Directeur')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Directeur' 
		AND		structure = @Struct

	if(@UserType = 'Responsable DAM')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'DAM'

	if(@UserType = 'Agent de magasin')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	(type_demande = 'Demande client'
		OR		type_demande = 'Demande fourniture')
		AND		etat = 'Acceptee'

	if(@UserType = 'Agent de Tirage')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	type_demande = 'Demande de tirage'
		AND		etat = 'Acceptee'

	if(@UserType = 'Chef de parc')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Acceptee'
		AND		type_demande = 'Demande véhicule'

	if(@UserType = 'Responsable PEC')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Acceptee'
		AND		type_demande = 'Demande de prise en charge'

	if(@UserType = 'Responsable AR')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Acceptee'
		AND		type_demande = 'Demande activité relex'
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
	ELSE IF (@State = 'Acceptee' and (@UT='Directeur' or @UT='Responsable DAM'))
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
			SELECT @userID =dbo.GetUserByType('Agent de Tirage')
			SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
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
			SELECT @userID =dbo.GetUserByType('Chef de parc')
			SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
			SELECT @userID_C = dbo.GetUserByDI(@Demand_ID);
			SELECT @desc_C =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+'est acceptée'
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
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
			Execute CREE_NOTIFICATION @Demand_ID , @userID_C , @desc_C , 'edit';
			Execute Update_NOTIFICATION @Demand_ID , @userID , @desc;
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
	SELECT @DDATE = (CONVERT (datetime, SYSDATETIME()))
END