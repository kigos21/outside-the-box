ALTER TABLE "Customer" ADD COLUMN "email" Text;

UPDATE "Customer" SET "email" = 'default@example.com' WHERE "email" IS NULL;

ALTER TABLE "Customer" ALTER COLUMN "email" SET NOT NULL;