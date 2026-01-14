import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // If no write token is configured, don't hard-fail the app.
  // Configure `SANITY_WRITE_TOKEN` in your environment to enable view increments.
  if (!process.env.SANITY_WRITE_TOKEN) {
    return NextResponse.json({ ok: false, views: null }, { status: 200 });
  }

  try {
    const updated = await writeClient
      .patch(id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit({ returnDocuments: true });

    return NextResponse.json({ ok: true, views: updated?.views ?? 0 });
  } catch {
    return NextResponse.json({ ok: false, views: null }, { status: 500 });
  }
}

