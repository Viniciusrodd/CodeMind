
// imports
import { ObjectId } from "mongoose";

// import repository
import { projectRepository } from "@project/repositories/project.repository";

// import DTOs
import { CreateProjectDTO, UpdateProjectDTO } from "@project/dtos/project.dtos";

// import interfaces
import { IProjectDocument } from "@project/interfaces/project.interface";


class ProjectService {

   // create project
   public async createProject(data: CreateProjectDTO): Promise<IProjectDocument> {
      if(!data.name || !data.description || !data.context){
         throw new Error('Todos os campos são obrigatórios');
      }

      const project: IProjectDocument = await projectRepository.create(data);
      return project;
   };

   // get all projects
   public async getAllProjects(): Promise<IProjectDocument[] | null> {
      const projects: IProjectDocument[] | null = await projectRepository.getAll();
      return projects;
   };

   // get project by id
   public async getProjectById(id: string | ObjectId): Promise<IProjectDocument | null> {
      if(!id) throw new Error('A identificação do projeto é obrigatória');
      
      const project: IProjectDocument | null = await projectRepository.getById(id);
      return project;
   };

   // update project
   public async updateProject(id: string | ObjectId, data: UpdateProjectDTO): Promise<IProjectDocument | null> {
      if(!id) throw new Error('A identificação do projeto é obrigatória');
      if(!data.name || !data.description || !data.context){
         throw new Error('Todos os campos são obrigatórios');
      }

      const project: IProjectDocument | null = await projectRepository.update(id, data);
      return project;
   };

   // delete project
   public async deleteProject(id: string | ObjectId): Promise<void> {
      const result = await projectRepository.delete(id);

      if(!result.acknowledged || result.deletedCount === 0){
         throw new Error('Erro ao deletar projeto')
      };
   };

};
export const projectService: ProjectService = new ProjectService();