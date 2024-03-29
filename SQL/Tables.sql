DROP TABLE utilisateurs
CREATE TABLE utilisateurs (
    email varchar(50) NOT NULL PRIMARY KEY,
	userPassword nvarchar(MAX) NOT NULL,
    nomUtilisateur varchar(50) NOT NULL,
    prenomUtilisateur varchar(50) NOT NULL,
	typeUtilisateur varchar(50) NOT NULL,
	dateNaissance Date NOT NULL,
    mobile varchar(15) NOT NULL,
	fonction varchar(225) NOT NULL ,
	structure varchar(50) NOT NULL,
	posteTelephonique varchar(15) NOT NULL,
	departement varchar(50) NULL,
	CONSTRAINT CHK_typeUtilisateur CHECK(typeUtilisateur IN ('Client', 'Directeur', 'Responsable DAM' , 'Chef departement'
	, 'Chef de parc', 'Agent de magasin', 'Agent de Tirage',  'Responsable PEC', 'Responsable AR'))
) ON [PRIMARY]

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE demande_compte
CREATE TABLE demande_compte(
	email varchar(50) NOT NULL PRIMARY KEY,
	userPassword nvarchar(max) NOT NULL,
    nomUtilisateur varchar(50) NOT NULL,
    prenomUtilisateur varchar(50) NOT NULL,
	typeUtilisateur varchar(50) NOT NULL,
	dateNaissance Date NOT NULL,
    mobile varchar(15) NOT NULL,
	fonction varchar(225) NOT NULL ,
	structure varchar(50) NOT NULL,
	posteTelephonique varchar(15) NOT NULL,
	departement varchar(50) NULL,
	CONSTRAINT CHK__typeUtilisateur CHECK(typeUtilisateur IN ('Client', 'Directeur', 'Responsable DAM' , 'Chef departement'
	, 'Chef de parc', 'Agent de magasin', 'Agent de Tirage',  'Responsable PEC', 'Responsable AR'))
) ON [PRIMARY]

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE demande
CREATE TABLE demande (
	demande_ID int IDENTITY(1, 1) PRIMARY KEY NOT NULL,
	demande_Date datetime NOT NULL,
	utilisateurs_ID varchar(50) NOT NULL,
	etat varchar(50) NOT NULL,
	motif varchar(MAX) NULL,
	seen bit, 
	CONSTRAINT CHK_etat CHECK(etat IN ('Directeur','DAM','Agent de Tirage', 'Agent de magasin', 'Chef de parc', 'Acceptee','Rejetee', 'Chef Departement')),
	CONSTRAINT FK_utilisateurs_demande FOREIGN KEY (utilisateurs_ID) REFERENCES utilisateurs(email)
) ON [PRIMARY]
/*------------------------------------------------------------------------------------------------------------------------*/
DROP TABLE notification;
CREATE TABLE notification(
	notification_ID int IDENTITY(1, 1) PRIMARY KEY NOT NULL, 
	demande_ID int ,
	recevoir_ID varchar(Max),
	seen bit,
	date_notification datetime , 
	description_notif varchar(max) ,
	icon varchar(max)
)ON [PRIMARY]
/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE  demande_client
CREATE TABLE demande_client (
	demande_C_ID int PRIMARY KEY NOT NULL,
	demande_C_description varchar(MAX) NOT NULL,
	nature varchar(50) NOT NULL,
	objet varchar (50) NOT NULL,
	mise_disposition bit NULL,
	date_mise_dispostion date NULL,
	achat bit NULL,
	nAchat int NULL,
	date_achat date NULL,
	oAchats varchar(max) NULL
	CONSTRAINT FK_demande_client_demande FOREIGN KEY (demande_C_ID) REFERENCES demande(demande_ID)
) ON [PRIMARY]

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE demande_vehicule;
CREATE TABLE demande_vehicule (
	demande_V_ID int PRIMARY KEY NOT NULL,
	lieu varchar(100) NOT NULL,
	organisme varchar (50) NOT NULL,
	motif_deplacement varchar(250) NOT NULL,
	date_depart datetime NOT NULL,
	lieu_ramassage_d varchar(100),
	date_retour datetime NOT NULL,
	lieu_ramassage_r varchar(100),
	nature_marchandise varchar(50),
	utilisateur1_ID varchar(50) ,
	utilisateur2_ID varchar(50) ,
	utilisateur3_ID varchar(50) ,
	matricule varchar(20),
	chauffeur_ID int ,
	observation varchar(max),
	CONSTRAINT FK_demande_vehicule_demande FOREIGN KEY (demande_V_ID) REFERENCES demande(demande_ID),
	CONSTRAINT FK_utilisateur1_demande FOREIGN KEY (utilisateur1_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_utilisateur2_demande FOREIGN KEY (utilisateur2_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_utilisateur3_demande FOREIGN KEY (utilisateur3_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_vehicule_demande_vehicule FOREIGN KEY (matricule) REFERENCES vehicule(matricule),
	CONSTRAINT FK_chauffeur_demande_vehicule FOREIGN KEY (chauffeur_ID)REFERENCES chauffeur(chauffeur_ID)
) ON [PRIMARY];

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE demande_tirage
CREATE TABLE demande_tirage (
	demande_T_ID int PRIMARY KEY,
	numero_ordre int,
	date_prestation date ,
	document_ID int,
	CONSTRAINT FK_demande_demande_tirage FOREIGN KEY (demande_T_ID) REFERENCES demande(demande_ID),
	CONSTRAINT FK_demande_tirage_document FOREIGN KEY (document_ID) REFERENCES document(document_ID),
)ON [PRIMARY];

/*------------------------------------------------------------------------------------------------------------------------*/

CREATE TABLE document (
	document_ID int IDENTITY(1, 1) PRIMARY KEY,
	nom_document varchar(MAX) NOT NULL,
	nombre_feuille int NOT NULL,
	nombre_exemplaire int NOT NULL,
	total_feuille int NOT NULL,
	type_document varchar(MAX) NULL, 
	autre varchar(max) null,
	stored_name varchar(max) NOT NULL,
	format_fichier varchar(10) NOT NULL,
)ON [PRIMARY];

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE demande_fourniture
CREATE TABLE  demande_fourniture(
	demande_F_ID int PRIMARY KEY,
	date_recu date,
	CONSTRAINT FK_demande_fourniture_demande FOREIGN KEY (demande_F_ID)  REFERENCES demande(demande_ID) 
)ON [PRIMARY];

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE objet
CREATE TABLE objet (
    code_object varchar(6) PRIMARY KEY,
	designation varchar (255) NOT NULL,
	quantite int NOT NULL,
	shown bit Null
)ON [PRIMARY];

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE demande_fourniture_object
CREATE TABLE demande_fourniture_object (
    demande_F_ID int,
	code_object VarChar(6),
	qty_demande int,
	qty_accordee int,
	observation varchar(MAX)
	PRIMARY KEY(demande_F_ID , code_object),
	CONSTRAINT FK_demande_fourniture_object_objet FOREIGN KEY (code_object) REFERENCES objet(code_object),
	CONSTRAINT FK_demande_fourniture_object_demande_fourniture FOREIGN KEY (demande_F_ID) REFERENCES demande_fourniture(demande_F_ID)
) ON [PRIMARY]

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE demande_priseEnCharge
CREATE TABLE demande_priseEnCharge (
	demande_P_ID int PRIMARY KEY,
	collegue1_ID varchar(50),
	collegue2_ID varchar(50),
	collegue3_ID varchar(50),
	collegue4_ID varchar(50),
	collegue5_ID varchar(50),
	destination varchar(MAX) NOT NULL, 
	objet_mission varchar(MAX) NOT NULL,
	startDate date ,
	EndDate date,
	moyen_transport varchar(250) NOT NULL,
	aeroport varchar(250),
	heureDeVol time,
	CONSTRAINT FK_demande_priseEnCharge_demande FOREIGN KEY(demande_P_ID) REFERENCES demande(demande_ID),
	CONSTRAINT FK_demande_priseEnCharge_utilisateur1  FOREIGN KEY(collegue1_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_demande_priseEnCharge_utilisateur2  FOREIGN KEY(collegue2_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_demande_priseEnCharge_utilisateur3  FOREIGN KEY(collegue3_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_demande_priseEnCharge_utilisateur4  FOREIGN KEY(collegue4_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_demande_priseEnCharge_utilisateur5  FOREIGN KEY(collegue5_ID) REFERENCES utilisateurs(email),
)ON [PRIMARY]

/*------------------------------------------------------------------------------------------------------------------------*/

DROP TABLE demande_relex;
CREATE TABLE demande_relex (
	demande_R_ID int PRIMARY KEY,
	destination varchar(MAX) NOT NULL,
	objet_mission varchar(MAX) NOT NULL,
	date_depart datetime NOT NULL, 
	date_retour datetime NOT NULL,
	prise_en_charge bit NOT NULL,
	demande_V_ID int ,
	CONSTRAINT FK_demande_relex_demande FOREIGN KEY (demande_R_ID) REFERENCES demande(demande_ID),
	CONSTRAINT FK_demande_relex_demande_vehicule FOREIGN KEY (demande_V_ID) REFERENCES demande_vehicule(demande_V_ID)
)ON [PRIMARY]

/*------------------------------------------------------------------------------------------------------------------------*/

CREATE TABLE produit (
    code_produit varchar(6) PRIMARY KEY,
	designation varchar (255) NOT NULL,
	quantite int NOT NULL
)ON [PRIMARY]

/*------------------------------------------------------------------------------------------------------------------------*/

CREATE TABLE vehicule(
	matricule varchar(20),
	nom varchar(20),
	annee integer,
	type_vehicule varchar(20),
	dispo bit,
	shown bit,
	PRIMARY KEY (Matricule)
);

/*------------------------------------------------------------------------------------------------------------------------*/

CREATE TABLE chauffeur(
	chauffeur_id int IDENTITY(1, 1),
	nom varchar(Max),
	prenom varchar(Max),
	type_permis varchar(Max),
	telephone varchar(Max),
	email varchar(MAX),
	dispoC bit,
	shown bit,
	PRIMARY KEY (chauffeur_id)
)