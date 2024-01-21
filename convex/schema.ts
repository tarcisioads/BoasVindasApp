import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  persons: defineTable({
    modified_at: v.string(),
    name: v.string(),
    neighborhood: v.string(),
    phone: v.string(),
    service_at: v.string(),
  }),
  messages: defineTable({
    content: v.string(),
    person_id: v.id('persons'),
    user: v.string(),
  }),
});
