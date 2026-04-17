
// imports
import { ObjectId } from "mongoose";


// RAG document interface
export interface IDocument {
   _id: string | ObjectId,
   projectId: string | ObjectId,
   name: string,
   type: "code" | "doc",
   content: string,
   createdAt: Date,
   updatedAt: Date
};