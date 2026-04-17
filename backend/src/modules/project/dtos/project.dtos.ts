
// imports
import { ObjectId } from "mongoose";

// import interfaces
import { IContext, IContextUpdate } from "@project/interfaces/project.interface";


// get project
export interface GetProjectDTO {
   _id: string | ObjectId,
   name: string,
   description: string,
   context: IContext,
   createdAt: Date,
   updatedAt: Date
};

// create project
export interface CreateProjectDTO {
   name: string,
   description: string,
   context: IContext,
};

// update project
export interface UpdateProjectDTO {
   _id: string | ObjectId,
   name?: string,
   description?: string,
   context?: IContextUpdate,
};

// delete project
export interface DeleteProjectDTO {
   _id: string | ObjectId
};