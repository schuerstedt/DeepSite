import { createAssetCardFromFile } from "@/lib/content-rack";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const title = (form.get("title") as string) || (file ? file.name : "untitled");
  if (!file) {
    return new Response("file required", { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const card = await createAssetCardFromFile(Buffer.from(arrayBuffer), title);
  return Response.json(card);
}
