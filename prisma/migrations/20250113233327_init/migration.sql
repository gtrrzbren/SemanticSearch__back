/*
  Warnings:

  - You are about to drop the column `titulo` on the `Registro` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Registro` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Media" AS ENUM ('GRANMA', 'JUVENTUD_REBELDE', 'CUBADEBATE', 'TRABAJADORES', 'OPUS_HABANA', 'BOHEMIA', 'PRENSA_LATINA', 'ADELANTE', 'VANGUARDIA', 'AHORA', 'RADIO_REBELDE', 'RADIO_RELOJ', 'RADIO_TACO', 'TELEVISION_CUBANA', 'PERIODICO_26', 'PERIODICO_ESCAMBRAY', 'PERIODICO_INVASOR', 'PERIODICO_VICTORIA', 'PERIODICO_CIEGO_DE_AVILA', 'PERIODICO_5_DE_SEPTIEMBRE');

-- CreateEnum
CREATE TYPE "Section" AS ENUM ('POLITICA', 'ECONOMIA', 'CULTURA', 'DEPORTES', 'INTERNACIONAL', 'CIENCIA_Y_TECNOLOGIA', 'SALUD', 'EDUCACION', 'MEDIO_AMBIENTE', 'OPINION', 'SOCIEDAD', 'HISTORIA', 'TURISMO', 'GASTRONOMIA', 'ARTE_Y_ESPECTACULOS', 'RELIGION', 'COMUNIDAD', 'MUNDO_DIGITAL', 'CIENCIA', 'TECNOLOGIA');

-- AlterTable
ALTER TABLE "Registro" DROP COLUMN "titulo",
ADD COLUMN     "autor" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "media" "Media",
ADD COLUMN     "publicationDate" TIMESTAMP(3),
ADD COLUMN     "searchTerm" TEXT,
ADD COLUMN     "section" "Section",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
