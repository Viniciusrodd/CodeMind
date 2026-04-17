
// imports
import { model, Model, Schema } from "mongoose";

// import interfaces
import { IProjectDocument } from "@project/interfaces/project.interface";


// schema
const projectSchema: Schema = new Schema<IProjectDocument>({
   name: { type: String },
   description: { type: String },
   context: {
      type: {
         type: String,
         enum: ['backend', 'frontend', 'fullstack'],
         required: true
      },
      languages: { type: [String], required: true },
      frameworks: { type: [String], required: true },
      purpose: { type: String, required: true },
      environment: { type: String, required: true }
   },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});


// model
const ProjectModel: Model<IProjectDocument> = model<IProjectDocument>('Project', projectSchema, 'Project');
export { ProjectModel };