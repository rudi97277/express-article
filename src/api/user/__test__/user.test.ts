import { User } from "@/api/user/user.model";
import { userService } from "@/api/user/user.service";
import { ServiceResponse } from "@/common/utils/serviceResponse";

import { app } from "@/server";
import { mockUser } from "@/tests/mock";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("User API Endpoint", () => {
  describe("GET /users", () => {
    it("should return a list of users", async () => {
      vi.spyOn(userService, "getAllUser").mockResolvedValue([mockUser]);
      const response = await request(app).get("/api/v1/users");
      const responseBody: ServiceResponse<User[]> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data[0].username).toBe("rudi97278");
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user ", async () => {
      vi.spyOn(userService, "getUserById").mockResolvedValue(mockUser);
      const response = await request(app).get(`/api/v1/users/${mockUser._id}`);
      const responseBody: ServiceResponse<User> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data.username).toBe("rudi97278");
    });
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const { name, username, password } = mockUser;

      vi.spyOn(userService, "createUser").mockResolvedValue(mockUser);

      const response = await request(app).post("/api/v1/users").send({
        name,
        username,
        password,
      });
      const responseBody: ServiceResponse<User> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data.username).toBe("rudi97278");
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user ", async () => {
      const { name, username, password } = mockUser;

      vi.spyOn(userService, "updateUser").mockResolvedValue(mockUser);
      const response = await request(app)
        .put(`/api/v1/users/${mockUser._id}`)
        .send({ name, username, password });
      const responseBody: ServiceResponse<User> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Request success");
      expect(responseBody.data.username).toBe("rudi97278");
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user ", async () => {
      vi.spyOn(userService, "deleteUser").mockResolvedValue(mockUser);
      const response = await request(app).delete(
        `/api/v1/users/${mockUser._id}`
      );
      const responseBody: ServiceResponse<User> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data.username).toBe("rudi97278");
    });
  });
});
