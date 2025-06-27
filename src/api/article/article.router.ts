import { articleController } from "@/api/article/article.controller";
import {
  ArticleParam,
  CreateArticleBody,
} from "@/api/article/article.validation";
import { RouterDenifition } from "@/common/utils/routerHelper";

export const articleRouter: Array<RouterDenifition> = [
  {
    method: "post",
    path: "/articles",
    validator: { body: CreateArticleBody },
    action: articleController.createArticle,
  },
  {
    method: "get",
    path: "/articles",
    flexAuth: true,
    action: articleController.getArtiles,
  },
  {
    method: "get",
    path: "/articles/:articleId",
    flexAuth: true,
    validator: {
      params: ArticleParam,
    },
    action: articleController.getArticle,
  },
  {
    method: "put",
    path: "/articles/:articleId",
    validator: { params: ArticleParam, body: CreateArticleBody },
    action: articleController.updateArticle,
  },
  {
    method: "delete",
    path: "/articles/:articleId",
    validator: { params: ArticleParam },
    action: articleController.deleteArticle,
  },
];
