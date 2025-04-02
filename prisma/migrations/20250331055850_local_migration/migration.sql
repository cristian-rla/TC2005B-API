/*
  Warnings:

  - Added the required column `contrasena` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Cliente] DROP CONSTRAINT [Cliente_idEmpresa_fkey];

-- AlterTable
ALTER TABLE [dbo].[Cliente] ALTER COLUMN [idEmpresa] INT NULL;
ALTER TABLE [dbo].[Cliente] ADD [contrasena] VARCHAR(50) NOT NULL,
[telefono] VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Empresa] ALTER COLUMN [industria] VARCHAR(30) NULL;
ALTER TABLE [dbo].[Empresa] ALTER COLUMN [preferencias] VARCHAR(500) NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idEmpresa_fkey] FOREIGN KEY ([idEmpresa]) REFERENCES [dbo].[Empresa]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
