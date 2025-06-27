import { mainUser } from "@/tests/mock";
import { vi } from "vitest";

vi.mock("@/common/middleware/authToken", async () => {
  const actual = await vi.importActual<
    typeof import("@/common/middleware/authToken")
  >("@/common/middleware/authToken");

  return {
    ...actual,
    authenticateToken: (option?: { flexAuth?: boolean }) => {
      return (req: any, _res: any, next: any) => {
        const isFlex = option?.flexAuth ?? false;

        if (isFlex && !req.headers.authorization) {
          return next();
        }
        req.user = mainUser;

        next();
      };
    },
  };
});
