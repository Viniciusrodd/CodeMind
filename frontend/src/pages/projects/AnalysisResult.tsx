/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import css
import styles from '@styles/pages/Projects/AnalysisResult.module.css';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';
import type { IAnalysis } from '@interfaces/analysis.interface';

// import components
import Modal from '@components/Modal';

// import services
import { analysisService } from '@services/analysis.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';

// import images
import home_img from '@images/home.png';
import loading_img from '@images/loading.png';

// types
type AnalysisOptions = 'Explicação' | 'Problemas encontrados' | 'Sugestões' | 'Boas práticas';


const AnalysisResult = () => {
   //// variables
   const navigate = useNavigate();
   const { analysisId } = useParams<string>();
   const [ projectRedirect, setProjectRedirect ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const [ analysisOptions, setAnalysisOptions ] = useState<AnalysisOptions>('Explicação');
   const [ analyse, setAnalyse ] = useState<IAnalysis>({
      _id: '', projectId: '', input: { code: '', context: '' },
      ragContext: [{ chunkId: '', score: 0 }],
      output: { explication: '', problemsFound: [''], suggestions: [''], goodPractices: [''] },
      createdAt: new Date()
   });


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

   // check analysis
   useEffect(() => {
      const checkAnalysis = async () => {
         setLoading(true);

         try{
            const response = await analysisService.getAnalyseById(analysisId as string);
            if(!response) throw new Error('Análise não encontrada');

            setAnalyse(response);

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
   }, [analysisId]);


   //// jsx


   return (
      <div className={ styles['page-container'] }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt_event={ modal_btt }
            btt_close={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />

         <h1 className={ styles.title }>Resultado da análise</h1>

         {/* analyse container  */}
         <div className={ styles['analysis-container'] }>
            
            {/* options */}
            { loading ? (
               <img 
                  src={ loading_img } 
                  alt="loading_img"
                  className='loading_img'    
               />
            ) : (
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
            ) }

            <div className={ `${styles['data-container']} scroll` }>
               { analysisOptions === 'Explicação' && ( <p>{ analyse.output.explication }</p> ) }

               { analysisOptions === 'Problemas encontrados' && analyse.output.problemsFound.map((problem, index) => (
                  <p key={ index } className={ styles.list }>
                     { index + 1 }. { problem }
                  </p> 
               )) }
               
               { analysisOptions === 'Sugestões' && analyse.output.suggestions.map((suggestion, index) => (
                  <p key={ index } className={ styles.list }>
                     { index + 1 }. { suggestion }
                  </p> 
               )) }

               { analysisOptions === 'Boas práticas' && analyse.output.goodPractices.map((practice, index) => (
                  <p key={ index } className={ styles.list }>
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
                  <button type='button' className={ styles['copy-btt'] }>
                     COPIAR TEXTO
                  </button>
                  <button type='button'>
                     INICIAR NOVA ANÁLISE
                  </button>
               </div>
            ) }
         </div>

         {/* footer */}
         <div className={ styles.footer }>
            { !loading && (
               <div 
                  className={ `${styles['img-container']} tooltip` } 
                  data-tooltip='Projetos' 
                  onClick={ () => navigate('/project/dashboard') }
               >
                  <img src={ home_img } alt="home_img" />
               </div>
            ) }
         </div>
      </div>
   );
};

export default AnalysisResult;