/*
  Warnings:

  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `complaint` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `partCost` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `technicianId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `timeline` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Service` table. All the data in the column will be lost.
  - The `id` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Part` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Technician` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[trackingCode]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerName` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `issue` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_technicianId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
DROP COLUMN "complaint",
DROP COLUMN "customerId",
DROP COLUMN "partCost",
DROP COLUMN "technicianId",
DROP COLUMN "timeline",
DROP COLUMN "type",
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ADD COLUMN     "technician" TEXT,
ADD COLUMN     "trackingCode" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "issue" SET NOT NULL,
ALTER COLUMN "cost" SET DEFAULT 0,
ALTER COLUMN "cost" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lockPattern" SET DATA TYPE TEXT,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Part";

-- DropTable
DROP TABLE "Technician";

-- CreateIndex
CREATE UNIQUE INDEX "Service_trackingCode_key" ON "Service"("trackingCode");
