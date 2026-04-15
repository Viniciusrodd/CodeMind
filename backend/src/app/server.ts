
// imports
import { Application, json, urlencoded } from "express";

// import env
import dotenv from 'dotenv';
dotenv.config({});


class Server {

   // start server functions
   public async start(app: Application): Promise<void> {      
      this.startServer(app);
   };


   // start server
   private startServer(app: Application): void {
      app.listen(process.env.SERVER_PORT, () => {
         console.log('✔️ Server: ', process.env.SERVER_PORT);
      });
   };

};
export const server: Server = new Server();