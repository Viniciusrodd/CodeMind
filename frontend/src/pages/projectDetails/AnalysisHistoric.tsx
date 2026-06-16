/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import css
import styles from '@styles/pages/projectDetails/AnalysisHistoric.module.css';
import analysisResultStyles from '@styles/pages/Projects/AnalysisResult.module.css';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';
import type { IAnalysis, AnalysisOptions } from '@interfaces/analysis.interface';

// import components
import Modal from '@components/Modal';

// import services
import { analysisService } from '@services/analysis.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';

// import images
import home_img from '@images/home.png';
import loading_img from '@images/loading.png';


const AnalysisHistoric = () => {
   //// variables
   const navigate = useNavigate();
   const { projectId } = useParams<string>();
   const [ projectRedirect, setProjectRedirect ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const [ analysisOptions, setAnalysisOptions ] = useState<AnalysisOptions>('Explicação');
   const [ analyses, setAnalyses ] = useState<IAnalysis[]>([]);


   //// functions


   // modal config
   const modal_config = ({ title, msg, btt_event, btt_close, display }: iModalConfig) => {
      setModal_title(title ?? '');
      setModal_msg(msg ?? '');
      setmodal_btt(btt_event ?? false);
      setModal_btt_2(btt_close ?? false);
      setModal_display(display ?? false);
   };   

   // close modal
   const closeModal = () =>{
      modal_config({
         title: '', msg: '', btt_event: false, 
         btt_close: false, display: false
      });
      setLoading(false);
   };

   // redirect
   useEffect(() => {
      if(projectRedirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt_event: false, 
               btt_close: false, display: false
            });

            navigate(`/project/dashboard`);       
         }, 4000);

         return () =>{
            setLoading(false);
            clearTimeout(clearMessage);
         };
      }
   }, [projectRedirect, navigate]);

   // go prev
   const goPrev = () => {
      if(currentIndex > 0) setCurrentIndex(prev => prev - 1);
   };

   // go next
   const goNext = () => {
      if(analyses && currentIndex < analyses.length - 1) setCurrentIndex(prev => prev + 1);
   };

   // check analysis
   useEffect(() => {
      const checkAnalysis = async () => {
         setLoading(true);

         try{
            const response = await analysisService.getAnalysisByProjectId(projectId as string);
            if(!response) throw new Error('Análises não encontradas');

            setAnalyses(response);

            setLoading(false);
         }
         catch(error){
            console.error('❌ Error at get analysis: ', error);
   
            const errorMessage = error instanceof Error ? error.message : String(error);
            modal_config({
               title: 'Erro ❌', 
               msg: `${ errorMessage }`, 
               btt_event: false, btt_close: false, display: true
            });
   
            setLoading(false);
            setProjectRedirect(true);
         }
      };

      checkAnalysis();
   }, [projectId]);

   // copy text
   const copyText = (text: string | string[]) => {
      const textFormatted: string = Array.isArray(text) ? text.join(`\n \n`) : text;

      navigator.clipboard.writeText(textFormatted);

      modal_config({
         title: 'Sucesso ✔️', 
         msg: 'Texto copiado para área de transferência!', 
         btt_event: false, btt_close: "Ok", display: true
      });
   };


   //// jsx


   return (
      <div className={ analysisResultStyles['page-container'] }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt_event={ modal_btt }
            btt_close={ modal_btt_2 }
            btt_close_class={ true }
            display={ modal_display }
            onClose={ closeModal }
         />

         {/* analysis */}
         <div className={ styles.analysis }>
            <span className='material-symbols-outlined tooltip' data-tooltip="Anterior" onClick={ goPrev }>
               arrow_circle_left
            </span>

            <h1 className={ analysisResultStyles.title }>
               { 
                  analyses && analyses.length > 0
                  ? (`${ currentIndex + 1 }° Análise`)
                  : ('Sem análises')  
               }
            </h1>

            <span className='material-symbols-outlined tooltip' data-tooltip="Próximo" onClick={ goNext }>
               arrow_circle_right
            </span>
         </div>

         {/* analyse container  */}
         <div className={ analysisResultStyles['analysis-container'] }>
            
            {/* options */}
            { loading ? (
               <img 
                  src={ loading_img } 
                  alt="loading_img"
                  className='loading_img'    
               />
            ) : (
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
            ) }

            {/* data */}
            <div className={ `${analysisResultStyles['data-container']} scroll` }>
               { analysisOptions === 'Explicação' && ( 
                  <p>{ 
                     analyses && analyses.length > 0 && analyses[currentIndex].output.explication 
                  }</p> 
               ) }

               { analysisOptions === 'Problemas encontrados' && analyses && analyses.length > 0 && analyses[currentIndex].output.problemsFound.map((problem, index) => (
                  <p key={ index } className={ analysisResultStyles.list }>
                     { index + 1 }. { problem }
                  </p> 
               )) }
               
               { analysisOptions === 'Sugestões' && analyses && analyses.length > 0 && analyses[currentIndex].output.suggestions.map((suggestion, index) => (
                  <p key={ index } className={ analysisResultStyles.list }>
                     { index + 1 }. { suggestion }
                  </p> 
               )) }

               { analysisOptions === 'Boas práticas' && analyses && analyses.length > 0 && analyses[currentIndex].output.goodPractices.map((practice, index) => (
                  <p key={ index } className={ analysisResultStyles.list }>
                     { index + 1 }. { practice }
                  </p> 
               )) }
            </div>

            {/* buttons */}
            { loading ? (
               <img 
                  src={ loading_img } 
                  alt="loading_img"
                  className='loading_img'    
               />
            ) : (
               <div className={ styles.buttons }>
                  { analyses && analyses.length > 0 && (
                     <button type='button'
                        onClick={ () => copyText(
                           analysisOptions === 'Explicação' ? analyses[currentIndex].output.explication :
                           analysisOptions === 'Problemas encontrados' ? analyses[currentIndex].output.problemsFound :
                           analysisOptions === 'Sugestões' ? analyses[currentIndex].output.suggestions :
                           analysisOptions === 'Boas práticas' ? analyses[currentIndex].output.goodPractices : ''
                        ) }
                     >
                        COPIAR TEXTO
                     </button>
                  ) }
               </div>
            ) }

         </div>
         
         {/* footer */}
         <div className={ analysisResultStyles.footer }>
            { !loading && (
               <div 
                  className={ `${analysisResultStyles['img-container']} tooltip` } 
                  data-tooltip='Projetos' 
                  onClick={ () => navigate('/project/dashboard') }
               >
                  <img src={ home_img } alt="home_img" />
               </div>
            ) }
         </div>
      </div>
   )
}

export default AnalysisHistoric;