
// imports
import { Router, Request, Response } from "express";


// export router
export const routes: Router = Router();


// routes - test
routes.get('/test', (req: Request, res: Response) => {
   res.send('✔️ Sucesso');
});