import { PrismaClient } from "@prisma/client";
import { profileData } from "./data/profile";
import { projectsData } from "./data/projects";
import { experienceData } from "./data/experience";
import { skillsData } from "./data/skills";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({ data: profileData });
  console.log("  Profile created");

  await prisma.project.createMany({ data: projectsData });
  console.log(`  ${projectsData.length} projects created`);

  await prisma.experience.createMany({ data: experienceData });
  console.log(`  ${experienceData.length} experiences created`);

  await prisma.skill.createMany({ data: skillsData });
  console.log(`  ${skillsData.length} skills created`);

  console.log("Seeding complete.");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
