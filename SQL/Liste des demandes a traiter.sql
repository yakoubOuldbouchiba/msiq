
CREATE VIEW Demandes_A_Traiter AS
	SELECT utilisateurs.email, utilisateurs.departement, dbo.DemandeType(demande.demande_ID) as type_demande, demande.*,  utilisateurs.nomUtilisateur , utilisateurs.prenomUtilisateur
	FROM demande , utilisateurs
	where demande.utilisateurs_ID = utilisateurs.email;

SELECT * FROM utilisateurs
CREATE PROCEDURE getDemandeATraiter 
	@UserType AS varchar(50),
	@Depart AS varchar(50)
AS
BEGIN
	if(@UserType = 'Chef departement')
		select * from Demandes_A_Traiter
		WHERE etat = 'Encours'
	if(@UserType = 'Directeur')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee1'
	if(@UserType = 'Directeur DAM')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee2'
	if(@UserType = 'Agent de magasin')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee3' AND type_demande NOT IN ('Demande tirage', 'Demande véhicule')
	if(@UserType = 'Agent de Tirage')
		select * from Demandes_A_Traiter
		WHERE etat = 'Acceptee3' AND type_demande = 'Demande tirage'
END