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
	@FID AS int OUTPUT,--for notification
	@recevoir_ID as varchar(max) OUTPUT,--for notification
	@DDATE AS datetime OUTPUT
AS
BEGIN
	INSERT INTO demande 
	VALUES (	(SELECT CONVERT (datetime, SYSDATETIME())),
				@userID,
				'Chef Departement', 
				null,
				0,
				1)
	SELECT @DDATE = CONVERT (datetime, SYSDATETIME())
	INSERT INTO demande_vehicule 
	VALUES (	(SELECT IDENT_CURRENT('demande')), 
				@lieu, 
				@organisme, 
				@motif_deplacement, 
				@date_depart,
				@lieu_remmassage_d ,
	            @date_retour ,
	            @lieu_remmassage_r,
	            @nature_marchandise,
	            @utilisateur1,
	            @utilisateur2,
	            @utilisateur3,
	            null,
	            null);
	SELECT @demande_v_id = IDENT_CURRENT('demande');
	/*Notification part */
	DECLARE @email as varchar(max) 
	SELECT @email = U.email
	FROM utilisateurs U , (
		SELECT U.structure , U.departement
		FROM utilisateurs U
		WHERE U.email = @userID	
	)as I
	WHERE I.structure = U.structure
	AND I.departement = U.departement
	AND U.typeUtilisateur = 'Chef departement'
	EXECUTE CREE_NOTIFICATION  @demande_v_id,@email , 'est effecut�(e) une nouvelle demande v�hicule','commute'
	SELECT @FID = IDENT_CURRENT('notification')
	set @recevoir_ID = @email
END



/--------------------------------------------------------/


ALTER PROCEDURE DeleteDemandeVehicule
	@id as int,
	@typedelete as bit output,
	@recevoir_ID as varchar(max) OUTPUT--For notif
AS
	BEGIN
	Declare @etat  varchar(max)
	select @etat = D.etat 
	From demande D
	where D.demande_ID = @id
	IF(@etat='Acceptee'or @etat='Rejetee')
	BEGIN
		Update demande
		set shown = 0
		where demande_ID = @id;
		set @typedelete = 0;
	END
	ELSE
	BEGIN
		SELECT @recevoir_ID = dbo.GetChefDepartementByDI(@id)--for notif
		DELETE FROM notification WHERE demande_ID = @id
		UPDATE demande_relex set demande_V_ID = null WHERE demande_V_ID = @id
		DELETE FROM demande_vehicule WHERE demande_V_ID = @id;
		DELETE FROM demande WHERE demande_ID = @id
		set @typedelete = 1;
	END
END

-------------------------------------------------

ALTER PROCEDURE GetDemandeVehicule
	@id as int
AS
BEGIN
	SELECT	DV.*,
			U.email,
			U.nomUtilisateur, 
			U.prenomUtilisateur,
			U.departement,
			U.structure ,
			U.posteTelephonique,
			D.demande_Date
	FROM	demande_vehicule DV, utilisateurs U, demande D
	WHERE	DV.demande_V_ID = @id
	AND		D.demande_ID = DV.demande_V_ID
	AND		U.email = D.utilisateurs_ID
END

--------------------------------------------------------
ALTER PROCEDURE UpdateDemandeVehicule
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
	@utilisateur3 as varchar(50),
	@NID AS int OUTPUT,--For notif
	@recevoir_ID as varchar(max) OUTPUT--For notif
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
	--for notif ---
	DECLARE @describ  varchar(max);
	SELECT @recevoir_ID = email
	FROM demande D , utilisateurs U
	WHERE D.utilisateurs_ID = U.email
	AND D.demande_ID = @demande_v_id
	SELECT @recevoir_ID = dbo.GetChefDepartement(@recevoir_ID) --for notif
	SELECT @NID = dbo.GetNotifID(@demande_v_id);-- for notif
	SELECT @describ = 'est modif�(e) la demande v�hicule num�ro '+ CONVERT(Varchar(max) , @demande_v_id)    
	Execute Update_NOTIFICATION @demande_v_id , @recevoir_ID , @describ

END