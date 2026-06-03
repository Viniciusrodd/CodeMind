
// imports
import { ObjectId, DeleteResult, ClientSession } from "mongoose";

// import DTOs
import { CreateDocumentDTO, UpdateDocumentDTO } from "@document/dtos/document.dtos";


// document interface
export interface IDocument {
   _id: string | ObjectId,
   projectId: string | ObjectId,
   name: string,
   type: "code" | "doc",
   content: string,
   createdAt: Date,
   updatedAt: Date
};

// document repository
export interface IDocumentRepository {
   create(data: CreateDocumentDTO): Promise<IDocument>;
   getAll(): Promise<IDocument[] | null>;
   getById(id: string | ObjectId): Promise<IDocument | null>;
   update(id: string | ObjectId, data: UpdateDocumentDTO): Promise<IDocument | null>;
   delete(id: string | ObjectId): Promise<DeleteResult>;
   deleteByProjectId(id: string | ObjectId, session: ClientSession): Promise<DeleteResult>
   deleteAll(session: ClientSession): Promise<DeleteResult>;
};