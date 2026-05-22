
// import interfaces
import type { IContext, IContextUpdate } from "@interfaces/project.interface";


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