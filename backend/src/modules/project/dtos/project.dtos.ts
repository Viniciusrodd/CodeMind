
// import interfaces
import { IContext, IContextUpdate } from "@project/interfaces/project.interface";


// create project
export interface CreateProjectDTO {
   name: string,
   description?: string,
   context: IContext,
};

// update project
export interface UpdateProjectDTO {
   name?: string,
   description?: string,
   context?: IContextUpdate,
};