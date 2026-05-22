
// imports
import axios from "axios";

// import DTOs
import type { CreateProjectDTO, UpdateProjectDTO } from "@DTOs/project.dtos";

// import interfaces
import type { IProjectDocument } from "@interfaces/project.interface";
import type { iApiResponse } from "@interfaces/apiResponse.interface";

// import routes
import { projectRoute } from "@routes/routes";


class ProjectService {

   // create project
   public async createProject(
      data: CreateProjectDTO
   ): Promise<IProjectDocument> {
      try{
         const res = await axios.post<iApiResponse<IProjectDocument>>(projectRoute, data);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao criar projeto',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   }

};
export const projectService: ProjectService = new ProjectService();