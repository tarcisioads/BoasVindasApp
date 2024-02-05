import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    let persons = await ctx.db.query('persons').collect();
    persons = persons.map((p) => {
      p.group = ctx.db.get(p.group_id as v.id<'groups'>)
    })
    return persons;
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
