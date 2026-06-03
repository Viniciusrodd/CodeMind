
// imports
import { ObjectId, DeleteResult, ClientSession } from "mongoose";

// import models
import { projectModel } from "@project/schemas/project.schema";

// import DTOs
import { CreateProjectDTO, UpdateProjectDTO } from "@project/dtos/project.dtos";

// import interfaces
import { IProjectDocument, IProjectRepository } from "@project/interfaces/project.interface";


class ProjectRepository implements IProjectRepository {

   // create project
   public async create(data: CreateProjectDTO): Promise<IProjectDocument> {
      return projectModel.create(data);
   };

   // get all projects
   public async getAll(): Promise<IProjectDocument[] | null> {
      return projectModel.find({});
   };

   // get project by id
   public async getById(id: string | ObjectId): Promise<IProjectDocument | null> {
      return projectModel.findById(id);
   };

   // update project
   public async update(id: string | ObjectId, data: UpdateProjectDTO): Promise<IProjectDocument | null> {
      return projectModel.findByIdAndUpdate(
         id,
         data,
         { new: true } // Returns the modified document
      );
   };

   // delete project
   public async delete(id: string | ObjectId, session: ClientSession): Promise<DeleteResult> {
      return projectModel.deleteOne({ _id: id }, { session })
   };

   // delete all
   public async deleteAll(session: ClientSession): Promise<DeleteResult> {
      return projectModel.deleteMany({}, { session });
   };

};
export const projectRepository: ProjectRepository = new ProjectRepository();