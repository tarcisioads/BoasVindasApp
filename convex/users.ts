import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('users').collect();
  },
})

export const getUser = query({
  args: { id: v.id('users')},
  handler: async (ctx, { id }) => {
    return await ctx.db
    .query('users')
    .filter((q) => q.eq(q.field('_id'), id))
    .unique();
  }
});

export const create = mutation({
  args: { name: v.string(), phone: v.string(), password: v.string()}, 
    
  handler: async ({db}, args) => {
    await db.insert('users', args)
  }
});

export const edit = mutation({
  args: { id: v.id('users'), name: v.string(), phone: v.string(), password: v.string()}, 
    
  handler: async ({db}, args) => {
    const id = args.id
    const obj = {name: args.name, phone: args.phone, password: args.password}  
    await db.replace(id, obj)
  }
});
