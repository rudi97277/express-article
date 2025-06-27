import { z } from "zod";

export const PageViewCountQuery = z.object({
  articleId: z.string().length(24).nullable().optional(),
  startAt: z.string().datetime().nullable().optional(),
  endAt: z.string().datetime().nullable().optional(),
});

export const PageViewAggregateQuery = z.object({
  articleId: z.string().length(24).nullable().optional(),
  startAt: z.string().datetime().nullable().optional(),
  endAt: z.string().datetime().nullable().optional(),
  interval: z.enum(["hourly", "daily", "monthly"]),
});

export type TPageViewCountQuery = z.infer<typeof PageViewCountQuery>;
export type TPageViewAggregateQuery = z.infer<typeof PageViewAggregateQuery>;
