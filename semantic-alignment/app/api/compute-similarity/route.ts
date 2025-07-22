import { pipeline, dot } from "@xenova/transformers";
import { NextRequest, NextResponse } from "next/server";

// Load the embedding pipeline (Sentence Transformers model)
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

// Function to compute cosine similarity between two vectors
const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  const dotProduct = dot(vecA, vecB);
  const magnitudeA = Math.sqrt(dot(vecA, vecA));
  const magnitudeB = Math.sqrt(dot(vecB, vecB));
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
};

export async function POST(req: NextRequest) {
  try {
    const { businessProcess, informationSystem } = await req.json();

    if (!businessProcess || !informationSystem) {
      return NextResponse.json({ similarity: 0 }, { status: 200 });
    }

    // Compute embeddings for both inputs
    const embeddingA = await embedder(businessProcess, {
      pooling: "mean",
      normalize: true,
    });
    const embeddingB = await embedder(informationSystem, {
      pooling: "mean",
      normalize: true,
    });

    // Extract the vector arrays
    const vecA = Array.from(embeddingA.data);
    const vecB = Array.from(embeddingB.data);

    // Compute cosine similarity
    const similarity = cosineSimilarity(vecA, vecB);

    return NextResponse.json({ similarity }, { status: 200 });
  } catch (error) {
    console.error("Error computing embeddings:", error);
    return NextResponse.json(
      { error: "Failed to compute similarity" },
      { status: 500 }
    );
  }
}
