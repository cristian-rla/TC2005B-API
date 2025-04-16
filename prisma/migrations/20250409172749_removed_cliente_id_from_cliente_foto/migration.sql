/*
  Warnings:

  - You are about to drop the column `clienteId` on the `ClienteFoto` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[ClienteFoto] DROP CONSTRAINT [ClienteFoto_clienteId_key];

-- AlterTable
ALTER TABLE [dbo].[ClienteFoto] DROP COLUMN [clienteId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
