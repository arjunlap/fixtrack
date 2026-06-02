-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "countryCode" TEXT NOT NULL DEFAULT '62',
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'IDR';
