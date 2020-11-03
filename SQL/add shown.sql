USE [Msiq_db]
GO

/****** Object:  Table [dbo].[utilisateurs]    Script Date: 11/3/2020 3:34:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[utilisateurs](
	[email] [varchar](50) NOT NULL,
	[userPassword] [nvarchar](max) NOT NULL,
	[nomUtilisateur] [varchar](50) NOT NULL,
	[prenomUtilisateur] [varchar](50) NOT NULL,
	[typeUtilisateur] [varchar](50) NOT NULL,
	[dateNaissance] [date] NOT NULL,
	[mobile] [varchar](15) NOT NULL,
	[fonction] [varchar](225) NOT NULL,
	[structure] [varchar](50) NOT NULL,
	[posteTelephonique] [varchar](15) NOT NULL,
	[departement] [varchar](50) NULL,
	[shown] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[utilisateurs] ADD  CONSTRAINT [DF_utilisateurs_shown]  DEFAULT ((1)) FOR [shown]
GO

ALTER TABLE [dbo].[utilisateurs]  WITH CHECK ADD  CONSTRAINT [CHK_typeUtilisateur] CHECK  (([typeUtilisateur]='Agent de Tirage' OR [typeUtilisateur]='Agent de magasin' OR [typeUtilisateur]='Chef de parc' OR [typeUtilisateur]='Chef departement' OR [typeUtilisateur]='Responsable DAM' OR [typeUtilisateur]='Directeur' OR [typeUtilisateur]='Client'))
GO

ALTER TABLE [dbo].[utilisateurs] CHECK CONSTRAINT [CHK_typeUtilisateur]
GO


