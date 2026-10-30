-- DropForeignKey
ALTER TABLE "FollowUp" DROP CONSTRAINT "FollowUp_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_clientId_fkey";

-- DropIndex
DROP INDEX "Client_email_key";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
