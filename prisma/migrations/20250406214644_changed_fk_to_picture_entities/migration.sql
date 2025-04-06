/*
  Warnings:

  - You are about to drop the column `idFoto` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `idFoto` on the `ProductoServicio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clienteId]` on the table `ClienteFoto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[empresaId]` on the table `EmpresaLogo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productoId]` on the table `ProductoServicioFoto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clienteId` to the `ClienteFoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `EmpresaLogo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productoId` to the `ProductoServicioFoto` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Cliente] DROP CONSTRAINT [Cliente_idFoto_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Empresa] DROP CONSTRAINT [Empresa_idFoto_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProductoServicio] DROP CONSTRAINT [ProductoServicio_idFoto_fkey];

-- DropIndex
ALTER TABLE [dbo].[Cliente] DROP CONSTRAINT [Cliente_idFoto_key];

-- DropIndex
ALTER TABLE [dbo].[Empresa] DROP CONSTRAINT [Empresa_idFoto_key];

-- DropIndex
ALTER TABLE [dbo].[ProductoServicio] DROP CONSTRAINT [ProductoServicio_idFoto_key];

-- AlterTable
ALTER TABLE [dbo].[Cliente] DROP COLUMN [idFoto];

-- AlterTable
ALTER TABLE [dbo].[ClienteFoto] ADD [clienteId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[EmpresaLogo] ADD [empresaId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ProductoServicio] DROP COLUMN [idFoto];

-- AlterTable
ALTER TABLE [dbo].[ProductoServicioFoto] ADD [productoId] INT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[ClienteFoto] ADD CONSTRAINT [ClienteFoto_clienteId_key] UNIQUE NONCLUSTERED ([clienteId]);

-- CreateIndex
ALTER TABLE [dbo].[EmpresaLogo] ADD CONSTRAINT [EmpresaLogo_empresaId_key] UNIQUE NONCLUSTERED ([empresaId]);

-- CreateIndex
ALTER TABLE [dbo].[ProductoServicioFoto] ADD CONSTRAINT [ProductoServicioFoto_productoId_key] UNIQUE NONCLUSTERED ([productoId]);

-- AddForeignKey
ALTER TABLE [dbo].[EmpresaLogo] ADD CONSTRAINT [EmpresaLogo_empresaId_fkey] FOREIGN KEY ([empresaId]) REFERENCES [dbo].[Empresa]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClienteFoto] ADD CONSTRAINT [ClienteFoto_clienteId_fkey] FOREIGN KEY ([clienteId]) REFERENCES [dbo].[Cliente]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductoServicioFoto] ADD CONSTRAINT [ProductoServicioFoto_productoId_fkey] FOREIGN KEY ([productoId]) REFERENCES [dbo].[ProductoServicio]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
