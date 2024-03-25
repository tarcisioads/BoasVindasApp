import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('groups').collect();
  },
})

export const getGroup = query({
  args: { id: v.id('groups')},
  handler: async (ctx, { id }) => {
    return await ctx.db
    .query('groups')
    .filter((q) => q.eq(q.field('_id'), id))
    .unique();
  }
});

export const create = mutation({
  args: { name: v.string(), address: v.string(), address_number: v.string(), neighborhood: v.string(), service_at: v.optional(v.string())}, 
 
  handler: async ({db}, args) => {
    await db.insert('groups', args)
  }
});

export const edit = mutation({
  args: { id: v.id('groups'), name: v.string(), address: v.string(), address_number: v.string(), neighborhood: v.string(), service_at: v.optional(v.string())}, 

  handler: async ({db}, args) => {
    const id = args.id
    const obj = {name: args.name, address: args.address, address_number: args.address_number, neighborhood: args.neighborhood, service_at: args.service_at}  
    await db.replace(id, obj)
  }
});
