/*
  Warnings:

  - A unique constraint covering the columns `[idFoto]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idFoto]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idFoto]` on the table `ProductoServicio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idFoto` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Made the column `idEmpresa` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `idFoto` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comision` to the `Negociacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Negociacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `ProductoNegociacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idFoto` to the `ProductoServicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `ProductoServicio` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Cliente] DROP CONSTRAINT [Cliente_idEmpresa_fkey];

-- AlterTable
ALTER TABLE [dbo].[Cliente] ALTER COLUMN [idEmpresa] INT NOT NULL;
ALTER TABLE [dbo].[Cliente] ADD [idFoto] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Empresa] ADD [idFoto] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Negociacion] ADD [comision] FLOAT(53) NOT NULL,
[total] FLOAT(53) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ProductoNegociacion] ADD [subtotal] FLOAT(53) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ProductoServicio] ADD [idFoto] INT NOT NULL,
[stock] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[EmpresaLogo] (
    [idFoto] INT NOT NULL IDENTITY(1,1),
    [foto] VARBINARY(max) NOT NULL,
    CONSTRAINT [EmpresaLogo_pkey] PRIMARY KEY CLUSTERED ([idFoto])
);

-- CreateTable
CREATE TABLE [dbo].[ClienteFoto] (
    [idFoto] INT NOT NULL IDENTITY(1,1),
    [foto] VARBINARY(max) NOT NULL,
    CONSTRAINT [ClienteFoto_pkey] PRIMARY KEY CLUSTERED ([idFoto])
);

-- CreateTable
CREATE TABLE [dbo].[ProductoServicioFoto] (
    [idFoto] INT NOT NULL IDENTITY(1,1),
    [foto] VARBINARY(max) NOT NULL,
    CONSTRAINT [ProductoServicioFoto_pkey] PRIMARY KEY CLUSTERED ([idFoto])
);

-- CreateIndex
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idFoto_key] UNIQUE NONCLUSTERED ([idFoto]);

-- CreateIndex
ALTER TABLE [dbo].[Empresa] ADD CONSTRAINT [Empresa_idFoto_key] UNIQUE NONCLUSTERED ([idFoto]);

-- CreateIndex
ALTER TABLE [dbo].[ProductoServicio] ADD CONSTRAINT [ProductoServicio_idFoto_key] UNIQUE NONCLUSTERED ([idFoto]);

-- AddForeignKey
ALTER TABLE [dbo].[Empresa] ADD CONSTRAINT [Empresa_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[EmpresaLogo]([idFoto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idEmpresa_fkey] FOREIGN KEY ([idEmpresa]) REFERENCES [dbo].[Empresa]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cliente] ADD CONSTRAINT [Cliente_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[ClienteFoto]([idFoto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProductoServicio] ADD CONSTRAINT [ProductoServicio_idFoto_fkey] FOREIGN KEY ([idFoto]) REFERENCES [dbo].[ProductoServicioFoto]([idFoto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
