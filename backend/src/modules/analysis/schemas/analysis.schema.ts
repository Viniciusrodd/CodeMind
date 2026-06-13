
// imports
import { model, Model, Schema } from "mongoose";

// import interfaces
import { IAnalysis } from "@analysis/interfaces/analysis.interface";


// schema
const analysisSchema: Schema = new Schema<IAnalysis>({
   projectId: { type: String, required: true },
   input: {
      code: { type: String, required: true},
      context: { type: String, required: false }
   },
   ragContext: [{
      chunkId: { type: String, required: true },
      score: { type: Number, required: true }
   }],
   output: {
      explication: { type: String, required: true },
      problemsFound: { type: [String], required: true },
      suggestions: { type: [String], required: true },
      goodPractices: { type: [String], required: true },
   },
   createdAt: { type: Date, default: Date.now }
});


// model
const analysisModel: Model<IAnalysis> = model<IAnalysis>('Analysis', analysisSchema, 'Analysis');
export { analysisModel };