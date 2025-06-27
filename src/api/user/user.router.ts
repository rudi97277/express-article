import { userController } from "@/api/user/user.controller";
import { CreateUserBody, UserParam } from "@/api/user/user.validation";
import { RouterDenifition } from "@/common/utils/routerHelper";

export const userRouter: Array<RouterDenifition> = [
  {
    method: "get",
    path: "/users/:userId",
    noAuth: true,
    validator: { params: UserParam },
    action: userController.getUserById,
  },
  {
    method: "get",
    path: "/users",
    noAuth: true,
    action: userController.getUsers,
  },
  {
    method: "post",
    path: "/users",
    validator: { body: CreateUserBody },
    action: userController.createUser,
  },
  {
    method: "put",
    path: "/users/:userId",
    validator: { params: UserParam, body: CreateUserBody },
    action: userController.updateUser,
  },
  {
    method: "delete",
    path: "/users/:userId",
    validator: { params: UserParam },
    action: userController.deleteUser,
  },
];
