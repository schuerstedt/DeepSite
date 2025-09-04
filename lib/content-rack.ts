import mongoose from "mongoose";
import dbConnect from "./mongodb";

export interface AssetCard {
  _id?: string;
  title: string;
  text: string;
  summary: string;
  tags: string[];
  vector: number[];
  createdAt?: Date;
}

const AssetCardSchema = new mongoose.Schema<AssetCard>({
  title: { type: String, required: true },
  text: String,
  summary: String,
  tags: [String],
  vector: [Number],
  createdAt: { type: Date, default: Date.now },
});

AssetCardSchema.index({ summary: "text", tags: "text" });

export const RackModel =
  mongoose.models.Rack || mongoose.model<AssetCard>("Rack", AssetCardSchema);

export async function ocrDocument(file: Buffer): Promise<string> {
  if (!process.env.OCR_ENDPOINT) {
    return "";
  }
  const res = await fetch(process.env.OCR_ENDPOINT, {
    method: "POST",
    body: file,
  });
  const data = await res.json();
  return data.text || "";
}

export async function vectorizeText(text: string): Promise<{
  vector: number[];
  summary: string;
  tags: string[];
}> {
  if (!process.env.VECTORIZE_ENDPOINT) {
    return { vector: [], summary: "", tags: [] };
  }
  const res = await fetch(process.env.VECTORIZE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  return {
    vector: data.vector || [],
    summary: data.summary || "",
    tags: data.tags || [],
  };
}

export async function createAssetCardFromFile(
  file: Buffer,
  title: string,
): Promise<AssetCard> {
  const text = await ocrDocument(file);
  const { vector, summary, tags } = await vectorizeText(text);
  return { title, text, vector, summary, tags };
}

export async function saveAssetCard(card: AssetCard) {
  await dbConnect();
  const doc = new RackModel(card);
  return doc.save();
}

export async function queryRack(q?: string) {
  await dbConnect();
  if (q) {
    return RackModel.find({
      $or: [{ summary: new RegExp(q, "i") }, { tags: q }],
    })
      .lean()
      .exec();
  }
  return RackModel.find().lean().exec();
}
