import axios from 'axios';

const EMBEDDING_SERVICE_URL = process.env.EMBEDDING_SERVICE_URL || 'http://localhost:8000';

export interface EmbeddingResponse {
  embedding: number[];
  dimension: number;
}

export interface BatchEmbeddingResponse {
  embeddings: number[][];
  count: number;
}

export interface SimilarityResponse {
  similarity: number;
}

// Generate embedding for a single text
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await axios.post<EmbeddingResponse>(
      `${EMBEDDING_SERVICE_URL}/embed`,
      { text }
    );
    return response.data.embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
}

// Generate embeddings for multiple texts
export async function generateEmbeddingsBatch(texts: string[]): Promise<number[][]> {
  try {
    const response = await axios.post<BatchEmbeddingResponse>(
      `${EMBEDDING_SERVICE_URL}/embed/batch`,
      { texts }
    );
    return response.data.embeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw new Error('Failed to generate batch embeddings');
  }
}

// Calculate similarity between two embeddings
export async function calculateSimilarity(
  embedding1: number[],
  embedding2: number[]
): Promise<number> {
  try {
    const response = await axios.post<SimilarityResponse>(
      `${EMBEDDING_SERVICE_URL}/similarity`,
      { embedding1, embedding2 }
    );
    return response.data.similarity;
  } catch (error) {
    console.error('Error calculating similarity:', error);
    throw new Error('Failed to calculate similarity');
  }
}