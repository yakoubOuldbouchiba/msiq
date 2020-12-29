--structure--
DROP TABLE structure
CREATE TABLE structure(
 struct_id int IDENTITY(1, 1) PRIMARY KEY NOT NULL, 
 design varchar(3),
 description varchar(250) unique
)
--add column into D--
ALTER TABLE demande
ADD destination_id int;

ALTER TABLE demande
ADD CONSTRAINT FK_demande_structure FOREIGN KEY (destination_id) REFERENCES structure(struct_id)

--add column into Demande--
ALTER TABLE demande
ADD reciever varchar(50);

ALTER TABLE demande
ADD CONSTRAINT FK_Reciever FOREIGN KEY (reciever) REFERENCES utilisateurs(email);

 


--check etat update--

ALTER TABLE demande DROP CONSTRAINT CHK_etat;

ALTER TABLE demande
ADD CONSTRAINT 
CHK_etat CHECK(etat IN (
	'Acceptee',
	'Rejetee',
	'Directeur',
	'Chef Departement' ,
	'Directeur Destination',
	'Chef Departement Destination',
	'Directeur DAM',
	'Employee',
	'Agent de Tirage', 
	'Agent de magasin', 
	'Chef de parc', 
	'Chef de service'
	))

--check user type update--
ALTER TABLE utilisateurs DROP CONSTRAINT CHK_typeUtilisateur;
ALTER TABLE utilisateurs
ADD CONSTRAINT CHK_typeUtilisateur CHECK(typeUtilisateur IN 
(	'Client', 
	'Directeur',  
	'Chef departement',
	'Chef de parc', 
	'Agent de magasin', 
	'Agent de Tirage',  
	'Chef service', 
	'Responsable AR'))

--structure update 
ALTER TABLE utilisateurs
ADD structure int;

ALTER TABLE utilisateurs
ADD CONSTRAINT FK_utilisateurs_structure FOREIGN KEY (structure) REFERENCES structure(struct_id)
