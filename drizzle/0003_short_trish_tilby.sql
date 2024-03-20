ALTER TABLE "travelers" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "travelers" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "travelers" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "travelers" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "travelers" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "travelers" ALTER COLUMN "game" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "travelers" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "travelers" ALTER COLUMN "updated_at" SET NOT NULL;