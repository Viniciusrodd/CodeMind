
// imports
import { ObjectId } from "mongoose";

// import repository
import { analysisRepository } from "@analysis/repositories/analysis.repository";
import { projectRepository } from "@project/repositories/project.repository";

// import interfaces
import { IAnalysis } from "@analysis/interfaces/analysis.interface";

// import DTOs
import { CreateAnalysisDTO } from "@analysis/dtos/analysis.dtos";


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

};
export const analysisService: AnalysisService = new AnalysisService();