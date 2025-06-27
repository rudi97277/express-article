import { authController } from "@/api/auth/auth.controller";
import { LoginUserBody } from "@/api/auth/auth.validation";
import { RouterDenifition } from "@/common/utils/routerHelper";

export const authRouter: Array<RouterDenifition> = [
  {
    method: "post",
    path: "/login",
    noAuth: true,
    validator: { body: LoginUserBody },
    action: authController.login,
  },
  {
    method: "post",
    path: "/logout",
    action: authController.logout,
  },
];
