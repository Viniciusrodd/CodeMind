
// imports
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

// import repositories
import { documentRepository } from "@document/repositories/document.repository";
import { chunkRepository } from "@rag/repositories/chunk.repository";
import { analysisRepository } from "@analysis/repositories/analysis.repository";
import { projectRepository } from "@project/repositories/project.repository";


class ProjectUseCase {

   // delete project
   public async deleteProject(id: string | ObjectId): Promise<void> {
      const session = await mongoose.startSession();
      session.startTransaction();

      try{
         await analysisRepository.deleteByProjectId(id, session);
         await chunkRepository.deleteByProjectId(id, session);
         await documentRepository.deleteByProjectId(id, session);
         
         const project = await projectRepository.delete(id, session);
         if(project.deletedCount === 0) throw new Error('Erro ao deletar projeto');

         await session.commitTransaction();
      }
      catch(error){
         await session.abortTransaction();
         throw error;
      }
      finally{
         session.endSession();
      }
   };

};
export const projectUseCase: ProjectUseCase = new ProjectUseCase();