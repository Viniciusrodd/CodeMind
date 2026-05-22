
// imports
import axios from "axios";

// import DTOs
import type { CreateDocumentDTO, UpdateDocumentDTO } from "@DTOs/document.dtos";

// import interfaces
import type { IDocument } from "@interfaces/document.interface";
import type { iApiResponse } from "@interfaces/apiResponse.interface";

// import routes
import { documentRoute } from "@routes/routes";


class DocumentService {

   // create document
   public async createDocument(
      data: CreateDocumentDTO
   ): Promise<IDocument> {
      try{
         const res = await axios.post<iApiResponse<IDocument>>(documentRoute, data);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao criar documento',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // get all documents
   public async getAllDocuments(): Promise<IDocument[] | null> {
      try{
         const res = await axios.get<iApiResponse<IDocument[] | null>>(documentRoute);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao pegar documentos',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // get document by id
   public async getDocumentById(
      id: string
   ): Promise<IDocument | null> {
      try{
         const res = await axios.get<iApiResponse<IDocument | null>>(`${documentRoute}/${id}`);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao pegar documento',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // update document
   public async updateDocument(
      id: string,
      data: UpdateDocumentDTO
   ): Promise<IDocument | null> {
      try{
         const res = await axios.put<iApiResponse<IDocument | null>>(`${documentRoute}/${id}`, data);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao atualizar documento',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // delete document
   public async deleteDocument(
      id: string
   ): Promise<iApiResponse> {
      try{
         const res = await axios.delete<iApiResponse>(`${documentRoute}/${id}`);
         return res.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao deletar documento',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

};
export const documentService: DocumentService = new DocumentService();