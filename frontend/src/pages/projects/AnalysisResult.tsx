
// imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import css
import styles from '@styles/pages/Projects/AnalysisResult.module.css';

// import images
import home_img from '@images/home.png';

// types
type AnalysisOptions = 'Explicação' | 'Problemas encontrados' | 'Sugestões' | 'Boas práticas';


const AnalysisResult = () => {
   //// variables
   const navigate = useNavigate();
   const [ analysisOptions, setAnalysisOptions ] = useState<AnalysisOptions>('Explicação');


   //// functions


   //// jsx


   return (
      <div className={ styles['page-container'] }>
         <h1 className={ styles.title }>Resultado da análise</h1>

         {/* analyse container  */}
         <div className={ styles['analysis-container'] }>
            
            {/* options */}
            <div className={ styles.options }>
               <button
                  type='button'
                  onClick={ () => setAnalysisOptions('Explicação') }
                  className={ analysisOptions === 'Explicação' ? styles.clicked : '' }   
               >
                  EXPLICAÇÃO
               </button>

               <button
                  type='button'
                  onClick={ () => setAnalysisOptions('Problemas encontrados') }
                  className={ analysisOptions === 'Problemas encontrados' ? styles.clicked : '' }  
               >
                  PROBLEMAS ENCONTRADOS
               </button>
               
               <button
                  type='button'
                  onClick={ () => setAnalysisOptions('Sugestões') }
                  className={ analysisOptions === 'Sugestões' ? styles.clicked : '' } 
               >
                  SUGESTÕES
               </button>
               
               <button
                  type='button'
                  onClick={ () => setAnalysisOptions('Boas práticas') }
                  className={ analysisOptions === 'Boas práticas' ? styles.clicked : '' } 
               >
                  BOAS PRÁTICAS
               </button>
            </div>

            <div className={ `${styles['data-container']} scroll` }>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </p>
            </div>

            {/* buttons */}
            <div className={ styles.buttons }>
               <button type='button'>
                  COPIAR TEXTO
               </button>
               <button type='button'>
                  INICIAR NOVA ANÁLISE
               </button>
            </div>
         </div>

         {/* footer */}
         <div className={ styles.footer }>
            <div 
               className={ `${styles['img-container']} tooltip` } 
               data-tooltip='Projetos' 
               onClick={ () => navigate('/project/dashboard') }
            >
               <img src={ home_img } alt="home_img" />
            </div>
         </div>
      </div>
   );
};

export default AnalysisResult;