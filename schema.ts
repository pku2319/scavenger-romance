import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("travelers", {
  id: uuid("id"),
  name: text("name"),
  email: text("email"),
  game: text("game"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});