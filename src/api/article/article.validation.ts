import { z } from "zod";

export const CreateArticleBody = z.object({
  title: z.string(),
  content: z.string().min(8),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type TCreateArticleBody = z.infer<typeof CreateArticleBody>;

export const ArticleParam = z.object({
  articleId: z.string().length(24),
});

export type TArticleParam = z.infer<typeof ArticleParam>;
