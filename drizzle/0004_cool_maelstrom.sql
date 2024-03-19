ALTER TABLE "pieces" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "pieces" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "pieces" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pieces" ALTER COLUMN "traveler_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pieces" ALTER COLUMN "piece_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pieces" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pieces" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pieces" ALTER COLUMN "updated_at" SET NOT NULL;