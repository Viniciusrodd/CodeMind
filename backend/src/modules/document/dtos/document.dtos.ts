
// imports
import { ObjectId } from "mongoose";


// create document
export interface CreateDocumentDTO {
   projectId: string | ObjectId,
   name: string,
   type: "code" | "doc",
   content: string,
};

// get document
export interface GetDocumentDTO {
   _id: string | ObjectId,
   projectId: string | ObjectId,
   name: string,
   type: "code" | "doc",
   content: string,
   createdAt: Date,
   updatedAt: Date
};

// update document
export interface UpdateDocumentDTO {
   _id: string | ObjectId,
   name?: string,
   type?: "code" | "doc",
   content?: string
};