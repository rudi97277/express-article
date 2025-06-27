import { ArticleParam } from "@/api/article/article.validation";
import { pageViewController } from "@/api/page-view/page-view.controller";
import {
  PageViewAggregateQuery,
  PageViewCountQuery,
} from "@/api/page-view/page-view.validation";
import { RouterDenifition } from "@/common/utils/routerHelper";

export const pageViewRouter: Array<RouterDenifition> = [
  {
    method: "post",
    path: "/page-views",
    noAuth: true,
    validator: { body: ArticleParam },
    action: pageViewController.createPageView,
  },
  {
    method: "get",
    path: "/page-views/count",
    validator: { query: PageViewCountQuery },
    action: pageViewController.countPageView,
  },
  {
    method: "get",
    path: "/page-views/aggregate-date",
    validator: { query: PageViewAggregateQuery },
    action: pageViewController.aggregatePageView,
  },
];
