import { PageView } from "@/api/page-view/page-view.model";
import { pageViewService } from "@/api/page-view/page-view.service";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { app } from "@/server";
import { mockArticle, mockPageView } from "@/tests/mock";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Page View API Endpoint", () => {
  describe("GET /page-views", () => {
    it("should return a page view", async () => {
      vi.spyOn(pageViewService, "createPageViewArticle").mockResolvedValue(
        mockPageView
      );
      const response = await request(app)
        .post("/api/v1/page-views")
        .send({ articleId: mockArticle._id });
      const responseBody: ServiceResponse<PageView> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(new Date(responseBody.data.viewAt).toDateString()).toBe(
        mockPageView.viewAt.toDateString()
      );
    });
  });

  describe("GET /page-views/count", () => {
    it("should return a count page view", async () => {
      vi.spyOn(pageViewService, "countPageViewArticle").mockResolvedValue(1);
      const response = await request(app).get("/api/v1/page-views/count");
      const responseBody: ServiceResponse<PageView> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data).toBe(1);
    });
  });

  describe("GET /page-views/aggregate-date", () => {
    it("should return an aggregate-date count page view", async () => {
      vi.spyOn(pageViewService, "aggregatePageViewArticle").mockResolvedValue({
        "2025-01-01": 10,
      });

      const response = await request(app).get(
        "/api/v1/page-views/aggregate-date?interval=daily"
      );
      const responseBody: ServiceResponse<PageView> = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.data).toStrictEqual({ "2025-01-01": 10 });
    });
  });
});
