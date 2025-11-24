from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from embeddings import EmbeddingGenerator
import uvicorn

#Initialize FastAPI app
app = FastAPI(title="Luvies Embedding Service")

#Initialize embedding generator (loads model on startup)
embedding_generator = EmbeddingGenerator()

#Request/Response models (defines the JSON structure)
class EmbedRequest(BaseModel):
    text: str

class EmbedBatchRequest(BaseModel):
    texts: List[str]

class SimilarityRequest(BaseModel):
    embedding1: List[float]
    embedding2: List[float]

class EmbedResponse(BaseModel):
    embedding: List[float]
    dimension: int

class EmbedBatchResponse(BaseModel):
    embeddings: List[List[float]]
    count: int

class SimilarityResponse(BaseModel):
    similarity: float

#Health check endpoint
@app.get("/")
def root():
    return {"status": "healthy", "service": "Luvies Embedding Service"}

#Generate single embedding
@app.post("/embed", response_model=EmbedResponse)
def generate_embedding(request: EmbedRequest):
    try:
        embedding = embedding_generator.generate_embedding(request.text)
        return {
            "embedding": embedding,
            "dimension": len(embedding)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Generate batch embeddings
@app.post("/embed/batch", response_model=EmbedBatchResponse)
def generate_embeddings_batch(request: EmbedBatchRequest):
    try:
        embeddings = embedding_generator.generate_embeddings_batch(request.texts)
        return {
            "embeddings": embeddings,
            "count": len(embeddings)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Compute similarity
@app.post("/similarity", response_model=SimilarityResponse)
def compute_similarity(request: SimilarityRequest):
    try:
        similarity = embedding_generator.compute_similarity(
            request.embedding1, 
            request.embedding2
        )
        return {"similarity": similarity}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001)