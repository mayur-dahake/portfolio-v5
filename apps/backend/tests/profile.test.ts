import request from "supertest";

const prismaMock = {
  project: {},
  experience: {},
  skill: {},
  profile: {
    findFirst: jest.fn(),
    update: jest.fn()
  },
  user: {}
};

jest.mock("../src/config/prisma", () => ({
  prisma: prismaMock
}));

import { app } from "../src/app";

describe("Profile API", () => {
  const profile = {
    id: "44444444-4444-4444-4444-444444444444",
    fullName: "Mayur Dahake",
    headline: "Senior Full Stack Developer",
    order: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("gets the single profile", async () => {
    prismaMock.profile.findFirst.mockResolvedValue(profile);
    const response = await request(app).get("/api/profile");
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(profile.id);
  });

  it("updates the single profile", async () => {
    prismaMock.profile.findFirst.mockResolvedValue(profile);
    prismaMock.profile.update.mockResolvedValue({
      ...profile,
      headline: "Principal Engineer"
    });
    const response = await request(app).put("/api/profile").send({
      fullName: profile.fullName,
      headline: "Principal Engineer",
      order: 1
    });
    expect(response.status).toBe(200);
    expect(response.body.headline).toBe("Principal Engineer");
  });

  it("returns 400 for invalid profile payload", async () => {
    const response = await request(app).put("/api/profile").send({
      fullName: "",
      headline: ""
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });

  it("returns 404 when profile does not exist", async () => {
    prismaMock.profile.findFirst.mockResolvedValue(null);
    const response = await request(app).get("/api/profile");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Profile not found");
  });
});
