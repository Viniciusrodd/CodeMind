/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import css
import styles from '@styles/pages/Projects/ProjectAnalysis.module.css';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';
import type { IAnalysisStatus } from '@interfaces/analysis.interface';

// import DTOs
import type { CreateAnalysisDTO } from '@DTOs/analysis.dtos';

// import components
import Modal from '@components/Modal';
import Title from '@components/Title';

// import services
import { projectService } from '@services/project.service';
import { analysisService } from '@services/analysis.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';

// import images
import check_img from '@images/check.png';
import loading_img from '@images/loading.png';


const ProjectAnalysis = () => {
   //// variables
   const navigate = useNavigate();
   const { projectId } = useParams<string>();
   const [ projectRedirect, setProjectRedirect ] = useState<boolean>(false);
   const [ analysisRedirect, setAnalysisRedirect ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const [ isCodeFilled, setIsCodeFilled ] = useState<boolean>(false);
   const [ isContextFilled, setIsContextFilled ] = useState<boolean>(false);
   const isAllFilled = isCodeFilled && isContextFilled;
   const [ code, setCode ] = useState<string>('');
   const [ context, setContext ] = useState<string>('');
   const [ inAnalysis, setInAnalysis ] = useState<boolean>(false);
   const [ analysisId, setAnalysisId ] = useState<string>();
   const [ analysisStatus, setAnalysisStatus ] = useState<IAnalysisStatus>({
      status1: false,
      status2: false,
      status3: false
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
   useEffect(() =>{
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

      if(analysisRedirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt_event: false, 
               btt_close: false, display: false
            });

            setInAnalysis(false);
            navigate(`/analysis/result/${analysisId}`);       
         }, 4000);

         return () =>{
            setLoading(false);
            clearTimeout(clearMessage);
         };
      }
   }, [projectRedirect, analysisRedirect, analysisId, navigate]);

   // check project
   useEffect(() => {
      const checkProject = async () => {
         setLoading(true);

         try{
            const response = await projectService.getProjectById(projectId as string);
            if(!response) throw new Error('Projeto não encontrado');

            setLoading(false);
         }
         catch(error){
            console.error('❌ Error at get project: ', error);
   
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
      
      checkProject();
   }, [projectId]);

   // code validation
   const codeValidation = () => {
      if(code === '' || code.length < 5){
         modal_config({
            title: 'Espere ❕', 
            msg: 
               code === '' ? 'Código não pode ser vazio...' :
               code.length < 5 ? 'Código muito pequeno' : ''
            , btt_event: false, btt_close: 'Inserir código', display: true
         });
      }else{
         setIsCodeFilled(true);
      }
   };

   // analysis status
   useEffect(() => {
      if(analysisStatus.status1){
         const time = setTimeout(() => {
            setAnalysisStatus(prev => ({
               ...prev,
               status1: false
            }));
         }, 2000);

         return () => {
            clearTimeout(time);
         }
      }
      if(analysisStatus.status2){
         const time = setTimeout(() => {
            setAnalysisStatus(prev => ({
               ...prev,
               status2: false
            }));
         }, 4000);

         return () => {
            clearTimeout(time);
         }
      }
      if(analysisStatus.status3){
         const time = setTimeout(() => {
            setAnalysisStatus(prev => ({
               ...prev,
               status3: false
            }));
         }, 6000);

         return () => {
            clearTimeout(time);
         }
      }
   }, [analysisStatus, setAnalysisStatus]);

   // analysis generation
   const analysisGeneration = async () => {
      // analysis loadings
      setInAnalysis(true);
      setAnalysisStatus({
         status1: true, status2: true, status3: true
      });
      setLoading(true);

      // data setup
      const data: CreateAnalysisDTO = {
         projectId: projectId!,
         input: {
            code,
            context
         }
      };

      try{
         const response = await analysisService.createAnalysis(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
            setLoading(false);

            return;
         }

         setLoading(false);
         setAnalysisId(response._id);
         
         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Análise de projeto criada`, 
            btt_event: false, btt_close: false, display: true
         });
         
         setAnalysisRedirect(true);
      }
      catch(error){
         console.error('❌ Error at generate analysis: ', error);

         const errorMessage = error instanceof Error ? error.message : error as string;
         modal_config({
            title: 'Erro ❌', 
            msg: `${ errorMessage }`, 
            btt_event: false, btt_close: false, display: true
         });

         setInAnalysis(false);
         setLoading(false);
         setProjectRedirect(true);
      }
   };


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

         {/* title */}
         <Title />

         {/* in analysis */}
         { inAnalysis && (
            <div className={ styles['inAnalysis-container'] }>
               <h1>Processamento da análise</h1>

               <div className={ styles['inAnalysis-status'] }>
                  <div className={ styles.status }>
                     <h2>
                        1. Identificando projeto ativo..................................................................
                     </h2>
                     { analysisStatus.status1 ? ( <img src={ loading_img } alt="loading_img" className='loading_img' /> ) : ( <img src={ check_img } alt="check_img" /> ) }
                  </div>
                  <div className={ styles.status }>
                     <h2>
                        2. Recuperando o contexto do projeto...................................................
                     </h2>
                     { analysisStatus.status2 ? ( <img src={ loading_img } alt="loading_img" className='loading_img' /> ) : ( <img src={ check_img } alt="check_img" /> ) }
                  </div>
                  <div className={ styles.status }>
                     <h2>
                        3. Combinando boas práticas com o contexto fornecido.....................
                     </h2>
                     { analysisStatus.status3 ? ( <img src={ loading_img } alt="loading_img" className='loading_img' /> ) : ( <img src={ check_img } alt="check_img" /> ) }
                  </div>
                  <div className={ styles.status }>
                     <h2>
                        4. Gerando a resposta final.......................................................................
                     </h2>
                     { loading ? ( <img src={ loading_img } alt="loading_img" className='loading_img' /> ) : ( <img src={ check_img } alt="check_img" /> ) }
                  </div>
               </div>
            </div>
         ) }

         {/* inputs container */}
         { !inAnalysis && (
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
                  
                  { loading ? (
                     <img 
                        src={ loading_img } 
                        alt="loading_img"
                        className='loading_img'    
                     />
                  ) : (
                     <button onClick={ () => setIsCodeFilled(false) }>
                        EDITAR CÓDIGO
                     </button>
                  ) }
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
                        value={ code }
                        onChange={ (e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value) }
                     >
                     </textarea>
                     <p>*limite de 5 mil caracteres...</p>
                  </div>

                  { loading ? (
                     <img 
                        src={ loading_img } 
                        alt="loading_img"
                        className='loading_img'    
                     />
                  ) : (
                     <button onClick={ codeValidation }>
                        INSERIR CÓDIGO
                     </button>
                  ) }
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
                  
                  { loading ? (
                     <img 
                        src={ loading_img } 
                        alt="loading_img"
                        className='loading_img'    
                     />
                  ) : (
                     <button onClick={ () => setIsContextFilled(false) }>
                        EDITAR CONTEXTO
                     </button>
                  ) }
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
                        value={ context }
                        onChange={ (e: React.ChangeEvent<HTMLTextAreaElement>) => setContext(e.target.value) }
                     >
                     </textarea>
                     <p>*limite de 5 mil caracteres...</p>
                  </div>

                  { loading ? (
                     <img 
                        src={ loading_img } 
                        alt="loading_img"
                        className='loading_img'    
                     />
                  ) : (
                     <button onClick={ () => setIsContextFilled(true) }>
                        ADICIONAR CONTEXTO
                     </button>
                  ) }

                  <div className={styles.examples }>
                     <h3>Exemplos:</h3>
                     <p>1. Objetivo do código</p>
                     <p>2. Dúvidas especificas</p>
                     <p>3. Foco da análise</p>
                  </div>
               </div>
            ) }
         </div>
         )}

         {/* code + context filled */}
         { isAllFilled && loading === false && !inAnalysis && (
            <button className={ styles['analysis-btt'] } onClick={ analysisGeneration }>
               GERAR ANÁLISE
            </button>
         ) }

         {/* footer */}
         { loading === false && (
            <div className={ styles.footer }>
               <span 
                  className='material-symbols-outlined tooltip' data-tooltip="Voltar" 
                  onClick={ () => navigate(`/project/dashboard`) }
               >
                  Undo
               </span>
            </div>
         ) }
      </div>
   );
};

export default ProjectAnalysis;