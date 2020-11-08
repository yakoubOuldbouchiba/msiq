ALTER PROCEDURE InsertDemandeRelex
	@userID AS varchar(50),
	@destination AS varchar(max),
	@objet_mission as varchar(max),
	@date_depart as datetime,
	@date_retour as datetime,
	@prise_en_charge as bit ,
	@demande_V_ID as int,
	@DID AS int OUTPUT,
	@DDATE AS datetime OUTPUT,
	@etat AS varchar(50)
AS
BEGIN
	INSERT INTO demande 
	VALUES (	(SELECT CONVERT (datetime, SYSDATETIME())),
				@userID,
				@etat, 
				null,
				0,
				1)
	SELECT 		@DDATE = CONVERT (datetime, SYSDATETIME())
	INSERT INTO demande_relex 
	VALUES (	(SELECT IDENT_CURRENT('demande')), 
				@destination,
				@objet_mission,
				@date_depart,
				@date_retour,
				@prise_en_charge,
				@demande_V_ID)
	SELECT 		@DID= IDENT_CURRENT('demande')
END

--------------------------------------
execute DeleteDemandeRelex 99
ALTER PROCEDURE DeleteDemandeRelex
	@id as int,
	@typedelete as bit output

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
		DELETE FROM demande_relex WHERE demande_R_ID = @id;
		DELETE FROM demande_vehicule WHERE demande_V_ID = (select demande_V_ID from demande_relex where demande_R_ID = @id );
		DELETE FROM demande WHERE demande_ID = @id
		set @typedelete = 1;
	END
END

-----------------------------------------------

ALTER PROCEDURE GetDemandeRelex
	@id as int
AS
BEGIN
	SELECT	DR.*,
			U.email,
			U.nomUtilisateur,
			U.prenomUtilisateur,
			U.departement,
			U.fonction,
			D.*
	FROM	demande_relex DR, demande D, utilisateurs U
	WHERE	DR.demande_R_ID = D.demande_ID
	AND		D.utilisateurs_ID = U.email
	AND		DR.demande_R_ID = @id
END

-- update relex demande  --

ALTER PROCEDURE UpdateDemandeRelex
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