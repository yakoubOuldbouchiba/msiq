/*CREATE TABLE utilisateurs (
    email varchar(50) NOT NULL PRIMARY KEY,
	userPassword nvarchar(50) NOT NULL,
    nomUtilisateur varchar(50) NOT NULL,
    prenomUtilisateur varchar(50) NOT NULL,
	typeUtilisateur varchar(50) NOT NULL,
	dateNaissance Date NOT NULL,
    mobile varchar(15) NOT NULL,
	fonction varchar(225) NOT NULL ,
	structure varchar(50) NOT NULL,
	departement varchar(50) NULL,
	CONSTRAINT CHK_typeUtilisateur CHECK(typeUtilisateur IN ('Client', 'Directeur', 'Directeur DAM' , 'Chef departement'
	, 'Chef departement DAM', 'Chef de parc', 'Agent de magasin', 'Agent de Tirage'))
) ON [PRIMARY]*/

CREATE TABLE demande_compte(
	email varchar(50) NOT NULL PRIMARY KEY,
	userPassword nvarchar(50) NOT NULL,
    nomUtilisateur varchar(50) NOT NULL,
    prenomUtilisateur varchar(50) NOT NULL,
	typeUtilisateur varchar(50) NOT NULL,
	dateNaissance Date NOT NULL,
    mobile varchar(15) NOT NULL,
	fonction varchar(225) NOT NULL ,
	structure varchar(50) NOT NULL,
	departement varchar(50) NULL,
	CONSTRAINT CHK_typeUtilisateur CHECK(typeUtilisateur IN ('Client', 'Directeur', 'Directeur DAM' , 'Chef departement'
	, 'Chef departement DAM', 'Chef de parc', 'Agent de magasin', 'Agent de Tirage'))
) ON [PRIMARY]

/*CREATE TABLE demande (
	demande_ID int IDENTITY(1, 1) PRIMARY KEY NOT NULL,
	demande_Date date NOT NULL,
	utilisateurs_ID varchar(50) NOT NULL,
	etat varchar(50) NOT NULL,
	motif varchar(MAX) NULL,
	CONSTRAINT CHK_etat CHECK(etat IN ('Acceptée1','Acceptée2','Acceptée3', 'Rejectée', 'Encours')),
	CONSTRAINT FK_utilisateurs_demande FOREIGN KEY (utilisateurs_ID) REFERENCES utilisateurs(email)
) ON [PRIMARY]

CREATE TABLE demande_client (
	demande_C_ID int PRIMARY KEY NOT NULL,
	demande_C_description varchar(MAX) NOT NULL,
	nature varchar(50) NOT NULL,
	objet varchar (50) NOT NULL,
	mise_disposition bit NULL,
	date_mise_dispostion date NULL,
	achat bit NULL,
	date_achat date NULL,
	CONSTRAINT FK_demande_client_demande FOREIGN KEY (demande_C_ID) REFERENCES demande(demande_ID)
) ON [PRIMARY]

CREATE TABLE demande_vehicule (
	demande_V_ID int PRIMARY KEY NOT NULL,
	lieu varchar(100) NOT NULL,
	organisme varchar (50) NOT NULL,
	motif_deplacement varchar(250) NOT NULL,
	date_depart date NOT NULL,
	lieu_ramassage_d varchar(100),
	date_retour date NOT NULL,
	lieu_ramassage_r varchar(100),
	nature_marchandise varchar(50) NOT NULL,
	utilisateur1_ID varchar(50) NOT NULL,
	utilisateur2_ID varchar(50) NOT NULL,
	utilisateur3_ID varchar(50) NOT NULL,
	CONSTRAINT FK_demande_vehicule_demande FOREIGN KEY (demande_V_ID) REFERENCES demande(demande_ID),
	CONSTRAINT FK_utilisateur1_demande FOREIGN KEY (utilisateur1_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_utilisateur2_demande FOREIGN KEY (utilisateur2_ID) REFERENCES utilisateurs(email),
	CONSTRAINT FK_utilisateur3_demande FOREIGN KEY (utilisateur3_ID) REFERENCES utilisateurs(email)
) ON [PRIMARY];

CREATE TABLE demande_tirage (
	demande_T_ID int,
	numero_ordre int,
	date_prestation date ,
	PRIMARY KEY(demande_T_ID ),
	CONSTRAINT FK_demande_tirage_document_demande_tirage FOREIGN KEY (demande_T_ID) REFERENCES demande_tirage(demande_T_ID),
)ON [PRIMARY];

CREATE TABLE document (
	document_ID int PRIMARY KEY,
	demande_T_ID int,
	nom_document varchar(MAX) NOT NULL,
	nombre_feuille int NOT NULL,
	nombre_exemplaire int NOT NULL,
	total_feuille int NOT NULL,
	type_document varchar(MAX) NULL,  
	CONSTRAINT FK_demande_tirage_document_demande_tirage_document FOREIGN KEY (demande_T_ID) REFERENCES demande_tirage(demande_T_ID),
)ON [PRIMARY];


CREATE TABLE  demande_fourniture(
	demande_F_ID int PRIMARY KEY,
	structure varchar(50),
	date_recu date,
	CONSTRAINT FK_demande_fourniture_demande FOREIGN KEY (demande_F_ID)  REFERENCES demande(demande_ID) 
)ON [PRIMARY];

CREATE TABLE objet (
    code_objet varchar(6) PRIMARY KEY,
	designation varchar (255) NOT NULL,
	quantite int NOT NULL
)ON [PRIMARY];

CREATE TABLE demande_fourniture_object (
    demande_F_ID int,
	code_object int,
	PRIMARY KEY(demande_F_ID , code_object),
	CONSTRAINT FK_demande_fourniture_object_demande_fourniture FOREIGN KEY (demande_F_ID) REFERENCES demande_fourniture(demande_F_ID)
) ON [PRIMARY]

CREATE TABLE demande_priseEnCharge (
	demande_P_ID int PRIMARY KEY,
	structure varchar(50),
	destination varchar(MAX) NOT NULL, 
	objet_mission varchar(MAX) NOT NULL,
	moyen_transport varchar(250) NOT NULL,
	date_vol date ,
	aeroport varchar(250),
	CONSTRAINT FK_demande_priseEnCharge  FOREIGN KEY(demande_P_ID) REFERENCES demande(demande_ID)
)ON [PRIMARY]
CREATE TABLE demande_relex (
	demande_R_ID int PRIMARY KEY,
	structure varchar(50),
	destination varchar(MAX) NOT NULL,
	objet_mission varchar(MAX) NOT NULL,
	date_depart date NOT NULL, 
	date_retour date NOT NULL,
	prise_en_charge bit NOT NULL,
	CONSTRAINT FK_demande_relex_demande FOREIGN KEY (demande_R_ID) REFERENCES demande(demande_ID)
)ON [PRIMARY]
CREATE TABLE produit (
    code_produit varchar(6) PRIMARY KEY,
	designation varchar (255) NOT NULL,
	quantite int NOT NULL
)ON [PRIMARY]

CREATE TABLE vehicule(
	matricule varchar(20),
	nom varchar(20),
	annee integer,
	type_vehicule varchar(20),
	PRIMARY KEY (Matricule)
);
CREATE TABLE chauffeur(
	
	chauffeur_id int IDENTITY(1, 1),
	nom varchar(Max),
	prenom varchar(Max),
	type_permis varchar(Max),
	telephone varchar(Max),
	email varchar(MAX),
	PRIMARY KEY (chauffeur_id)

)*/