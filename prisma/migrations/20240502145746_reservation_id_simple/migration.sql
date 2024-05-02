/*
  Warnings:

  - The primary key for the `SeatReservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SeatReservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `seatReservationId` on the `ArchivedReservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `seatReservationId` on the `ConfirmedReservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ArchivedReservation" DROP CONSTRAINT "ArchivedReservation_seatReservationId_fkey";

-- DropForeignKey
ALTER TABLE "ConfirmedReservation" DROP CONSTRAINT "ConfirmedReservation_seatReservationId_fkey";

-- AlterTable
ALTER TABLE "ArchivedReservation" DROP COLUMN "seatReservationId",
ADD COLUMN     "seatReservationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ConfirmedReservation" DROP COLUMN "seatReservationId",
ADD COLUMN     "seatReservationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OTP" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '10 minutes';

-- AlterTable
ALTER TABLE "SeatReservation" DROP CONSTRAINT "SeatReservation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SeatReservation_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ConfirmedReservation" ADD CONSTRAINT "ConfirmedReservation_seatReservationId_fkey" FOREIGN KEY ("seatReservationId") REFERENCES "SeatReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedReservation" ADD CONSTRAINT "ArchivedReservation_seatReservationId_fkey" FOREIGN KEY ("seatReservationId") REFERENCES "SeatReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
