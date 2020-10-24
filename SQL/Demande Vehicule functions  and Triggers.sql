CREATE PROCEDURE GETVEHICULE
AS
BEGIN
	SELECT * FROM vehicule
END
------------------------------------------------------------------------
CREATE PROCEDURE SETVEHICULE 
@matricule as varchar(50),
@nom as varchar(50),
@annee as varchar(50),
@type_vehicule as varchar(50)
AS
BEGIN
	INSERT INTO vehicule 
	VALUES(@matricule , @nom ,@annee , @type_vehicule)
END
------------------------------------------------------
CREATE PROCEDURE DELETEVEHICULE
@matricule as varchar(50)
AS
BEGIN
	DELETE FROM vehicule where matricule = @matricule
END

/*--------------------------------------------*/

ALTER PROCEDURE InsertDemandeVehicule
	@userID AS varchar(50),
	@lieu AS varchar(100),
	@organisme As varchar(50),
	@motif_deplacement AS varchar(50),
	@date_depart AS datetime,
	@lieu_remmassage_d As varchar(100),
	@date_retour AS datetime,
	@lieu_remmassage_r as varchar(100),
	@nature_marchandise as varchar(50),
	@utilisateur1 as varchar(50),
	@utilisateur2 as varchar(50),
	@utilisateur3 as varchar(50),
	@demande_v_id as int output,
	@DDATE AS datetime OUTPUT
AS
BEGIN
	INSERT INTO demande VALUES ((SELECT CONVERT (datetime, SYSDATETIME())),@userID,'Encours', null)
	SELECT @DDATE = CONVERT (datetime, SYSDATETIME())
	INSERT INTO demande_vehicule VALUES ((SELECT IDENT_CURRENT('demande')), @lieu, @organisme, @motif_deplacement, @date_depart, @lieu_remmassage_d ,
	            @date_retour ,@lieu_remmassage_r,@nature_marchandise,@utilisateur1,@utilisateur2,@utilisateur3,null,null);
	SELECT @demande_v_id = IDENT_CURRENT('demande');
END



/--------------------------------------------------------/


ALTER PROCEDURE DeleteDemandeVehicule
	@id as int

AS
BEGIN
	UPDATE demande_relex set demande_V_ID = null WHERE demande_V_ID = @id
	DELETE FROM demande_vehicule WHERE demande_V_ID = @id;
	DELETE FROM demande WHERE demande_ID = @id
END

-------------------------------------------------

ALTER PROCEDURE GetDemandeVehicule
	@id as int
AS
BEGIN
	SELECT	DV.*,
			U.nomUtilisateur, 
			U.prenomUtilisateur,
			U.departement,
			D.demande_Date 
	FROM	demande_vehicule DV, utilisateurs U, demande D
	WHERE	DV.demande_V_ID = @id
	AND		D.demande_ID = DV.demande_V_ID
	AND		U.email = D.utilisateurs_ID
END

--------------------------------------------------------
CREATE PROCEDURE UpdateDemandeVehicule
	@demande_v_id AS int,
	@lieu AS varchar(100),
	@organisme As varchar(50),
	@motif_deplacement AS varchar(50),
	@date_depart AS datetime,
	@lieu_remmassage_d As varchar(100),
	@date_retour AS datetime,
	@lieu_remmassage_r as varchar(100),
	@nature_marchandise as varchar(50),
	@utilisateur1 as varchar(50),
	@utilisateur2 as varchar(50),
	@utilisateur3 as varchar(50)
	
AS
BEGIN
	update demande_vehicule
	set
	lieu = @lieu,
	organisme = @organisme,
	motif_deplacement = @motif_deplacement,
	date_depart = @date_depart,
	lieu_ramassage_d = @lieu_remmassage_d,
	date_retour = @date_retour,
	lieu_ramassage_r = @lieu_remmassage_r,
	nature_marchandise = @nature_marchandise,
	utilisateur1_ID = @utilisateur1,
	utilisateur2_ID = @utilisateur2,
	utilisateur3_ID = @utilisateur3
	where demande_V_ID = @demande_v_id

END