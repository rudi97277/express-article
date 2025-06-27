import { pageViewService } from "@/api/page-view/page-view.service";
import { TPageViewAggregateQuery } from "@/api/page-view/page-view.validation";
import { sendResponse } from "@/common/utils/httpHandlers";
import { Request, RequestHandler, Response } from "express";

class PageViewController {
  public createPageView: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { articleId } = req.params;
    sendResponse(res, await pageViewService.createPageViewArticle(articleId));
  };

  public countPageView: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    sendResponse(res, await pageViewService.countPageViewArticle(req.query));
  };

  public aggregatePageView: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    sendResponse(
      res,
      await pageViewService.aggregatePageViewArticle(
        req.query as TPageViewAggregateQuery
      )
    );
  };
}

export const pageViewController = new PageViewController();
