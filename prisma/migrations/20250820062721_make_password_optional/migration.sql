-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
