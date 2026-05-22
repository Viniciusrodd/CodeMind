
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
   };

   // get all projects
   public async getAllProject(): Promise<IProjectDocument[] | null> {
      try{
         const res = await axios.get<iApiResponse<IProjectDocument[] | null>>(projectRoute);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao pegar projetos',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

   // get project by id
   public async getProjectById(
      id: string
   ): Promise<IProjectDocument | null> {
      try{
         const res = await axios.get<iApiResponse<IProjectDocument | null>>(`${projectRoute}/${id}`);
         return res.data.data!;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw new Error(
               error.response?.data?.errorMessage ||
               error.response?.data?.message ||
               'Erro ao pegar projeto',
               { cause: error }
            );
         }

         throw new Error('Erro inesperado', { cause: error });
      }
   };

};
export const projectService: ProjectService = new ProjectService();