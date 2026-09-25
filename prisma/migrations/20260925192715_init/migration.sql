/*
  Warnings:

  - You are about to drop the column `descripcion` on the `clases` table. All the data in the column will be lost.
  - You are about to drop the column `crearEn` on the `inscripciones` table. All the data in the column will be lost.
  - You are about to alter the column `estado` on the `inscripciones` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- DropForeignKey
ALTER TABLE `inscripciones` DROP FOREIGN KEY `inscripciones_horarioId_fkey`;

-- DropIndex
DROP INDEX `inscripciones_horarioId_miembroId_key` ON `inscripciones`;

-- DropIndex
DROP INDEX `miembros_membresia_key` ON `miembros`;

-- AlterTable
ALTER TABLE `clases` DROP COLUMN `descripcion`;

-- AlterTable
ALTER TABLE `inscripciones` DROP COLUMN `crearEn`,
    ADD COLUMN `creadaEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `estado` ENUM('confirmada', 'cancelada') NOT NULL DEFAULT 'confirmada';

-- CreateIndex
CREATE INDEX `inscripciones_horarioId_idx` ON `inscripciones`(`horarioId`);

-- AddForeignKey
ALTER TABLE `inscripciones` ADD CONSTRAINT `inscripciones_horarioId_fkey` FOREIGN KEY (`horarioId`) REFERENCES `horarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
