import request from "supertest";

const prismaMock = {
  project: {
    create: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  experience: {},
  skill: {},
  profile: {},
  user: {}
};

jest.mock("../src/config/prisma", () => ({
  prisma: prismaMock
}));

import { app } from "../src/app";

describe("Project API", () => {
  const project = {
    id: "11111111-1111-1111-1111-111111111111",
    title: "Portfolio API",
    description: "Backend service",
    techStack: ["node", "typescript"],
    tags: ["backend"],
    order: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a project", async () => {
    prismaMock.project.create.mockResolvedValue(project);

    const response = await request(app).post("/api/projects").send({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      tags: project.tags,
      order: project.order
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(project.id);
  });

  it("gets all projects", async () => {
    prismaMock.project.count.mockResolvedValue(1);
    prismaMock.project.findMany.mockResolvedValue([project]);

    const response = await request(app).get("/api/projects");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.meta.total).toBe(1);
  });

  it("gets project by id", async () => {
    prismaMock.project.findUnique.mockResolvedValue(project);

    const response = await request(app).get(`/api/projects/${project.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(project.id);
  });

  it("updates a project", async () => {
    prismaMock.project.findUnique.mockResolvedValue(project);
    prismaMock.project.update.mockResolvedValue({
      ...project,
      title: "Updated title"
    });

    const response = await request(app)
      .patch(`/api/projects/${project.id}`)
      .send({
        title: "Updated title",
        description: project.description,
        techStack: project.techStack,
        tags: project.tags,
        order: project.order
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated title");
  });

  it("deletes a project", async () => {
    prismaMock.project.findUnique.mockResolvedValue(project);
    prismaMock.project.delete.mockResolvedValue(project);

    const response = await request(app).delete(`/api/projects/${project.id}`);

    expect(response.status).toBe(204);
  });

  it("returns 400 for invalid project payload", async () => {
    const response = await request(app).post("/api/projects").send({
      title: "",
      description: "",
      techStack: "invalid",
      tags: []
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });

  it("returns 404 for missing project id", async () => {
    prismaMock.project.findUnique.mockResolvedValue(null);
    const response = await request(app).get("/api/projects/missing-id");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Project not found");
  });
});
