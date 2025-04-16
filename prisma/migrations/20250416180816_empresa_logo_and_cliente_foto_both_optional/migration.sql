BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Cliente] DROP CONSTRAINT [Cliente_idFoto_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Empresa] DROP CONSTRAINT [Empresa_idFoto_fkey];

-- AlterTable
ALTER TABLE [dbo].[Cliente] ALTER COLUMN [idFoto] INT NULL;

-- AlterTable
ALTER TABLE [dbo].[Empresa] ALTER COLUMN [idFoto] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Empresa] ADD CONSTRAINT [Empresa_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[EmpresaLogo]([idFoto]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[ClienteFoto]([idFoto]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
