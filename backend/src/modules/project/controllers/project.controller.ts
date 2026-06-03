
// imports
import { Request, Response } from "express";
import { ObjectId } from "mongoose";

// import interfaces
import { iApiResponse } from "@typesGlobal/apiResponse.interface";
import { IProjectDocument } from "@project/interfaces/project.interface";

// import services
import { projectService } from "@project/services/project.service";

// import useCases
import { projectUseCase } from "@project/useCases/project.usecase";

// import DTOs
import { CreateProjectDTO, UpdateProjectDTO } from "@project/dtos/project.dtos";

// import utils
import { getErrorMessage } from "@utils/errorHandler.util";


class ProjectController {

   // create project
   public async createProject(
      req: Request<{}, {}, CreateProjectDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const project: IProjectDocument = await projectService.createProject(req.body);

         return res.status(200).send({
            success: true,
            message: '✔️ Project successfully created',
            data: project
         });
      }
      catch(error){
         console.error('❌ Internal server error at project creation: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at project creation',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // get all projects
   public async getAllProjects(
      req: Request,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const projects: IProjectDocument[] | null = await projectService.getAllProjects();

         return res.status(200).send({
            success: true,
            message: '✔️ Getting all projects with success',
            data: projects
         });
      }
      catch(error){
         console.error('❌ Internal server error at getting all projects: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at getting all projects',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // get project by id
   public async getProjectById(
      req: Request<{id: string | ObjectId}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const project: IProjectDocument | null = await projectService.getProjectById(req.params.id);

         return res.status(200).send({
            success: true,
            message: '✔️ Getting project with success',
            data: project
         });
      }
      catch(error){
         console.error('❌ Internal server error at getting project: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at getting project',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // update project
   public async updateProject(
      req: Request<{id: string | ObjectId}, {}, UpdateProjectDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const project: IProjectDocument | null = await projectService.updateProject(req.params.id, req.body);

         return res.status(200).send({
            success: true,
            message: '✔️ Update project with successfully',
            data: project
         });
      }
      catch(error){
         console.error('❌ Internal server error at update project: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at update project',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // delete project
   public async deleteProject(
      req: Request<{id: string | ObjectId}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         await projectUseCase.deleteProject(req.params.id);

         return res.status(200).send({
            success: true,
            message: '✔️ Delete project with success',
         });
      }
      catch(error){
         console.error('❌ Internal server error at delete project: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at delete project',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

};
export const projectController: ProjectController = new ProjectController();