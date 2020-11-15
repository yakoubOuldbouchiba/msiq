CREATE FUNCTION DemandeEtat (@id as int)
RETURNS varchar(Max)
AS
BEGIN
	Declare @curentEtat as varchar(max)
	Declare @Etat as varchar(max)

	Select @curentEtat = demande.etat
	FROM demande
	Where demande.demande_ID = @id
	IF(@curentEtat = 'Acceptee' or @curentEtat='Rejetee')
		BEGIN
		 set @Etat = @curentEtat
		END
	ELSE
		BEGIN
		 set @Etat = 'Encours'
		END
	return @Etat
END
SELECT dbo.DemandeEtat (436)
CREATE VIEW demandeNewEtat
	AS
	SELECT 
		D.demande_ID , 
		dbo.DemandeType(D.demande_ID) as type_demande , 
		dbo.DemandeEtat(D.demande_ID) as etat , 
		D.demande_Date , 
		U.structure,
		U.departement,
		U.email,
		U.nomUtilisateur,
		U.prenomUtilisateur
	FROM demande D , utilisateurs U
	WHERE U.email = D.utilisateurs_ID
	
CREATE PROCEDURE Total
	@struct as varchar(max)
AS
BEGIN
	SELECT D.etat , count(D.demande_ID) as total
	FROM demandeNewEtat D
	Where D.structure = @struct
	GROUP BY D.etat
END
CREATE PROCEDURE TotalYEAR
	@struct as varchar(max)
AS
BEGIN
	SELECT D.etat , count(D.demande_ID) as total
	FROM demandeNewEtat D
	WHERE YEAR(CONVERT (datetime, SYSDATETIME()))= YEAR(D.demande_Date)
	AND D.structure = @struct
	GROUP BY D.etat
END
CREATE PROCEDURE TotalMonth
	@struct as varchar(max)
AS
BEGIN
	SELECT D.etat , count(D.demande_ID) as total
	FROM demandeNewEtat D
	WHERE MONTH(CONVERT (datetime, SYSDATETIME()))= MONTH(D.demande_Date)
	AND YEAR(CONVERT (datetime, SYSDATETIME()))= YEAR(D.demande_Date)
	AND D.structure = @struct
	GROUP BY D.etat
END
CREATE PROCEDURE TotalDay
	@struct as varchar(max)
AS
BEGIN
	SELECT D.etat , count(D.demande_ID) as total
	FROM demandeNewEtat D
	WHERE DAY(CONVERT (datetime, SYSDATETIME()))= DAY(D.demande_Date)
	AND MONTH(CONVERT (datetime, SYSDATETIME()))= MONTH(D.demande_Date)
	AND YEAR(CONVERT (datetime, SYSDATETIME()))= YEAR(D.demande_Date)
	AND D.structure = @struct
	GROUP BY D.etat
END

CREATE PROCEDURE TotalByDemand
	@struct as varchar(max)
AS
BEGIN
	SELECT D.etat , D.type_demande , count(D.demande_ID)  as total
	FROM demandeNewEtat D
	Where D.structure = @struct
	GROUP BY D.etat , type_demande
END

CREATE PROCEDURE TotalByDemandInYear
	@struct as varchar(max)
AS
BEGIN
	SELECT D.etat , D.type_demande , count(D.demande_ID)  as total
	FROM demandeNewEtat D
	Where D.structure = @struct
	AND YEAR(CONVERT (datetime, SYSDATETIME()))= YEAR(D.demande_Date)
	GROUP BY D.etat , type_demande
END


CREATE PROCEDURE TotalByDemandInMonth
	@struct as varchar(max)
AS
BEGIN
	SELECT D.etat , D.type_demande , count(D.demande_ID)  as total
	FROM demandeNewEtat D
	Where D.structure = @struct
	AND Month(CONVERT (datetime, SYSDATETIME()))= Month(D.demande_Date)
	AND YEAR(CONVERT (datetime, SYSDATETIME()))= YEAR(D.demande_Date)
	GROUP BY D.etat , type_demande
END

CREATE PROCEDURE TotalByDemandInDay
	@struct as varchar(max)
AS
BEGIN
	SELECT D.etat , D.type_demande , count(D.demande_ID)  as total
	FROM demandeNewEtat D
	Where D.structure = @struct
	AND day(CONVERT (datetime, SYSDATETIME()))= day(D.demande_Date)
	AND MONTH(CONVERT (datetime, SYSDATETIME()))= MONTH(D.demande_Date)
	AND YEAR(CONVERT (datetime, SYSDATETIME()))= YEAR(D.demande_Date)
	GROUP BY D.etat , type_demande
END

EXECUTE TotalByDemand 'DAM'

