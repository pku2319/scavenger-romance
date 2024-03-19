import { text, timestamp, pgTable, uuid, unique, integer } from "drizzle-orm/pg-core";

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

export const pieces = pgTable("pieces", {
  id: uuid("id"),
  travelerId: uuid("traveler_id"),
  pieceId: integer("piece_id"),
  status: integer("status"),
  answer: text("answer"),
  partnerId: uuid("partner_id"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
},
  (t) => ({
    unq: unique().on(t.travelerId, t.pieceId),
  })
);