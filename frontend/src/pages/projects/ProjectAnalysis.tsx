
// import css
import styles from '@styles/pages/Projects/ProjectAnalysis.module.css';

// import components
import Title from '@components/Title';


const ProjectAnalysis = () => {
   return (
      <div className={ styles['page-container'] }>
         {/* title */}
         <Title />

         {/* inputs container */}
         <div className={ styles['inputs-container'] }>

            {/* code container */}
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
                  <button>
                     INSERIR CÓDIGO
                  </button>
                  
                  <p>ou</p>
                  
                  <button>
                     UPLOAD DO ARQUIVO
                  </button>
               </div>
            </div>

            {/* line division */}
            <div className={ styles['line-division'] }>

            </div>

            {/* context container */}
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

               <button>
                  ADICIONAR CONTEXTO
               </button>

               <div className={styles.examples }>
                  <h3>Exemplos:</h3>
                  <p>1. Objetivo do código</p>
                  <p>2. Dúvidas especificas</p>
                  <p>3. Foco da análise</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProjectAnalysis;