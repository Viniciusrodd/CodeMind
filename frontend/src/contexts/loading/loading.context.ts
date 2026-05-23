
// imports
import { createContext } from "react";


// loading type
type loadingContextType = {
   loading: boolean,
   setLoading: (loading: boolean) => void;
};

// export context
export const loadingContext = createContext<loadingContextType>({
   loading: false,
   setLoading: () => {}
});