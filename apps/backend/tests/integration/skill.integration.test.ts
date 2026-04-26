import request from "supertest";

import { app } from "../../src/app";
import { prisma } from "../../src/config/prisma";

afterAll(async () => {
  await prisma.skill.deleteMany();
  await prisma.$disconnect();
});

describe("Skill API (integration)", () => {
  let createdId: string;

  it("POST /api/skills - creates a skill and returns 201", async () => {
    const response = await request(app).post("/api/skills").send({
      name: "TypeScript",
      category: "backend",
      proficiency: 90,
      order: 1
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("TypeScript");
    createdId = response.body.id;
  });

  it("GET /api/skills - lists skills and returns 200", async () => {
    const response = await request(app).get("/api/skills");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.meta.total).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/skills?category=backend - filters by category", async () => {
    const response = await request(app).get("/api/skills?category=backend");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/skills/:id - gets skill by id and returns 200", async () => {
    const response = await request(app).get(`/api/skills/${createdId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdId);
  });

  it("PATCH /api/skills/:id - updates skill and returns 200", async () => {
    const response = await request(app).patch(`/api/skills/${createdId}`).send({
      name: "TypeScript 5",
      category: "backend",
      proficiency: 95,
      order: 1
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("TypeScript 5");
  });

  it("DELETE /api/skills/:id - deletes skill and returns 204", async () => {
    const response = await request(app).delete(`/api/skills/${createdId}`);

    expect(response.status).toBe(204);
  });
});
