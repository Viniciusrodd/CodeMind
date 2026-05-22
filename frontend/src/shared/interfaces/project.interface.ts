
// context types
type contextType = 'backend' | 'frontend' | 'fullstack'

// context interface
export interface IContext {
   type: contextType,
   languages: string[],
   frameworks: string[],
   purpose: string,
   environment: string
};

// context interface
export interface IContextUpdate {
   type?: contextType,
   languages?: string[],
   frameworks?: string[],
   purpose?: string,
   environment?: string
};