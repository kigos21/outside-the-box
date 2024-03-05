-- AlterTable
ALTER TABLE "OTP" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '10 minutes';

-- AddForeignKey
ALTER TABLE "ArchivedReservation" ADD CONSTRAINT "ArchivedReservation_seatReservationId_fkey" FOREIGN KEY ("seatReservationId") REFERENCES "SeatReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
