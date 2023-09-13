CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256),
	"username" varchar(256),
	"password" varchar(256),
	"role" varchar DEFAULT 'user',
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now(),
	"deleted_at" date
);
