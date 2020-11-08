ALTER PROCEDURE CREE_NOTIFICATION
	@id as int,
	@email as varchar(max),
	@description_notif as varchar(max),
	@icon as varchar(max)
AS
BEGIN
	INSERT INTO notification 
	values
	(
		@id,
		@email,
		0,
		GETDATE(),
		@description_notif,
		@icon
	)
END

CREATE PROCEDURE Update_NOTIFICATION
	@id as int,
	@email as varchar(max),
	@description_notif as varchar(max)
AS
BEGIN
	Update notification 
	set recevoir_ID = @email,
	seen = 0 ,
	date_notification = GETDATE(),
	description_notif = @description_notif
	WHERE demande_ID = @id
	
END
EXECUTE GetNotification 'chefdepart@gmail.com'
ALTER PROCEDURE GetNotification
	@email as varchar(max)
AS
BEGIN
	SELECT U.nomUtilisateur+' '+U.prenomUtilisateur as nom , 
			N.description_notif , 
			N.icon , 
			N.demande_ID , 
			N.notification_ID,
			N.seen
	FROM notification N , demande D, utilisateurs U
	WHERE N.demande_ID = D.demande_ID
	AND D.utilisateurs_ID = U.email
	AND N.recevoir_ID = @email
	ORDER By N.date_notification  DESC
END

CREATE PROCEDURE SeenNotif
	@id as int
AS
BEGIN
	UPDATE notification
	set seen = 1
	Where notification_ID = @id

END

ALTER PROCEDURE UnSeenNotif
	@email as varchar(Max) 
AS
BEGIN
	SELECT count (*) unseen
	FROM notification
	Where recevoir_ID=@email
	AND seen = 0

END
ALTER FUNCTION GetNotifID (@id	as int)
RETURNS int
AS
BEGIN
	DECLARE @NID as int
	SELECT @NID = N.notification_ID
	FROM notification N
	WHERE N.demande_ID = @id 
	return @NID
END

SELECT dbo.GetNotifID(227);

CREATE FUNCTION GetChefDepartement (@userID	as varchar(Max))
RETURNS varchar(Max)
AS
BEGIN
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
	return @email
END

CREATE FUNCTION GetUserByDI (@id	as int)
RETURNS varchar(Max)
AS
BEGIN
	DECLARE @email as varchar(max) 
	SELECT @email = U.email
	FROM utilisateurs U ,demande D
	WHERE U.email = D.utilisateurs_ID
	AND D.demande_ID = @id
	return @email
END
SELECT dbo.GetUserByDI(2)
CREATE FUNCTION GetChefDepartementByDI (@demande_ID	as int)
RETURNS varchar(Max)
AS
BEGIN
	DECLARE @email as varchar(max) 
	SELECT @email = U.email
	FROM utilisateurs U , (
		SELECT U.structure , U.departement
		FROM utilisateurs U ,demande D
		WHERE U.email = D.utilisateurs_ID
		AND D.demande_ID= @demande_ID
		)as I
	WHERE I.structure = U.structure
	AND I.departement = U.departement
	AND U.typeUtilisateur = 'Chef departement'
	return @email
END
CREATE FUNCTION GetDirecteurByDI (@demande_ID	as int)
RETURNS varchar(Max)
AS
BEGIN
	DECLARE @email as varchar(max) 
	SELECT @email = U.email
	FROM utilisateurs U , (
		SELECT U.structure , U.departement
		FROM utilisateurs U ,demande D
		WHERE U.email = D.utilisateurs_ID
		AND D.demande_ID= @demande_ID
		)as I
	WHERE I.structure = U.structure
	AND I.departement = U.departement
	AND U.typeUtilisateur = 'Directeur'
	return @email
END
CREATE FUNCTION GetUserByType(@type	as varchar(max))
RETURNS varchar(Max)
AS
BEGIN
	DECLARE @email as varchar(max) 
	SELECT @email = U.email
	FROM utilisateurs U 
	WHERE U.typeUtilisateur = @type
	return @email
END
SELECT dbo.GetUserByType('Responsable DAM')
SELECT dbo.GetDirecteurByDI(292)


EXECUTE SEEN 160
EXECUTE GetNotification 'chefdepart@gmail.com'
EXECUTE UnSeenNotif 'chefdepart@gmail.com'