
// imports
import mongoose from "mongoose";

// import env
import dotenv from 'dotenv';
dotenv.config({});


class Database {

   // connection
   public connection(){
      mongoose.connect(`${process.env.DATABASE_URL}`)
         .then(() => {
            console.log('✔️ Database connected')
         })
         .catch((error) => {
            console.error('❌ Error at database conection', error);
            return process.exit(1); // node.js/program process immediately end with an error...
         })
   };

};
export const database: Database = new Database();