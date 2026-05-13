
// import DTOs
import { CreateAnalysisDTO } from "@analysis/dtos/analysis.dtos";

// import interfaces
import { IAnalysis, IAnalysisRepository } from "@analysis/interfaces/analysis.interface";

// import model
import { analysisModel } from "@analysis/schemas/analysis.schema";
import { DeleteResult, ObjectId } from "mongoose";


class AnalysisRepository implements IAnalysisRepository {

   // create analysis
   public async create(data: CreateAnalysisDTO): Promise<IAnalysis> {
      return analysisModel.create(data);
   };

   // get analyse by id
   public async getById(id: string | ObjectId): Promise<IAnalysis | null> {
      return analysisModel.findById(id);
   };

   // delete analyse
   public async delete(id: string | ObjectId): Promise<DeleteResult> {
      return analysisModel.deleteOne({ _id: id });
   };

};
export const analysisRepository: AnalysisRepository = new AnalysisRepository();