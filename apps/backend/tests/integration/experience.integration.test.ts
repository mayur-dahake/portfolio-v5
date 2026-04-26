import request from "supertest";

import { app } from "../../src/app";
import { prisma } from "../../src/config/prisma";

afterAll(async () => {
  await prisma.experience.deleteMany();
  await prisma.$disconnect();
});

describe("Experience API (integration)", () => {
  let createdId: string;

  it("POST /api/experiences - creates an experience and returns 201", async () => {
    const response = await request(app)
      .post("/api/experiences")
      .send({
        company: "Acme Corp",
        title: "Backend Engineer",
        description: "Built REST APIs",
        techStack: ["node", "postgres"],
        startDate: "2024-01-01T00:00:00.000Z",
        isCurrent: true,
        order: 1
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.company).toBe("Acme Corp");
    createdId = response.body.id;
  });

  it("GET /api/experiences - lists experiences and returns 200", async () => {
    const response = await request(app).get("/api/experiences");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.meta.total).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/experiences?isCurrent=true - filters by isCurrent", async () => {
    const response = await request(app).get("/api/experiences?isCurrent=true");

    expect(response.status).toBe(200);
    expect(
      response.body.data.every((e: { isCurrent: boolean }) => e.isCurrent)
    ).toBe(true);
  });

  it("GET /api/experiences/:id - gets experience by id and returns 200", async () => {
    const response = await request(app).get(`/api/experiences/${createdId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdId);
  });

  it("PATCH /api/experiences/:id - updates experience and returns 200", async () => {
    const response = await request(app)
      .patch(`/api/experiences/${createdId}`)
      .send({
        company: "Acme Corp",
        title: "Senior Backend Engineer",
        description: "Built and scaled REST APIs",
        techStack: ["node", "postgres"],
        startDate: "2024-01-01T00:00:00.000Z",
        isCurrent: true,
        order: 1
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Senior Backend Engineer");
  });

  it("DELETE /api/experiences/:id - deletes experience and returns 204", async () => {
    const response = await request(app).delete(`/api/experiences/${createdId}`);

    expect(response.status).toBe(204);
  });
});
