import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// This is a mutation that creates a new message linked to the group
export const sendMessage = mutation({
  args: { content: v.string(), person_id: v.id('persons'), user: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('messages', args);
  },
});

// This is a query that returns all messages in a specific group
export const get = query({
  args: { personId: v.id('persons') },
  handler: async ({ db, storage }, { personId }) => {
    return await db
      .query('messages')
      .filter((q) => q.eq(q.field('person_id'), personId))
      .collect();
  },
});
