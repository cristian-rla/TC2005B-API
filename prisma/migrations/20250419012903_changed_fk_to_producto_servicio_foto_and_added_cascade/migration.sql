/*
  Warnings:

  - You are about to drop the column `idFoto` on the `ProductoServicio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productoId]` on the table `ProductoServicioFoto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productoId` to the `ProductoServicioFoto` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ProductoServicio] DROP CONSTRAINT [ProductoServicio_idFoto_fkey];

-- AlterTable
ALTER TABLE [dbo].[ProductoServicio] DROP COLUMN [idFoto];

-- AlterTable
ALTER TABLE [dbo].[ProductoServicioFoto] ADD [productoId] INT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[ProductoServicioFoto] ADD CONSTRAINT [ProductoServicioFoto_productoId_key] UNIQUE NONCLUSTERED ([productoId]);

-- AddForeignKey
ALTER TABLE [dbo].[ProductoServicioFoto] ADD CONSTRAINT [ProductoServicioFoto_productoId_fkey] FOREIGN KEY ([productoId]) REFERENCES [dbo].[ProductoServicio]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
