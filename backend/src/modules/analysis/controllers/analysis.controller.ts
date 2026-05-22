
// imports
import { Request, Response } from "express";
import { ObjectId } from "mongoose";

// import interfaces
import { iApiResponse } from "@typesGlobal/apiResponse.interface";
import { IAnalysis } from "@analysis/interfaces/analysis.interface";

// import use cases
import { analysisUseCase } from "@analysis/useCases/analysis.usecase";

// import services
import { analysisService } from "@analysis/services/analysis.service";

// import DTOs
import { CreateAnalysisDTO } from "@analysis/dtos/analysis.dtos";

// import utils
import { getErrorMessage } from "@utils/errorHandler.util";


class AnalysisController {

   // create analysis
   public async createAnalysis(
      req: Request<{}, {}, CreateAnalysisDTO>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const analysis: IAnalysis = await analysisUseCase.create(req.body);

         return res.status(200).send({
            success: true,
            message: '✔️ Analysis successfully created',
            data: analysis
         });
      }
      catch(error){
         console.error('❌ Internal server error at analysis creation: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at analysis creation',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // get analyse by id
   public async getAnalyseById(
      req: Request<{id: string | ObjectId}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const analyse: IAnalysis | null = await analysisService.getAnalyseById(req.params.id);

         return res.status(200).send({
            success: true,
            message: '✔️ Getting analyse with success',
            data: analyse
         });
      }
      catch(error){
         console.error('❌ Internal server error at getting analyse: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at get analyse',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // get analysis by project id
   public async getAnalysisByProjectId(
      req: Request<{projectId: string | ObjectId}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         const analysis: IAnalysis[] | null = await analysisService.getAnalyseByProjectId(req.params.projectId);

         return res.status(200).send({
            success: true,
            message: '✔️ Getting analysis with success',
            data: analysis
         });
      }
      catch(error){
         console.error('❌ Internal server error at getting analysis: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at get analysis',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

   // delete analyse
   public async deleteAnalyse(
      req: Request<{id: string | ObjectId}, {}, {}>,
      res: Response<iApiResponse>
   ): Promise<Response> {
      try{
         await analysisService.deleteAnalyse(req.params.id);

         return res.status(200).send({
            success: true,
            message: '✔️ Delete analyse with success',
         });
      }
      catch(error){
         console.error('❌ Internal server error at delete analyse: ', error);
         return res.status(500).send({
            success: false,
            message: '❌ Internal server error at delete analyse',
            errorMessage: getErrorMessage(error) 
         });
      }
   };

};
export const analysisController: AnalysisController = new AnalysisController();