
// document interface
export interface IDocument {
   _id: string,
   projectId: string,
   name: string,
   type: "code" | "doc",
   content: string,
   createdAt: Date,
   updatedAt: Date
};
