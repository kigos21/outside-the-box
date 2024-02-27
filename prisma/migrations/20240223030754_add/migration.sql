/*
  Warnings:

  - Added the required column `additionalInfo` to the `FacilityReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendees` to the `FacilityReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `FacilityReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purpose` to the `FacilityReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FacilityReservation" ADD COLUMN     "additionalInfo" TEXT NOT NULL,
ADD COLUMN     "attendees" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "purpose" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OTP" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '10 minutes';
