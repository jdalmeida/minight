import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getGitHubRepos } from "@/app/(authenticated)/actions/github";

export const repoRouter = createTRPCRouter({
  getRepos: protectedProcedure
    .query(async () => {
      return await getGitHubRepos();
    }),
});
