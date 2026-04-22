
// imports
import { Application, json, urlencoded } from "express";
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';

// import routes
import { routes } from "@app/routes";

// import env
import dotenv from 'dotenv';
dotenv.config({});

// import database configs
import { setupVectorIndex } from "@database/setupVectorIndex";


class Server {

   // start server functions
   public async start(app: Application): Promise<void> {      
      this.startServer(app);
      
      this.securityMiddlewares(app);
      this.dataMiddlewaresConfig(app);
      this.routerConfig(app);
      await setupVectorIndex.create();
   };


   // security middlewares
   private securityMiddlewares(app: Application): void {
      app.use(hpp()); // prevents against "HTTP Parameter Pollution"
      app.use(helmet()); // safety config HTTP headers
      app.use(cors({
         origin: process.env.CLIENT_URL,
         credentials: true,
         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }));

      console.log('✔️ Security middlewares');
   };


   // data middlewares config
   private dataMiddlewaresConfig(app: Application): void {
      app.use(compression()); // compresses the data from HTTP responses
      app.use(json({ limit: '50mb' }));
      app.use(urlencoded({
         extended: true,
         limit: '50mb'
      }));

      console.log('✔️ Data middlewares');
   };


   // route config
   private routerConfig(app: Application): void {
      app.use('/api', routes); // index routes

      console.log('✔️ Routes');
   };


   // start server
   private startServer(app: Application): void {
      app.listen(process.env.SERVER_PORT, () => {
         console.log('✔️ Server: ', process.env.SERVER_PORT);
      });
   };

};
export const server: Server = new Server();