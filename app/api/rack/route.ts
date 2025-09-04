import { saveAssetCard, queryRack } from "@/lib/content-rack";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const results = await queryRack(q || undefined);
  return Response.json(results);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const saved = await saveAssetCard(body);
  return Response.json(saved);
}
