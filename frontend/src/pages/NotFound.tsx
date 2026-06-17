
// imports
import { useNavigate } from "react-router-dom";

// import css
import styles from '@styles/pages/NotFound.module.css';


const NotFound = () => {
   //// variables
   const navigate = useNavigate();


   //// jsx
   
   
   return (
      <div className={ styles.container }>
         <h1>Oops!</h1>
         <h2>404 - Página não encontrada...</h2>
         <button type='button' onClick={ () => navigate('/project/dashboard') }>
            PÁGINA PRINCIPAL
         </button>

         <p>CodeMind</p>
      </div>
   );
};

export default NotFound;