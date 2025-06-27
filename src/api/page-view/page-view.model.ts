import { Article } from "@/api/article/article.model";
import { model, Schema, Types } from "mongoose";

export interface PageView extends Document {
  article: Types.ObjectId | Article;
  viewAt: Date;
}

const pageViewSchema = new Schema<PageView>({
  article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
  viewAt: { type: Date, required: true },
});

export const PageViewModel = model<PageView>("PageView", pageViewSchema);
