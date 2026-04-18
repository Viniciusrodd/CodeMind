
// imports
import { Request, Response } from "express";

// import interfaces
import { iApiResponse } from "@typesGlobal/apiResponse.interface";
import { IProjectDocument } from "@project/interfaces/project.interface";

// import services
import { projectService } from "@project/services/project.service";

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
         const projects: IProjectDocument[] = await projectService.getAllProjects();

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

};
export const projectController: ProjectController = new ProjectController();