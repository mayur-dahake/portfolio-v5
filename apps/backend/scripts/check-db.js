require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const p = new PrismaClient();

Promise.all([
  p.project.count(),
  p.experience.count(),
  p.skill.count(),
  p.profile.count(),
  p.user.count()
])
  .then(([proj, exp, skill, prof, usr]) => {
    console.log("Connected to Supabase successfully.");
    console.log(
      "project:",
      proj,
      "| experience:",
      exp,
      "| skill:",
      skill,
      "| profile:",
      prof,
      "| user:",
      usr
    );
  })
  .catch(console.error)
  .finally(() => p.$disconnect());
