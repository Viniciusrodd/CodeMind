
// imports
import mongoose from "mongoose";

// import repositories
import { userRepository } from "@user/repositories/user.repository";
import { chunkRepository } from "@rag/repositories/chunk.repository";
import { projectRepository } from "@project/repositories/project.repository";
import { documentRepository } from "@document/repositories/document.repository";
import { analysisRepository } from "@analysis/repositories/analysis.repository";


class UserUseCase {

   // delete user
   public async deleteUser(): Promise<void> {
      const session = await mongoose.startSession();
      session.startTransaction();

      try{
         await analysisRepository.deleteAll(session);
         await chunkRepository.deleteAll(session);
         await documentRepository.deleteAll(session);
         await projectRepository.deleteAll(session);

         const user = await userRepository.delete(session);
         if(user.deletedCount === 0) throw new Error('Erro ao deletar usuário');

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
export const userUseCase: UserUseCase = new UserUseCase();