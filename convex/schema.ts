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
  users : defineTable({
    name: v.string(),
    password: v.string(),
    phone: v.string(),
  }),
  groups: defineTable({
    name: v.string(),
    address: v.string(),
    address_number: v.string(),
    neighborhood: v.string(),
  })
});
