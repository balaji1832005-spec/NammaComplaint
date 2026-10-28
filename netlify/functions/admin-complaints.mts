import type { Config, Context } from "@netlify/functions";
import { getUser } from "@netlify/identity";
import { and, desc, eq, type SQL } from "drizzle-orm";
import { db } from "../../db/index.js";
import { complaints } from "../../db/schema.js";
import { CATEGORIES, STATUSES } from "../lib/constants.js";

export default async (req: Request, context: Context) => {
  const user = await getUser();
  if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!user.roles?.includes("admin")) return Response.json({ error: "forbidden" }, { status: 403 });

  if (req.method === "GET") {
    const params = new URL(req.url).searchParams;
    const status = params.get("status");
    const category = params.get("category");
    const filters: SQL[] = [];
    if (status && (STATUSES as readonly string[]).includes(status)) filters.push(eq(complaints.status, status));
    if (category && (CATEGORIES as readonly string[]).includes(category)) filters.push(eq(complaints.category, category));

    const rows = await db
      .select()
      .from(complaints)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(complaints.createdAt))
      .limit(500);
    return Response.json(rows);
  }

  if (req.method === "PATCH") {
    const id = Number(context.params.id);
    if (!Number.isInteger(id)) return Response.json({ error: "invalid_id" }, { status: 400 });

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "invalid_json" }, { status: 400 });
    }

    const update: { status?: string; adminNote?: string; updatedAt: Date } = { updatedAt: new Date() };
    if (typeof body.status === "string") {
      if (!(STATUSES as readonly string[]).includes(body.status)) {
        return Response.json({ error: "invalid_status" }, { status: 400 });
      }
      update.status = body.status;
    }
    if (typeof body.adminNote === "string") update.adminNote = body.adminNote.trim().slice(0, 1000);

    const [row] = await db.update(complaints).set(update).where(eq(complaints.id, id)).returning();
    if (!row) return Response.json({ error: "not_found" }, { status: 404 });
    return Response.json(row);
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/admin/complaints", "/api/admin/complaints/:id"],
  method: ["GET", "PATCH"],
};
