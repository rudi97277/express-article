import { User } from "@/api/user/user.model";
import { Document, model, Schema, Types } from "mongoose";

export enum ArticleStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export interface Article extends Document {
  title: string;
  status: ArticleStatus;
  content: string;
  user: Types.ObjectId | User;
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<Article>({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(ArticleStatus),
    required: true,
    default: ArticleStatus.DRAFT,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ArticleModel = model<Article>("Article", articleSchema);
