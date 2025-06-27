import { authService } from "@/api/auth/auth.service";
import { User } from "@/api/user/user.model";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { app } from "@/server";
import { mockUser } from "@/tests/mock";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Auth API Endpoint", () => {
  describe("POST /login", () => {
    it("should return a token with user", async () => {
      const mockLogin: {
        token: string;
        user: User;
      } = {
        token: "Testing",
        user: mockUser,
      };

      vi.spyOn(authService, "loginReturnToken").mockResolvedValue(mockLogin);
      const response = await request(app)
        .post("/api/v1/login")
        .send({ username: mockUser.username, password: mockUser.password });

      const responseBody: ServiceResponse<{
        token: string;
        user: User;
      }> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data.token).toBe("Testing");
    });
  });

  describe("POST /logout", () => {
    it("should return a null", async () => {
      vi.spyOn(authService, "logoutRemoveToken").mockResolvedValue(null);
      const response = await request(app).post("/api/v1/logout");

      const responseBody: ServiceResponse<null> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data).toBe(null);
    });
  });
});

beforeEach(() => {
  vi.restoreAllMocks();
});
