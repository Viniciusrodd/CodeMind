
// imports
import express, { Express } from "express";

// import server
import { server } from "@app/server";


export class App {

   // initialize app
   static initialize(): void {
      const app: Express = express();
      
      // start server
      server.start(app);
   };

};
App.initialize();