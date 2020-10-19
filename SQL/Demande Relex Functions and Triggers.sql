CREATE PROCEDURE InsertDemandeRelex
	@userID AS varchar(50),
	@destination AS varchar(max),
	@objet_mission as varchar(max),
	@date_depart as datetime,
	@date_retour as datetime,
	@prise_en_charge as bit ,
	@demande_V_ID as int
AS
BEGIN
	INSERT INTO demande VALUES ((SELECT CONVERT (datetime, SYSDATETIME())),@userID,'Encours', null)
	INSERT INTO demande_relex VALUES ((SELECT IDENT_CURRENT('demande')), @destination,@objet_mission,@date_depart,@date_retour,@prise_en_charge,@demande_V_ID)
END

--------------------------------------

CREATE PROCEDURE DeleteDemandeRelex
	@id as int

AS
BEGIN
	DELETE FROM demande_relex WHERE demande_R_ID = @id;
	DELETE FROM demande_vehicule WHERE demande_V_ID = (select demande_V_ID from demande_relex where demande_R_ID = @id );
	DELETE FROM demande WHERE demande_ID = @id
END

-----------------------------------------------
-- get relex demande --

CREATE PROCEDURE GetDemandeRelex
	@id as int
AS
BEGIN
	SELECT * FROM demande_relex
	WHERE demande_R_ID = @id
END
-- update relex demande  --
CREATE PROCEDURE UpdateDemandeRelex
	@destination AS varchar(max),
	@objet_mission as varchar(max),
	@date_depart as datetime,
	@date_retour as datetime,
	@prise_en_charge as bit ,
	@demande_R_ID as int
AS
BEGIN
	UPDATE demande_relex
	SET destination = @destination,
	objet_mission = @objet_mission,
	date_depart = @date_depart,
	date_retour = @date_retour,
	prise_en_charge = @prise_en_charge
	WHERE demande_R_ID = @demande_R_ID
END

EXECUTE GetDemandeRelex 140