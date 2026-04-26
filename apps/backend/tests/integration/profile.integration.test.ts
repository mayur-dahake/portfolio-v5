import request from "supertest";

import { app } from "../../src/app";
import { prisma } from "../../src/config/prisma";

beforeAll(async () => {
  await prisma.profile.deleteMany();
});

afterAll(async () => {
  await prisma.profile.deleteMany();
  await prisma.$disconnect();
});

describe("Profile API (integration)", () => {
  it("GET /api/profile - returns 404 when no profile exists", async () => {
    const response = await request(app).get("/api/profile");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Profile not found");
  });

  it("POST /api/profile - creates the profile and returns 201", async () => {
    const response = await request(app).post("/api/profile").send({
      fullName: "Mayur Dahake",
      headline: "Senior Full Stack Developer",
      bio: "Building cool things",
      location: "Pune, India",
      order: 1
    });

    expect(response.status).toBe(201);
    expect(response.body.fullName).toBe("Mayur Dahake");
  });

  it("POST /api/profile - returns 409 when profile already exists", async () => {
    const response = await request(app).post("/api/profile").send({
      fullName: "Duplicate Profile",
      headline: "Should fail",
      order: 1
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toContain("Profile already exists");
  });

  it("GET /api/profile - returns the single profile", async () => {
    const response = await request(app).get("/api/profile");

    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe("Mayur Dahake");
  });

  it("PUT /api/profile - updates the profile and returns 200", async () => {
    const response = await request(app).put("/api/profile").send({
      headline: "Principal Engineer"
    });

    expect(response.status).toBe(200);
    expect(response.body.headline).toBe("Principal Engineer");
  });

  it("PUT /api/profile - returns 400 for invalid payload", async () => {
    const response = await request(app).put("/api/profile").send({
      fullName: "",
      headline: ""
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation failed");
  });
});
