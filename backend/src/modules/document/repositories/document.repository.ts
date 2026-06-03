
// imports
import { ObjectId, DeleteResult, ClientSession } from "mongoose";

// import models
import { documentModel } from "@document/schemas/document.schema";

// import DTOs
import { CreateDocumentDTO, UpdateDocumentDTO } from "@document/dtos/document.dtos";

// import interfaces
import { IDocument, IDocumentRepository } from "@document/interfaces/document.interface";


class DocumentRepository implements IDocumentRepository {

   // create document
   public async create(data: CreateDocumentDTO): Promise<IDocument> {
      return documentModel.create(data);
   };

   // get all documents
   public async getAll(): Promise<IDocument[] | null> {
      return documentModel.find({}); 
   };

   // get document by id
   public async getById(id: string | ObjectId): Promise<IDocument | null> {
      return documentModel.findById(id);
   };

   // update document
   public async update(id: string | ObjectId, data: UpdateDocumentDTO): Promise<IDocument | null> {
      return documentModel.findByIdAndUpdate(
         id,
         data,
         { new: true }
      );
   };

   // delete document
   public async delete(id: string | ObjectId): Promise<DeleteResult> {
      return documentModel.deleteOne({ _id: id });
   };

   // delete by project id
   public async deleteByProjectId(id: string | ObjectId): Promise<DeleteResult> {
      return documentModel.deleteMany({ projectId: id });
   };

   // delete all
   public async deleteAll(session: ClientSession): Promise<DeleteResult> {
      return documentModel.deleteMany({}, { session });
   };

};
export const documentRepository: DocumentRepository = new DocumentRepository();