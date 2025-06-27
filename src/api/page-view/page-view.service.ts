import { ArticleModel, ArticleStatus } from "@/api/article/article.model";
import { PageView, PageViewModel } from "@/api/page-view/page-view.model";
import {
  TPageViewAggregateQuery,
  TPageViewCountQuery,
} from "@/api/page-view/page-view.validation";
import { HttpError } from "@/common/utils/httpError";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export class PageViewService {
  async createPageViewArticle(articleId: string): Promise<PageView> {
    const article = await ArticleModel.findOne({
      id: articleId,
      status: ArticleStatus.PUBLISHED,
    });
    if (article === null) {
      throw new HttpError("Article not found", StatusCodes.NOT_FOUND);
    }

    return await PageViewModel.create({
      article: article,
      viewAt: new Date(),
    });
  }

  async countPageViewArticle(data: TPageViewCountQuery): Promise<number> {
    const { articleId, startAt, endAt } = data;

    const query: any = {};
    if (startAt && endAt) {
      query.viewAt = {
        $gte: new Date(startAt),
        $lte: new Date(endAt),
      };
    }

    if (articleId) {
      query.article = articleId;
    }

    return await PageViewModel.countDocuments(query);
  }

  async aggregatePageViewArticle(
    data: TPageViewAggregateQuery
  ): Promise<{ [k: string]: number }> {
    const { articleId, startAt, endAt, interval } = data;

    const formats = {
      daily: "%Y-%m-%d",
      hourly: "%H:00",
      monthly: "%Y-%m",
    };

    const match: any = {};

    if (startAt && endAt) {
      match.viewAt = {
        $gte: new Date(startAt),
        $lte: new Date(endAt),
      };
    }

    if (articleId) {
      match.article = new mongoose.Types.ObjectId(articleId);
    }

    const result = await PageViewModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            $dateToString: { format: formats[interval], date: "$viewAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return Object.fromEntries(result.map((item) => [item._id, item.count]));
  }
}

export const pageViewService = new PageViewService();
