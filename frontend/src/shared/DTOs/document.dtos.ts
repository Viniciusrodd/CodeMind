
// create document
export interface CreateDocumentDTO {
   projectId: string,
   name: string,
   type: "code" | "doc",
   content: string,
};

// update document
export interface UpdateDocumentDTO {
   name?: string,
   type?: "code" | "doc",
   content?: string
};