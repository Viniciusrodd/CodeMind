
// imports
import { ObjectId } from "mongoose";

// import repository
import { analysisRepository } from "@analysis/repositories/analysis.repository";

// import interfaces
import { IAnalysis } from "@analysis/interfaces/analysis.interface";


class AnalysisService {

   // get analyse by id
   public async getAnalyseById(id: string | ObjectId): Promise<IAnalysis | null> {
      const analyse = await analysisRepository.getById(id);
      return analyse;
   };

   // get analysis by project id
   public async getAnalyseByProjectId(projectId: string | ObjectId): Promise<IAnalysis[] | null> {
      const analysis = await analysisRepository.getByProjectId(projectId);
      return analysis;
   };

   // delete analyse
   public async deleteAnalyse(id: string | ObjectId): Promise<void> {
      const result = await analysisRepository.delete(id);

      if(!result.acknowledged || result.deletedCount === 0){
         throw new Error('Erro ao deletar análise');
      };
   };

};
export const analysisService: AnalysisService = new AnalysisService();