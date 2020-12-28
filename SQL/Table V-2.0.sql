--structure--
DROP TABLE structure
CREATE TABLE structure(
 id int IDENTITY(1, 1) PRIMARY KEY NOT NULL, 
 design varchar(3),
 description varchar(250) unique
)
--destination--
DROP TABLE destination
CREATE TABLE destination(
 id int  PRIMARY KEY , 
 design varchar(3) unique,
 description varchar(250) unique 
 CONSTRAINT FK_dest_struct FOREIGN KEY (id) REFERENCES structure(id)
);
--add column into DC--
ALTER TABLE demande_client
ADD destination_id int;


ALTER TABLE demande_client
ADD CONSTRAINT FK_demande_client_destination FOREIGN KEY (destination_id) REFERENCES destination(id)

--check etat update--

ALTER TABLE demande DROP CONSTRAINT CHK_etat;

ALTER TABLE demande
ADD CONSTRAINT CHK_etat CHECK(etat IN ('Directeur','DAM','Agent de Tirage', 'Agent de magasin', 'Chef de parc', 'Acceptee','Rejetee', 'Chef Departement' , 'Informatique'))


