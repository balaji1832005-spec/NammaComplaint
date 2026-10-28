CREATE TABLE "complaints" (
	"id" serial PRIMARY KEY,
	"tracking_id" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"category" text NOT NULL,
	"area" text NOT NULL,
	"description" text NOT NULL,
	"status" text DEFAULT 'submitted' NOT NULL,
	"admin_note" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "complaints_status_idx" ON "complaints" ("status");--> statement-breakpoint
CREATE INDEX "complaints_created_at_idx" ON "complaints" ("created_at");