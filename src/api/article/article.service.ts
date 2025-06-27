import {
  Article,
  ArticleModel,
  ArticleStatus,
} from "@/api/article/article.model";
import { TCreateArticleBody } from "@/api/article/article.validation";
import { User } from "@/api/user/user.model";
import { HttpError } from "@/common/utils/httpError";
import { StatusCodes } from "http-status-codes";

export class ArticleService {
  async createArticle(
    data: TCreateArticleBody,
    user: User | undefined
  ): Promise<Article> {
    if (user === undefined) {
      throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    return await ArticleModel.create({
      title: data.title,
      content: data.content,
      status: data.status,
      user: user,
    });
  }

  async getAllArticle(user: User | undefined): Promise<Article[]> {
    const statuses = [ArticleStatus.PUBLISHED];
    user !== undefined && statuses.push(ArticleStatus.DRAFT);

    return await ArticleModel.find({
      status: { $in: statuses },
    });
  }

  async getArticleById(
    user: User | undefined,
    articleId: string
  ): Promise<Article> {
    const statuses = [ArticleStatus.PUBLISHED];
    user !== undefined && statuses.push(ArticleStatus.DRAFT);

    const article = await ArticleModel.findOne({
      status: { $in: statuses },
      _id: articleId,
    });

    if (article === null) {
      throw new HttpError("Article not found", StatusCodes.NOT_FOUND);
    }

    return article;
  }

  async updateArticle(
    articleId: string,
    user: User | undefined,
    data: TCreateArticleBody
  ): Promise<Article> {
    if (user === undefined) {
      throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    const article = await this.getArticleById(user, articleId);

    if (!article.user.equals(user._id as any)) {
      throw new HttpError(
        "Can only update your article",
        StatusCodes.BAD_REQUEST
      );
    }

    article.title = data.title;
    article.content = data.content;
    article.status = data.status as ArticleStatus;

    await article.save();

    return article;
  }

  async deleteArticle(articleId: string, user: User | undefined) {
    if (user === undefined) {
      throw new HttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    const article = await this.getArticleById(user, articleId);

    if (!article.user.equals(user._id as any)) {
      throw new HttpError(
        "Can only update your article",
        StatusCodes.BAD_REQUEST
      );
    }

    await article.deleteOne();

    return article;
  }
}

export const articleService = new ArticleService();
