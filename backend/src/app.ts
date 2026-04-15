
// imports
import express, { Express } from "express";

// import server
import { server } from "@app/server";

// import database
import { database } from "@database/database";


export class App {

   // initialize app
   static initialize(): void {
      const app: Express = express();
      
      database.connection(); // database connection
      server.start(app); // start server
   };

};
App.initialize();