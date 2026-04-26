-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "resumeUrl" TEXT,
ADD COLUMN     "twitterUrl" TEXT,
ADD COLUMN     "yearsExperience" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "longDescription" TEXT;
