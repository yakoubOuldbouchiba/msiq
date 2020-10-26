ALTER FUNCTION DemandeType (@id as int)
RETURNS varchar(Max)
AS
BEGIN
	DECLARE @demande_type varchar(max)
	DECLARE @is_vehicule_demande bit
	DECLARE @is_fourniture_demande bit
	DECLARE @is_pec_demande bit
	DECLARE @is_relex_demande bit
	DECLARE @is_client_demande bit
	DECLARE @is_tirage_demande bit
	
	
	select @is_vehicule_demande = 1 
	from demande_vehicule
	where demande_V_ID = @id

	select @is_fourniture_demande = 1 
	from demande_fourniture
	where demande_F_ID = @id

	select @is_pec_demande = 1 
	from demande_priseEnCharge
	where demande_P_ID = @id

	select @is_client_demande = 1 
	from demande_client
	where demande_C_ID = @id
	
	select @is_tirage_demande = 1 
	from demande_tirage
	where demande_T_ID = @id

	select @is_relex_demande = 1 
	from demande_relex
	where demande_R_ID = @id
	
	
	if(@is_vehicule_demande = 1)
		set @demande_type = 'Demande véhicule';
	ELSE if(@is_fourniture_demande = 1)
		set @demande_type = 'Demande fourniture';
	ELSE if(@is_client_demande = 1)
		set @demande_type = 'Demande client';
	ELSE if(@is_relex_demande = 1)
		set @demande_type = 'Demande relex';
	ELSE if(@is_pec_demande = 1)
		set @demande_type = 'Demande de prise en charge';
	ELSE if(@is_tirage_demande = 1)
		set @demande_type = 'Demande de tirage';
return @demande_type

END

ALTER VIEW demande_view 
	AS
	SELECT	U.email, 
			dbo.DemandeType(D.demande_ID) as type_demande, 
			D.*  
	FROM	demande D , utilisateurs U
	where	D.utilisateurs_ID = U.email;


CREATE PROCEDURE getDemandes 
@email as varchar(max)
AS
BEGIN
	select * from demande_view
	where email=@email
END