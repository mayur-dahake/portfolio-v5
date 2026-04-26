import request from "supertest";

const prismaMock = {
  project: {},
  experience: {},
  skill: {
    create: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  profile: {},
  user: {}
};

jest.mock("../src/config/prisma", () => ({
  prisma: prismaMock
}));

import { app } from "../src/app";

describe("Skill API", () => {
  const skill = {
    id: "33333333-3333-3333-3333-333333333333",
    name: "TypeScript",
    category: "backend",
    proficiency: 90,
    order: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a skill", async () => {
    prismaMock.skill.create.mockResolvedValue(skill);
    const response = await request(app).post("/api/skills").send(skill);
    expect(response.status).toBe(201);
  });

  it("gets all skills", async () => {
    prismaMock.skill.count.mockResolvedValue(1);
    prismaMock.skill.findMany.mockResolvedValue([skill]);
    const response = await request(app).get("/api/skills");
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
  });

  it("gets skill by id", async () => {
    prismaMock.skill.findUnique.mockResolvedValue(skill);
    const response = await request(app).get(`/api/skills/${skill.id}`);
    expect(response.status).toBe(200);
  });

  it("updates a skill", async () => {
    prismaMock.skill.findUnique.mockResolvedValue(skill);
    prismaMock.skill.update.mockResolvedValue({ ...skill, name: "Node.js" });
    const response = await request(app)
      .put(`/api/skills/${skill.id}`)
      .send({ ...skill, name: "Node.js" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Node.js");
  });

  it("deletes a skill", async () => {
    prismaMock.skill.findUnique.mockResolvedValue(skill);
    prismaMock.skill.delete.mockResolvedValue(skill);
    const response = await request(app).delete(`/api/skills/${skill.id}`);
    expect(response.status).toBe(204);
  });
});
