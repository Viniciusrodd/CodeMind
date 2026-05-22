
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
   
};
export const documentService: DocumentService = new DocumentService();