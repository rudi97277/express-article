import { articleService } from "@/api/article/article.service";
import { sendResponse } from "@/common/utils/httpHandlers";
import { Request, RequestHandler, Response } from "express";

class ArticleController {
  public getArtiles: RequestHandler = async (req: Request, res: Response) => {
    sendResponse(res, await articleService.getAllArticle(req.user));
  };

  public getArticle: RequestHandler = async (req: Request, res: Response) => {
    const { articleId } = req.params;
    sendResponse(res, await articleService.getArticleById(req.user, articleId));
  };

  public createArticle: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    sendResponse(res, await articleService.createArticle(req.body, req.user));
  };

  public updateArticle: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { articleId } = req.params;
    sendResponse(
      res,
      await articleService.updateArticle(articleId, req.user, req.body)
    );
  };

  public deleteArticle: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { articleId } = req.params;
    sendResponse(res, await articleService.deleteArticle(articleId, req.user));
  };
}

export const articleController = new ArticleController();
