
// imports
import { model, Model, Schema } from "mongoose";

// import interfaces
import { IDocumentChunk } from "@rag/interfaces/rag.interface";


// schema
const documentChunkSchema = new Schema({
   documentId: { type: String, required: true },
   projectId: { type: String, required: true },
   content: String,
   embedding: [Number],
   metadata: {
      type: String,
      chunkIndex: Number,
      tokens: Number
   }
});


// model
const DocumentChunkModel: Model<IDocumentChunk> = model<IDocumentChunk>('DocumentChunk', documentChunkSchema, 'DocumentChunk');
export { DocumentChunkModel };