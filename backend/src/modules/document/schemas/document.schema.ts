
// imports
import { model, Model, Schema } from "mongoose";

// import interfaces
import { IDocument } from "@document/interfaces/document.interface";


// schema
const documentSchema: Schema = new Schema<IDocument>({
   projectId: { type: String, required: true },
   name: { type: String, required: true },
   type: { type: String, enum: ['code', 'doc'], required: true },
   content: { type: String },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});


// model
const DocumentModel: Model<IDocument> = model<IDocument>('Document', documentSchema, 'Document');
export { DocumentModel };