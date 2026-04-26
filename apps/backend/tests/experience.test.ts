import request from "supertest";

const prismaMock = {
  project: {},
  experience: {
    create: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  skill: {},
  profile: {},
  user: {}
};

jest.mock("../src/config/prisma", () => ({
  prisma: prismaMock
}));

import { app } from "../src/app";

describe("Experience API", () => {
  const experience = {
    id: "22222222-2222-2222-2222-222222222222",
    company: "Acme",
    title: "Backend Engineer",
    description: "Built APIs",
    techStack: ["node", "postgres"],
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: null,
    isCurrent: true,
    order: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates an experience", async () => {
    prismaMock.experience.create.mockResolvedValue(experience);
    const response = await request(app).post("/api/experiences").send({
      company: experience.company,
      title: experience.title,
      description: experience.description,
      techStack: experience.techStack,
      startDate: experience.startDate,
      isCurrent: experience.isCurrent,
      order: experience.order
    });
    expect(response.status).toBe(201);
  });

  it("gets all experiences", async () => {
    prismaMock.experience.count.mockResolvedValue(1);
    prismaMock.experience.findMany.mockResolvedValue([experience]);
    const response = await request(app).get("/api/experiences");
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
  });

  it("gets experience by id", async () => {
    prismaMock.experience.findUnique.mockResolvedValue(experience);
    const response = await request(app).get(`/api/experiences/${experience.id}`);
    expect(response.status).toBe(200);
  });

  it("updates an experience", async () => {
    prismaMock.experience.findUnique.mockResolvedValue(experience);
    prismaMock.experience.update.mockResolvedValue({
      ...experience,
      title: "Senior Backend Engineer"
    });
    const response = await request(app)
      .put(`/api/experiences/${experience.id}`)
      .send({
        company: experience.company,
        title: "Senior Backend Engineer",
        description: experience.description,
        techStack: experience.techStack,
        startDate: experience.startDate,
        isCurrent: experience.isCurrent,
        order: experience.order
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Senior Backend Engineer");
  });

  it("deletes an experience", async () => {
    prismaMock.experience.findUnique.mockResolvedValue(experience);
    prismaMock.experience.delete.mockResolvedValue(experience);
    const response = await request(app).delete(`/api/experiences/${experience.id}`);
    expect(response.status).toBe(204);
  });
});
