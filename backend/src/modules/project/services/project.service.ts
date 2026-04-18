
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
   public async getAllProjects(): Promise<IProjectDocument[]> {
      const projects: IProjectDocument[] = await projectRepository.getAll();
      return projects;
   };

};
export const projectService: ProjectService = new ProjectService();