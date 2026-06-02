/*
  Warnings:

  - You are about to drop the column `customerAddress` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "customerAddress",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "countryCode" TEXT NOT NULL DEFAULT '+62';

-- CreateTable
CREATE TABLE "ServiceStatusLog" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceStatusLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceStatusLog" ADD CONSTRAINT "ServiceStatusLog_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
