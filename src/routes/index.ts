import { articleRouter } from "@/api/article/article.router";
import { authRouter } from "@/api/auth/auth.router";
import { pageViewRouter } from "@/api/page-view/page-view.router";
import { userRouter } from "@/api/user/user.router";
import { mapRouter } from "@/common/utils/routerHelper";
import { Router } from "express";

const routes = Router();

// v1 routes
const v1 = Router();
mapRouter(
  routes,
  "/api/v1",
  v1,
  [userRouter, authRouter, articleRouter, pageViewRouter].flat()
);

export default routes;
