import type { Config } from "@netlify/functions";
import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { complaints } from "../../db/schema.js";
import { CATEGORIES } from "../lib/constants.js";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeTrackingId() {
  const bytes = randomBytes(8);
  let id = "";
  for (const b of bytes) id += ALPHABET[b % ALPHABET.length];
  return `NC-${id}`;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default async (req: Request) => {
  if (req.method === "POST") {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "invalid_json" }, { status: 400 });
    }

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 20);
    const category = clean(body.category, 40);
    const area = clean(body.area, 200);
    const description = clean(body.description, 2000);

    if (!name || !area || description.length < 10) {
      return Response.json({ error: "missing_fields" }, { status: 400 });
    }
    if (!/^[0-9+\-\s]{7,20}$/.test(phone)) {
      return Response.json({ error: "invalid_phone" }, { status: 400 });
    }
    if (!(CATEGORIES as readonly string[]).includes(category)) {
      return Response.json({ error: "invalid_category" }, { status: 400 });
    }

    const [created] = await db
      .insert(complaints)
      .values({ trackingId: makeTrackingId(), name, phone, category, area, description })
      .returning({ trackingId: complaints.trackingId });

    return Response.json(created, { status: 201 });
  }

  if (req.method === "GET") {
    const trackingId = clean(new URL(req.url).searchParams.get("id"), 20).toUpperCase();
    if (!trackingId) return Response.json({ error: "missing_id" }, { status: 400 });

    // Only expose non-personal fields to the public tracking lookup.
    const [row] = await db
      .select({
        trackingId: complaints.trackingId,
        category: complaints.category,
        area: complaints.area,
        description: complaints.description,
        status: complaints.status,
        adminNote: complaints.adminNote,
        createdAt: complaints.createdAt,
        updatedAt: complaints.updatedAt,
      })
      .from(complaints)
      .where(eq(complaints.trackingId, trackingId));

    if (!row) return Response.json({ error: "not_found" }, { status: 404 });
    return Response.json(row);
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/complaints",
  method: ["GET", "POST"],
};
