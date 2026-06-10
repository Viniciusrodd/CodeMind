
// imports
import { useState } from 'react';

// import css
import styles from '@styles/pages/Projects/ProjectAnalysis.module.css';

// import images
import check_img from '@images/check.png';

// import components
import Title from '@components/Title';


const ProjectAnalysis = () => {
   //// variables
   const [ isCodeFilled, setIsCodeFilled ] = useState<boolean>(false);
   const [ isContextFilled, setIsContextFilled ] = useState<boolean>(false);
   const isAllFilled = isCodeFilled && isContextFilled;


   //// functions


   //// jsx


   return (
      <div className={ styles['page-container'] }>
         {/* title */}
         <Title />

         {/* inputs container */}
         <div className={ styles['inputs-container'] }>

            {/* code container */}
            { isCodeFilled ? (
               <div className={styles['filled-container'] }>
                  <div className={ styles.advice }>
                     <h1>Código inserido</h1>

                     <div className={ styles['img-container'] }>
                        <img src={ check_img } alt="check_img" />
                     </div>
                  </div>

                  <button onClick={ () => setIsCodeFilled(false) }>
                     EDITAR CÓDIGO
                  </button>
               </div>
            ) : (
               <div className={ styles['code-container'] }>
                  <div className={ styles.input }>
                     <h1>Cole o seu código</h1>

                     <textarea 
                        name="" 
                        id=""
                        title='code'
                        placeholder='Código aqui...'
                        maxLength={ 5000 }
                     >
                     </textarea>
                     <p>*limite de 5 mil caracteres...</p>
                  </div>

                  <div className={ styles['buttons-container'] }>
                     <button onClick={ () => setIsCodeFilled(true) }>
                        INSERIR CÓDIGO
                     </button>
                     
                     <p>ou</p>
                     
                     <button>
                        UPLOAD DO ARQUIVO
                     </button>
                  </div>
               </div>
            ) }

            {/* line division */}
            <div className={ styles['line-division'] }>

            </div>

            {/* context container */}
            { isContextFilled ? (
               <div className={styles['filled-container'] }>
                  <div className={ styles.advice }>
                     <h1>Contexto inserido</h1>

                     <div className={ styles['img-container'] }>
                        <img src={ check_img } alt="check_img" />
                     </div>
                  </div>

                  <button onClick={ () => setIsContextFilled(false) }>
                     EDITAR CONTEXTO
                  </button>
               </div>
            ) : (
               <div className={ styles['context-container'] }>
                  <div className={ styles.input }>
                     <h1>Contexto adicional (opcional)</h1>

                     <textarea 
                        name="" 
                        id=""
                        title='context'
                        placeholder='Contexto aqui...'
                        maxLength={ 5000 }
                     >
                     </textarea>
                     <p>*limite de 5 mil caracteres...</p>
                  </div>

                  <button onClick={ () => setIsContextFilled(true) }>
                     ADICIONAR CONTEXTO
                  </button>

                  <div className={styles.examples }>
                     <h3>Exemplos:</h3>
                     <p>1. Objetivo do código</p>
                     <p>2. Dúvidas especificas</p>
                     <p>3. Foco da análise</p>
                  </div>
               </div>
            ) }
         </div>

         {/* code + context filled */}
         { isAllFilled && (
            <button>
               GERAR ANÁLISE
            </button>
         ) }
      </div>
   );
};

export default ProjectAnalysis;