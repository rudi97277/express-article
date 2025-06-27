import { Article } from "@/api/article/article.model";
import { articleService } from "@/api/article/article.service";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { app } from "@/server";
import { mockArticle } from "@/tests/mock";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Article API Endpoint", () => {
  describe("GET /articles", () => {
    it("should return a list of articles", async () => {
      vi.spyOn(articleService, "getAllArticle").mockResolvedValue([
        mockArticle,
      ]);
      const response = await request(app).get("/api/v1/articles");
      const responseBody: ServiceResponse<Article[]> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data[0].title).toBe("Halo Indonesia");
    });
  });

  describe("GET /articles/:id", () => {
    it("should return an article", async () => {
      vi.spyOn(articleService, "getArticleById").mockResolvedValue(mockArticle);
      const response = await request(app).get(
        `/api/v1/articles/${mockArticle._id}`
      );
      const responseBody: ServiceResponse<Article> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data.title).toBe("Halo Indonesia");
    });
  });

  describe("POST /articles", () => {
    it("should create an article", async () => {
      const { title, content, status } = mockArticle;

      vi.spyOn(articleService, "createArticle").mockResolvedValue(mockArticle);
      const response = await request(app)
        .post("/api/v1/articles")
        .send({ title, content, status });
      const responseBody: ServiceResponse<Article> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data.title).toBe("Halo Indonesia");
    });
  });

  describe("PUT /articles/:id", () => {
    it("should update an article", async () => {
      const { title, content, status } = mockArticle;

      vi.spyOn(articleService, "updateArticle").mockResolvedValue(mockArticle);
      const response = await request(app)
        .put(`/api/v1/articles/${mockArticle._id}`)
        .send({ title, content, status });
      const responseBody: ServiceResponse<Article> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data.title).toBe("Halo Indonesia");
    });
  });

  describe("DELETE /articles/:id", () => {
    it("should delete an article", async () => {
      vi.spyOn(articleService, "deleteArticle").mockResolvedValue(mockArticle);
      const response = await request(app).delete(
        `/api/v1/articles/${mockArticle._id}`
      );
      const responseBody: ServiceResponse<Article> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data.title).toBe("Halo Indonesia");
    });
  });
});
