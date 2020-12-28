USE [Msiq_db]
GO

INSERT INTO [dbo].[structure]
           ([design]
           ,[description])
     VALUES
     		('300',	'Cellule Comminication'),
            ('393',	'Direction Administration & Moyen'),
		   	('3E3',	'Direction Audit'),
			('390',	'Direction Branche'),
			('3T2',	'Direction DED'),
			('3T3',	'Direction Canalisation'),
			('3E1',	'Direction EPP'),
			('395',	'Direction Exploitation'),
			('391',	'Direction Finance'),
			('396',	'Direction HSE'),
			('3E2',	'Direction Informatique'),
			('394',	'Direction Juridique'),
			('398',	'Direction Marketing'),
			('39Q',	'Direction Qualité'),
			('392',	'Direction RH'),
			('3T1',	'Direction Technique'),
			('397',	'Direction Transport')
GO

INSERT INTO destination
     VALUES
            (2,'393',	'Direction Administration & Moyen'),
			(11,'3E2',	'Direction Informatique')


