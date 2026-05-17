
// imports
import { model, Model, Schema } from "mongoose";

// import interfaces
import { IDocumentChunk } from "@rag/interfaces/rag.interface";


// schema
const documentChunkSchema = new Schema({
   documentId: { type: String, required: true },
   projectId: { type: String, required: true },
   content: { type: String, required: true },
   embedding: { type: [Number], required: true },
   metadata: {
      chunkIndex: { type: Number, required: true },
      tokens: { type: Number, required: true },
      type: { type: String, required: true },
      name: { type: String, required: false },
      parent: { type: String, required: false },
   }
});


// model
const documentChunkModel: Model<IDocumentChunk> = model<IDocumentChunk>('DocumentChunk', documentChunkSchema, 'DocumentChunk');
export { documentChunkModel };