
// imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import css
import styles from '@styles/pages/projectDetails/AnalysisHistoric.module.css';
import analysisResultStyles from '@styles/pages/Projects/AnalysisResult.module.css';

// import interfaces
import type { IAnalysis, AnalysisOptions } from '@interfaces/analysis.interface';

// import images
import home_img from '@images/home.png';


const AnalysisHistoric = () => {
   //// variables
   const navigate = useNavigate();
   const [ analysisOptions, setAnalysisOptions ] = useState<AnalysisOptions>('Explicação');
   const [ analyse, setAnalyse ] = useState<IAnalysis>({
      _id: '', projectId: '', input: { code: '', context: '' },
      ragContext: [{ chunkId: '', score: 0 }],
      output: { explication: '', problemsFound: [''], suggestions: [''], goodPractices: [''] },
      createdAt: new Date()
   });


   //// functions


   //// jsx


   return (
      <div className={ analysisResultStyles['page-container'] }>

         {/* analysis */}
         <div className={ styles.analysis }>
            <span className='material-symbols-outlined tooltip' data-tooltip="Anterior">
               arrow_circle_left
            </span>

            <h1 className={ analysisResultStyles.title }>
               1º Análise
            </h1>

            <span className='material-symbols-outlined tooltip' data-tooltip="Próximo">
               arrow_circle_right
            </span>
         </div>

         {/* analyse container  */}
         <div className={ analysisResultStyles['analysis-container'] }>
            
            {/* options */}
            <div className={ analysisResultStyles.options }>
               <button
                  type='button'
                  onClick={ () => setAnalysisOptions('Explicação') }
                  className={ analysisOptions === 'Explicação' ? analysisResultStyles.clicked : '' }   
               >
                  EXPLICAÇÃO
               </button>

               <button
                  type='button'
                  onClick={ () => setAnalysisOptions('Problemas encontrados') }
                  className={ analysisOptions === 'Problemas encontrados' ? analysisResultStyles.clicked : '' }  
               >
                  PROBLEMAS ENCONTRADOS
               </button>
               
               <button
                  type='button'
                  onClick={ () => setAnalysisOptions('Sugestões') }
                  className={ analysisOptions === 'Sugestões' ? analysisResultStyles.clicked : '' } 
               >
                  SUGESTÕES
               </button>
               
               <button
                  type='button'
                  onClick={ () => setAnalysisOptions('Boas práticas') }
                  className={ analysisOptions === 'Boas práticas' ? analysisResultStyles.clicked : '' } 
               >
                  BOAS PRÁTICAS
               </button>
            </div>

            {/* data */}
            <div className={ `${analysisResultStyles['data-container']} scroll` }>
               { analysisOptions === 'Explicação' && ( <p>{ analyse.output.explication }</p> ) }

               { analysisOptions === 'Problemas encontrados' && analyse.output.problemsFound.map((problem, index) => (
                  <p key={ index } className={ analysisResultStyles.list }>
                     { index + 1 }. { problem }
                  </p> 
               )) }
               
               { analysisOptions === 'Sugestões' && analyse.output.suggestions.map((suggestion, index) => (
                  <p key={ index } className={ analysisResultStyles.list }>
                     { index + 1 }. { suggestion }
                  </p> 
               )) }

               { analysisOptions === 'Boas práticas' && analyse.output.goodPractices.map((practice, index) => (
                  <p key={ index } className={ analysisResultStyles.list }>
                     { index + 1 }. { practice }
                  </p> 
               )) }
            </div>

            {/* buttons */}
            <div className={ styles.buttons }>
               <button type='button'>
                  COPIAR TEXTO
               </button>
            </div>

         </div>

         {/* footer */}
         <div className={ analysisResultStyles.footer }>
            <div 
               className={ `${analysisResultStyles['img-container']} tooltip` } 
               data-tooltip='Projetos' 
               onClick={ () => navigate('/project/dashboard') }
            >
               <img src={ home_img } alt="home_img" />
            </div>
         </div>
      </div>
   )
}

export default AnalysisHistoric;