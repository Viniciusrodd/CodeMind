
// imports
import { useState } from 'react';

// import css
import styles from '@styles/pages/Welcome.module.css';

// import components
import Title from '@components/Title';


const Welcome = () => {
   //// variables
   const [ name, setName ] = useState<string>('Vini');
   const [ hasProject, setHasProject ] = useState<boolean>(false);


   //// jsx


   return (
      <div className={ styles['page-container'] }>
         {/* title */}
         <Title />

         { /* welcome */ }
         <p className={ styles.welcome }>
            { name }, seu analisador de códigos já está no ar 🚀
         </p>

         { /* send */ }
         { hasProject ? (
            <button type='button'>
               VISITAR MEUS PROJETOS
            </button>
         ) : (
            <button type='button'>
               CRIAR MEU PRIMEIRO PROJETO
            </button>
         ) }
      </div>
   );
};

export default Welcome;