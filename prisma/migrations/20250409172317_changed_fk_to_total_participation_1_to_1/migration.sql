/*
  Warnings:

  - You are about to drop the column `contrasena` on the `Cliente` table. All the data in the column will be lost.
  - You are about to alter the column `foto` on the `ClienteFoto` table. The data in that column could be lost. The data in that column will be cast from `VarBinary(Max)` to `VarChar(512)`.
  - You are about to drop the column `empresaId` on the `EmpresaLogo` table. All the data in the column will be lost.
  - You are about to alter the column `foto` on the `EmpresaLogo` table. The data in that column could be lost. The data in that column will be cast from `VarBinary(Max)` to `VarChar(512)`.
  - You are about to drop the column `productoId` on the `ProductoServicioFoto` table. All the data in the column will be lost.
  - You are about to alter the column `foto` on the `ProductoServicioFoto` table. The data in that column could be lost. The data in that column will be cast from `VarBinary(Max)` to `VarChar(512)`.
  - A unique constraint covering the columns `[idFoto]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idFoto]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idFoto]` on the table `ProductoServicio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idFoto` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Made the column `idFoto` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `idFoto` to the `ProductoServicio` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ClienteFoto] DROP CONSTRAINT [ClienteFoto_clienteId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[EmpresaLogo] DROP CONSTRAINT [EmpresaLogo_empresaId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProductoServicioFoto] DROP CONSTRAINT [ProductoServicioFoto_productoId_fkey];

-- DropIndex
ALTER TABLE [dbo].[EmpresaLogo] DROP CONSTRAINT [EmpresaLogo_empresaId_key];

-- DropIndex
ALTER TABLE [dbo].[ProductoServicioFoto] DROP CONSTRAINT [ProductoServicioFoto_productoId_key];

-- AlterTable
ALTER TABLE [dbo].[Cliente] DROP COLUMN [contrasena];
ALTER TABLE [dbo].[Cliente] ADD [idFoto] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ClienteFoto] ALTER COLUMN [foto] VARCHAR(512) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Empresa] ALTER COLUMN [idFoto] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[EmpresaLogo] ALTER COLUMN [foto] VARCHAR(512) NOT NULL;
ALTER TABLE [dbo].[EmpresaLogo] DROP COLUMN [empresaId];

-- AlterTable
ALTER TABLE [dbo].[ProductoServicio] ADD [idFoto] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ProductoServicioFoto] ALTER COLUMN [foto] VARCHAR(512) NOT NULL;
ALTER TABLE [dbo].[ProductoServicioFoto] DROP COLUMN [productoId];

-- CreateIndex
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idFoto_key] UNIQUE NONCLUSTERED ([idFoto]);

-- CreateIndex
ALTER TABLE [dbo].[Empresa] ADD CONSTRAINT [Empresa_idFoto_key] UNIQUE NONCLUSTERED ([idFoto]);

-- CreateIndex
ALTER TABLE [dbo].[ProductoServicio] ADD CONSTRAINT [ProductoServicio_idFoto_key] UNIQUE NONCLUSTERED ([idFoto]);

-- AddForeignKey
ALTER TABLE [dbo].[Empresa] ADD CONSTRAINT [Empresa_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[EmpresaLogo]([idFoto]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[ClienteFoto]([idFoto]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductoServicio] ADD CONSTRAINT [ProductoServicio_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[ProductoServicioFoto]([idFoto]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
