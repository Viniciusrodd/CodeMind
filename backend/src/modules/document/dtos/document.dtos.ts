
// imports
import { ObjectId } from "mongoose";


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

// create document
export interface CreateDocumentDTO {
   projectId: string | ObjectId,
   name: string,
   type: "code" | "doc",
   content: string,
};

// update document
export interface UpdateDocumentDTO {
   _id: string | ObjectId,
   name?: string,
   type?: "code" | "doc",
   content?: string
};

// delete document
export interface DeleteDocumentDTO {
   _id: string | ObjectId
};