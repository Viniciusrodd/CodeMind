
// imports
import { ObjectId, DeleteResult, ClientSession } from "mongoose";

// import DTOs
import { CreateProjectDTO, UpdateProjectDTO, } from "@project/dtos/project.dtos";


// context types
type contextType = 'backend' | 'frontend' | 'fullstack'

// context interface
export interface IContext {
   type: contextType,
   languages: string[],
   frameworks: string[],
   purpose: string,
   environment: string
};

// context interface
export interface IContextUpdate {
   type?: contextType,
   languages?: string[],
   frameworks?: string[],
   purpose?: string,
   environment?: string
};

// project interface
export interface IProjectDocument {
   _id: string | ObjectId,
   name: string,
   description: string,
   context: IContext,
   createdAt: Date,
   updatedAt: Date
};

// project repository
export interface IProjectRepository {
   create(data: CreateProjectDTO): Promise<IProjectDocument>;
   getAll(): Promise<IProjectDocument[] | null>;
   getById(id: string | ObjectId): Promise<IProjectDocument | null>;
   update(id: string | ObjectId, data: UpdateProjectDTO): Promise<IProjectDocument | null>;
   delete(id: string | ObjectId, session: ClientSession): Promise<DeleteResult>;
   deleteAll(session: ClientSession): Promise<DeleteResult>;
};