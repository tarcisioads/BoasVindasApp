import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('persons').collect();
  },
})

export const getPerson = query({
  args: { id: v.id('persons')},
  handler: async (ctx, { id }) => {
    return await ctx.db
    .query('persons')
    .filter((q) => q.eq(q.field('_id'), id))
    .unique();
  }
});

export const create = mutation({
  args: { modified_at: v.string(), name: v.string(), neighborhood: v.string(), phone: v.string(), service_at: v.string()}, 
    
  handler: async ({db}, args) => {
    await db.insert('persons', args)
  }
});
