
// import DTOs
import { CreateAnalysisRepositoryDTO } from "@analysis/dtos/analysis.dtos";

// import interfaces
import { IAnalysis, IAnalysisRepository } from "@analysis/interfaces/analysis.interface";

// import model
import { analysisModel } from "@analysis/schemas/analysis.schema";
import { DeleteResult, ObjectId } from "mongoose";


class AnalysisRepository implements IAnalysisRepository {

   // create analysis
   public async create(data: CreateAnalysisRepositoryDTO): Promise<IAnalysis> {
      return analysisModel.create(data);
   };

   // get analyse by id
   public async getById(id: string | ObjectId): Promise<IAnalysis | null> {
      return analysisModel.findById(id);
   };

   // get analyse by project id
   public async getByProjectId(projectId: string | ObjectId): Promise<IAnalysis[] | null> {
      return analysisModel.find({ projectId }).sort({ createdAt: -1 });
   };

   // delete analyse
   public async delete(id: string | ObjectId): Promise<DeleteResult> {
      return analysisModel.deleteOne({ _id: id });
   };

   // delete all
   public async deleteAll(): Promise<DeleteResult> {
      return analysisModel.deleteMany({});
   };

};
export const analysisRepository: AnalysisRepository = new AnalysisRepository();