
--deparment max demand--
ALTER PROCEDURE MaxDemandByDep
	@struct as varchar(max),
	@typeDemand as varchar(max),
	@peroidVarchar as varchar(max)
AS
BEGIN
	IF(@peroidVarchar = 'Cette année')
	BEGIN
		select TOP(1) D.departement , count(D.demande_ID) as maximum
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
		Group By D.departement
		order By maximum DESC

	END
	ELSE IF(@peroidVarchar = 'Ce mois')
	BEGIN
		select TOP(1) D.departement , count(D.demande_ID) as maximum
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		AND Month(D.demande_Date) = Month(CONVERT (datetime, SYSDATETIME()))
		AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
		Group By D.departement
		order By maximum DESC
	END
	ELSE IF(@peroidVarchar = 'Cette semaine')
	BEGIN
		select TOP(1) D.departement , count(D.demande_ID) as maximum
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		AND DATEPART(ISO_WEEK , D.demande_Date) = DATEPART(ISO_WEEK , GETDATE())
		AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
		Group By D.departement
		order By maximum DESC
	END
	ELSE IF(@peroidVarchar = 'Tout le temps')
	BEGIN
		select TOP(1) D.departement , count(D.demande_ID) as maximum
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		Group By D.departement
		order By maximum DESC
	END
END
--user max demand--
ALTER PROCEDURE MaxDemandByUser
	@struct as varchar(max),
	@typeDemand as varchar(max),
	@peroidVarchar as varchar(max)
AS
BEGIN
	IF(@peroidVarchar = 'Cette année')
	BEGIN
		select TOP(1) D.email , count(D.demande_ID) as maximum
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
		Group By D.email
		order By maximum DESC

	END
	ELSE IF(@peroidVarchar = 'Ce mois')
	BEGIN
		select TOP(1) D.email , count(D.demande_ID) as maximum
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		AND Month(D.demande_Date) = Month(CONVERT (datetime, SYSDATETIME()))
		AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
		Group By D.email 
		order By maximum DESC
	END
	ELSE IF(@peroidVarchar = 'Cette semaine')
	BEGIN
		select TOP(1) D.email , count(D.demande_ID) as maximum
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		AND DATEPART(ISO_WEEK , D.demande_Date) = DATEPART(ISO_WEEK , GETDATE())
		AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
		Group By D.email 
		order By maximum DESC
	END
	ELSE IF(@peroidVarchar = 'Tout le temps')
	BEGIN
	    select TOP(1) D.email , count(D.demande_ID) as maximum
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		Group By D.email
		order by maximum DESC;
	END
END
--deparment avg demand--
CREATE PROCEDURE AvgDemandByUser
	@struct as varchar(max),
	@typeDemand as varchar(max),
	@peroidVarchar as varchar(max)
AS
BEGIN
	IF(@peroidVarchar = 'Cette année')
	BEGIN
		select AVG(total) as 'avg'
		FROM (
				select  D.email , count(D.demande_ID) as total
				from demandeNewEtat D
				where D.structure = @struct
				AND D.type_demande = @typeDemand
				AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
				Group By D.email
			) as t
	END
	ELSE IF(@peroidVarchar = 'Ce mois')
	BEGIN
		SELECT AVG(total) as 'avg'
		FROM (
		select  D.email , count(D.demande_ID) as total
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		AND Month(D.demande_Date) = Month(CONVERT (datetime, SYSDATETIME()))
		AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
		Group By D.email) as t
		
	END
	ELSE IF(@peroidVarchar = 'Cette semaine')
	BEGIN
		select AVG(total) as 'avg'
		FROM (
			select  D.email , count(D.demande_ID) as total
			from demandeNewEtat D
			where D.structure = @struct
			AND D.type_demande = @typeDemand
			AND DATEPART(ISO_WEEK , D.demande_Date) = DATEPART(ISO_WEEK , GETDATE())
			AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
			Group By D.email
		) as t
	END
	ELSE IF(@peroidVarchar = 'Tout le temps')
	BEGIN
		SELECT AVG(total) as 'avg'
		FROM (
			select  D.email , count(D.demande_ID) as total
			from demandeNewEtat D
			where D.structure = @struct
			AND D.type_demande = @typeDemand
			Group By D.email
		) as t
		
	END
END
--deparment avg demand--
ALTER PROCEDURE AvgDemandByDep
	@struct as varchar(max),
	@typeDemand as varchar(max),
	@peroidVarchar as varchar(max)
AS
BEGIN
	IF(@peroidVarchar = 'Cette année')
	BEGIN
		select AVG(total) as 'avg'
		FROM (
				select  D.departement , count(D.demande_ID) as total
				from demandeNewEtat D
				where D.structure = @struct
				AND D.type_demande = @typeDemand
				AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
				Group By D.departement
			) as t
	END
	ELSE IF(@peroidVarchar = 'Ce mois')
	BEGIN
		SELECT AVG(total) as 'avg'
		FROM (
		select  D.departement , count(D.demande_ID) as total
		from demandeNewEtat D
		where D.structure = @struct
		AND D.type_demande = @typeDemand
		AND Month(D.demande_Date) = Month(CONVERT (datetime, SYSDATETIME()))
		AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
		Group By D.departement) as t
		
	END
	ELSE IF(@peroidVarchar = 'Cette semaine')
	BEGIN
		select AVG(total) as 'avg'
		FROM (
			select  D.departement , count(D.demande_ID) as total
			from demandeNewEtat D
			where D.structure = @struct
			AND D.type_demande = @typeDemand
			AND DATEPART(ISO_WEEK , D.demande_Date) = DATEPART(ISO_WEEK , GETDATE())
			AND Year(D.demande_Date) = YEAR(CONVERT (datetime, SYSDATETIME()))
			Group By D.departement
		) as t
	END
	ELSE IF(@peroidVarchar = 'Tout le temps')
	BEGIN
		SELECT AVG(total) as 'avg'
		FROM (
			select  D.departement , count(D.demande_ID) as total
			from demandeNewEtat D
			where D.structure = @struct
			AND D.type_demande = @typeDemand
			Group By D.departement
		) as t
		
	END
END
EXECUTE maxDemandByUser 'DAM' , 'Demande véhicule' , 'Ce mois'
EXECUTE AVGDemandBydep 'DAM' , 'Demande activité relex' , 'Cette semaine'
