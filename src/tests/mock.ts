import { Article } from "@/api/article/article.model";
import { PageView } from "@/api/page-view/page-view.model";
import { User } from "@/api/user/user.model";

export const mockUser: User = {
  _id: "665b4a3d94f8e411f03e5612",
  name: "rudi",
  username: "rudi97278",
  password: "testPassword",
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as User;

export const mockArticle: Article = {
  _id: "665b4a3d94f8e411f03e5613",
  title: "Halo Indonesia",
  content: "Indonesia Jaya",
  status: "draft",
  user: mockUser,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as Article;

export const mockPageView: PageView = {
  _id: "665b4a3d94f8e411f03e5614",
  article: mockArticle,
  viewAt: new Date(),
} as unknown as PageView;
