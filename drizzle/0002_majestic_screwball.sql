CREATE TABLE IF NOT EXISTS "pieces" (
	"id" uuid,
	"traveler_id" uuid,
	"piece_id" integer,
	"status" integer,
	"answer" text,
	"partner_id" uuid,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "pieces_traveler_id_piece_id_unique" UNIQUE("traveler_id","piece_id")
);
