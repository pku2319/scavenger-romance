import { text, timestamp, pgTable, uuid, unique } from "drizzle-orm/pg-core";

export const travelers = pgTable("travelers", {
  id: uuid("id"),
  name: text("name"),
  email: text("email"),
  game: text("game"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
},
  (t) => ({
    unq: unique().on(t.game, t.email),
  })
);