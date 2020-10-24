
ALTER VIEW Demandes_A_Traiter AS
	SELECT utilisateurs.departement, dbo.DemandeType(demande.demande_ID) as type_demande, demande.*
	FROM demande , utilisateurs
	where demande.utilisateurs_ID = utilisateurs.email;

ALTER PROCEDURE getDemandeATraiter 
	@UserType AS varchar(50),
	@Depart AS varchar(50)
AS
BEGIN
	if(@UserType = 'Chef departement')
		select * from Demandes_A_Traiter
		WHERE etat IN ('Encours', 'Rejectee') AND departement = @Depart
	if(@UserType = 'Directeur')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee1' AND departement = @Depart
	if(@UserType = 'Directeur DAM')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee2' AND departement = @Depart
	if(@UserType = 'Agent de magasin')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee3' AND type_demande NOT IN ('Demande tirage', 'Demande véhicule')
	if(@UserType = 'Agent de Tirage')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee3' AND type_demande = 'Demande tirage'
	if(@UserType = 'Chef de parc')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee3' AND type_demande = 'Demande véhicule'
END

ALTER PROCEDURE UpdateDemandState 
	@Demand_ID AS int,
	@motif AS varchar(max),
	@State AS varchar(50)
AS
BEGIN
	UPDATE	demande
	SET		etat = @State, 
			motif= @motif
	WHERE	demande_ID = @Demand_ID
END