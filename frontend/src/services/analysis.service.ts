
// imports
import axios from "axios";

// import DTOs
import type { CreateAnalysisDTO } from "@DTOs/analysis.dtos";

// import interfaces
import type { IAnalysis } from "@interfaces/analysis.interface";
import type { iApiResponse } from "@interfaces/apiResponse.interface";

// import routes
import { analysisRoute } from "@routes/routes";


class AnalysisService {

   // create analysis
   public async createAnalysis(
      data: CreateAnalysisDTO
   ): Promise<IAnalysis> {
      try{
         const res = await axios.post<iApiResponse<IAnalysis>>(analysisRoute, data);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao criar análise',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // get analyse by id
   public async getAnalyseById(
      id: string
   ): Promise<IAnalysis | null> {
      try{
         const res = await axios.get<iApiResponse<IAnalysis | null>>(`${analysisRoute}/${id}`);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao pegar análise',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // get analysis by project id
   public async getAnalysisByProjectId(
      projectId: string
   ): Promise<IAnalysis[] | null> {
      try{
         const res = await axios.get<iApiResponse<IAnalysis[] | null>>(`${analysisRoute}/project/${projectId}`);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao pegar análises',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // delete analyse
   public async deleteAnalyse(
      id: string
   ): Promise<iApiResponse> {
      try{
         const res = await axios.delete<iApiResponse>(`${analysisRoute}/${id}`);
         return res.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao delete análise',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

};
export const analysisService: AnalysisService = new AnalysisService();