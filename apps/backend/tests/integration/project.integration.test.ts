import request from "supertest";

import { app } from "../../src/app";
import { prisma } from "../../src/config/prisma";

afterAll(async () => {
  await prisma.project.deleteMany();
  await prisma.$disconnect();
});

describe("Project API (integration)", () => {
  let createdId: string;

  it("POST /api/projects - creates a project and returns 201", async () => {
    const response = await request(app).post("/api/projects").send({
      title: "Integration Test Project",
      description: "Created by integration test",
      techStack: ["node", "typescript"],
      tags: ["backend", "test"],
      order: 1
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBe("Integration Test Project");
    createdId = response.body.id;
  });

  it("GET /api/projects - lists projects and returns 200", async () => {
    const response = await request(app).get("/api/projects");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.meta.total).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/projects/:id - gets project by id and returns 200", async () => {
    const response = await request(app).get(`/api/projects/${createdId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdId);
  });

  it("GET /api/projects/:id - returns 404 for non-existent id", async () => {
    const response = await request(app).get(
      "/api/projects/00000000-0000-0000-0000-000000000000"
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Project not found");
  });

  it("PUT /api/projects/:id - updates project and returns 200", async () => {
    const response = await request(app)
      .put(`/api/projects/${createdId}`)
      .send({
        title: "Updated Integration Project",
        description: "Updated by integration test",
        techStack: ["node"],
        tags: ["updated"],
        order: 2
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Integration Project");
  });

  it("DELETE /api/projects/:id - deletes project and returns 204", async () => {
    const response = await request(app).delete(`/api/projects/${createdId}`);

    expect(response.status).toBe(204);
  });

  it("POST /api/projects - returns 400 for invalid payload", async () => {
    const response = await request(app).post("/api/projects").send({
      title: "",
      description: ""
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });
});
