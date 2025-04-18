BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Cliente] DROP CONSTRAINT [Cliente_idFoto_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Empresa] DROP CONSTRAINT [Empresa_idFoto_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProductoServicio] DROP CONSTRAINT [ProductoServicio_idFoto_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[Empresa] ADD CONSTRAINT [Empresa_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[EmpresaLogo]([idFoto]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[ClienteFoto]([idFoto]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductoServicio] ADD CONSTRAINT [ProductoServicio_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[ProductoServicioFoto]([idFoto]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
