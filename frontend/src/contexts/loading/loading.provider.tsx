
// import hooks
import { useState, type ReactNode } from "react";

// import context
import { loadingContext } from "./loading.context";

// types
type loadingPropsProvider = {
   children: ReactNode
};


export const LoadingProvider = ({ children }: loadingPropsProvider) =>{
   // states
   const [ loading, setLoading ] = useState<boolean>(false);

   // jsx
   return (
      <loadingContext.Provider value={{ loading, setLoading }}>
         { children }
      </loadingContext.Provider>
   )
};