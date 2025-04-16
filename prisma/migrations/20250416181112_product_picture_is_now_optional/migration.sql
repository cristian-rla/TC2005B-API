BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ProductoServicio] DROP CONSTRAINT [ProductoServicio_idFoto_fkey];

-- AlterTable
ALTER TABLE [dbo].[ProductoServicio] ALTER COLUMN [idFoto] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[ProductoServicio] ADD CONSTRAINT [ProductoServicio_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[ProductoServicioFoto]([idFoto]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
