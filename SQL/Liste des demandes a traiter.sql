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
		WHERE	etat = 'Agent de magasin'

	if(@UserType = 'Agent de Tirage')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	type_demande = 'Demande de tirage'
		AND		etat = 'Acceptee'

	if(@UserType = 'Chef de parc')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Chef de parc'
END


ALTER PROCEDURE UpdateDemandState 
	@Demand_ID	AS int,
	@motif		AS varchar(max),
	@State		AS varchar(50),
	@userID AS varchar(max) output,-- add it for notif
	@NID AS int output, -- add it for notif
	@desc AS varchar(max) output-- add it for notif
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
		SELECT @userID = dbo.GetUserByDI(@Demand_ID);
		SELECT @desc =  dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' est acceptée' 
		Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
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
	ELSE IF (@State = 'Agent de Tirage')
	BEGIN
		SELECT @userID =dbo.GetUserByType('Agent de Tirage')
		SELECT @desc =  'Il y a une '+dbo.DemandeType(@Demand_ID)+' '+CONVERT(Varchar(max) , @Demand_ID)+' a traiter' 
		Execute Update_NOTIFICATION @Demand_ID , @userID , @desc
	END
END