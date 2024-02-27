import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('persons')
      .filter((q) => q.eq(q.field('arquived_at'), undefined))
      .collect();
  },
})

export const getArchived = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('persons')
      .filter((q) => q.neq(q.field('arquived_at'), undefined))
      .collect();
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
  args: { modified_at: v.string(), name: v.string(), neighborhood: v.string(), phone: v.string(), service_at: v.string(), group_id: v.optional(v.id('groups'))}, 
    
  handler: async ({db}, args) => {
    await db.insert('persons', args)
  }
});

export const edit = mutation({
    
  args: {  id: v.id('persons'), modified_at: v.string(), name: v.string(), neighborhood: v.string(), phone: v.string(), service_at: v.string(), group_id: v.optional(v.id('groups'))}, 

  handler: async ({db}, args) => {
    const id = args.id
    const obj = {modified_at: args.modified_at, name: args.name, neighborhood: args.neighborhood, phone: args.phone, service_at: args.service_at, group_id: args.group_id}
    await db.replace(id, obj)
  }
});

export const archive = mutation({
  args: { id: v.id('persons')},
  handler: async ({db}, args) => {
    
    const id = args.id
    const person = await db
      .query('persons')
      .filter((q) => q.eq(q.field('_id'), id))
      .unique();

    const arquived = (person?.arquived_at ? undefined: new Date().toLocaleString());
 
    const obj = {arquived_at: arquived }
    await db.patch(id, obj)
  }
})
