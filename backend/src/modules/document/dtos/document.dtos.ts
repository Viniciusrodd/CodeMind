
// imports
import { ObjectId } from "mongoose";


// create document
export interface CreateDocumentDTO {
   projectId: string | ObjectId,
   name: string,
   type: "code" | "doc",
   content: string,
};

// update document
export interface UpdateDocumentDTO {
   name?: string,
   type?: "code" | "doc",
   content?: string
};