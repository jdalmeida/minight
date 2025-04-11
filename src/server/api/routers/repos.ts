import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getGitHubRepos } from "@/app/(authenticated)/actions/github";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const repoRouter = createTRPCRouter({
  getRepos: protectedProcedure
  .query(async () => {
    return await getGitHubRepos();
  }),
  
  createProject: protectedProcedure
  .input(z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    repositoryUrl: z.string(),
    branch: z.string().optional(),
  }))
  .query(async ({ ctx, input }) => {
    const existingProject = await ctx.db.project.findUnique({
      where: {
        slug: input.slug
      }
    })

    if (existingProject) {
      throw new TRPCError({
        message: 'Slug is already being used!',
        code: 'FORBIDDEN'
      })
    }

    return await ctx.db.project.create({
      data: {
        ...input,
        ownerId: ctx.auth.userId
      }
    })
  }),

  deleteProject: protectedProcedure
  .input(z.object({
    id: z.string().cuid()
  }))
  .query(async ({ ctx, input }) => {
    const existingProject = await ctx.db.project.findUnique({
      where: {
        id: input.id
      }
    })

    if (!existingProject) {
      throw new TRPCError({
        message: 'Project not found!',
        code: 'NOT_FOUND'
      })
    }

    if (existingProject.ownerId !== ctx.auth.userId){
      throw new TRPCError({
        message: 'You are not the owner of the project!',
        code: 'UNAUTHORIZED'
      })
    }

    return await ctx.db.project.delete({
      where: {
        id: input.id
      }
    })
  }),

  updateProject: protectedProcedure
  .input(z.object({
    id: z.string().cuid(),
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    repositoryUrl: z.string().optional(),
    branch: z.string().optional(),
  }))
  .query(async ({ ctx, input })=>{
    const existingProject = await ctx.db.project.findUnique({
      where: {
        id: input.id
      }
    })

    if (!existingProject) {
      throw new TRPCError({
        message: 'Project not found!',
        code: 'NOT_FOUND'
      })
    }

    if (existingProject.ownerId !== ctx.auth.userId){
      throw new TRPCError({
        message: 'You are not the owner of the project!',
        code: 'UNAUTHORIZED'
      })
    }

    return await ctx.db.project.update({
      data: {
        ...input
      },
      where: {
        id: input.id
      }
    })
  }),
});
