/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `mobileNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" RENAME COLUMN "contactNumber" TO "mobileNumber";

-- AlterTable
ALTER TABLE "OTP" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '10 minutes';
