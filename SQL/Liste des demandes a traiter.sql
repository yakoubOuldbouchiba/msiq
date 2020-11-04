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
		WHERE	type_demande = 'Demande client'
		OR		type_demande = 'Demande fourniture'
		AND		etat = 'Acceptee'

	if(@UserType = 'Agent de Tirage')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	type_demande = 'Demande de tirage'
		AND		etat = 'Acceptee'

	if(@UserType = 'Chef de parc')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Chef de parc'

	if(@UserType = 'Responsable PEC')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Acceptee'
		AND		type_demande = 'Demande de prise en charge'

	if(@UserType = 'Responsable AR')
		SELECT	* 
		FROM	Demandes_A_Traiter
		WHERE	etat = 'Acceptee'
		AND		type_demande = 'Demande relex'
END


ALTER PROCEDURE UpdateDemandState 
	@Demand_ID	AS int,
	@motif		AS varchar(max),
	@State		AS varchar(50)
AS
BEGIN
	UPDATE	demande
	SET		etat = @State, 
			motif= @motif
	WHERE	demande_ID = @Demand_ID
END