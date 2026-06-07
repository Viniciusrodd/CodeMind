/* eslint-disable react-hooks/exhaustive-deps */

// import css
import projectInformationsStyles from '@styles/pages/projectDetails/ProjectInformations.module.css';
import projectDocumentsStyle from '@styles/pages/projectDetails/ProjectDocuments.module.css';

// imports
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

// import images
import loading_img from '@images/loading.png';
import add_img from '@images/add.png';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';
import type { IDocument } from '@interfaces/document.interface';

// import components
import Modal from '@components/Modal';

// import services
import { documentService } from '@services/document.service';
import { projectService } from '@services/project.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';


const ProjectDocuments = () => {
   //// variables
   const navigate = useNavigate();
   const { projectId } = useParams<string>();
   const [ redirect, setRedirect ] = useState<boolean>(false);
   const [ closeAdvice, setCloseAdvice ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const [ documents, setDocuments ] = useState<IDocument[]>();
   const [ projectName, setProjectName ] = useState<string>();
   const [ deleteDocumentId, setDeleteDocumentId ] = useState<string>('');


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
      if(redirect){
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

      if(closeAdvice){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt_event: false, 
               btt_close: false, display: false
            });      
         }, 4000);

         return () =>{
            setLoading(false);
            clearTimeout(clearMessage);
         };
      }
   }, [navigate, redirect, closeAdvice]);

   // go prev
   const goPrev = () => {
      if(currentIndex > 0) setCurrentIndex(prev => prev - 1);
   };

   // go next
   const goNext = () => {
      if(documents && currentIndex < documents.length - 1) setCurrentIndex(prev => prev + 1);
   };

   // project + documents check
   useEffect(() => {
      const checkProject = async () => {
         setLoading(true);

         try{
            const response = await projectService.getProjectById(projectId!);
            
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
               setLoading(false);

               return;
            }

            setProjectName(response.name);

            setLoading(false);
         }
         catch(error){
            console.error('❌ Error at get project: ', error);

            const errorMessage = error instanceof Error ? error.message : error as string;
            modal_config({
               title: 'Erro ❌', 
               msg: `${ errorMessage }`, 
               btt_event: false, btt_close: false, display: true
            });

            setLoading(false);
            setRedirect(true);
         }
      };

      const checkDocuments = async () => {
         setLoading(true);

         try{
            const response = await documentService.getDocumentsByProjectId(projectId!);
            
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
               setLoading(false);

               return;
            }

            setDocuments(response);

            setLoading(false);
         }
         catch(error){
            console.error('❌ Error at get documents by project id: ', error);

            const errorMessage = error instanceof Error ? error.message : error as string;
            modal_config({
               title: 'Erro ❌', 
               msg: `${ errorMessage }`, 
               btt_event: false, btt_close: false, display: true
            });

            setLoading(false);
            setRedirect(true);
         }
      };

      checkProject();
      checkDocuments();
   }, [projectId]);

   // delete document advice
   const deleteDocumentAdvice = (id: string) => {
      modal_config({
         title: 'Espere ❕', 
         msg: 'Tem certeza que deseja excluir o documento ?', 
         btt_event: 'Certeza', btt_close: 'Melhor não', display: true
      });

      setDeleteDocumentId(id);
   };

   // delete document
   const deleteDocument = async () => {
      setLoading(true);

      try{
         const response = await documentService.deleteDocument(deleteDocumentId);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
            setLoading(false);

            return;
         }

         if(response.success){
            setLoading(false);

            if(documents && documents.length > 1){
               const documentsFiltered = documents.filter(document => document._id !== deleteDocumentId);
               setDocuments(documentsFiltered);
               setCurrentIndex(0);
            }

            modal_config({
               title: 'Sucesso ✔️', 
               msg: 'Documento deletado com sucesso', 
               btt_event: false, btt_close: false, display: true
            });

            setCloseAdvice(true);
         }
      }
      catch(error){
         console.error('❌ Error at delete document: ', error);

         const errorMessage = error instanceof Error ? error.message : error as string;
         modal_config({
            title: 'Erro ❌', 
            msg: `${ errorMessage }`, 
            btt_event: false, btt_close: 'Tentar novamente', display: true
         });

         setLoading(false);
      }
   };


   //// jsx


   return (
      <div className={ projectInformationsStyles['page-container'] }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt_event={ modal_btt }
            btt_close={ modal_btt_2 }
            display={ modal_display }
            modalEvent={ deleteDocument }
            onClose={ closeModal }
         />

         { /* informations container */ }
         { loading ? (
            <img 
               src={ loading_img } 
               alt="loading_img"
               className='loading_img'    
            />
         ) : (
            <div className={ projectInformationsStyles['informations-container'] }>
               <h1 className={ projectInformationsStyles.title }>
                  { projectName }
               </h1>

               <div className={ `${projectDocumentsStyle.informations} ${projectInformationsStyles.informations}` }>
                  { /* informations header */ }  
                  <div className={ projectInformationsStyles.header }>
                     <span className='material-symbols-outlined tooltip' data-tooltip="Anterior" onClick={ goPrev }>
                        arrow_circle_left
                     </span>
                     <h2>
                        { 
                           documents && documents.length > 0 
                           ? `"${documents[currentIndex].name}" - ${documents[currentIndex].type}` 
                           : 'sem documentos' 
                        }
                     </h2>
                     <span className='material-symbols-outlined tooltip' data-tooltip="Próximo" onClick={ goNext }>
                        arrow_circle_right
                     </span>
                  </div>

                  { /* informations scroll */ }
                  <div className={ `${projectDocumentsStyle.information} ${projectInformationsStyles.information} scroll` }>
                     { documents && documents.length > 0 ? (
                        <p className={ projectInformationsStyles.documents }>
                           { documents[currentIndex].content }
                        </p>
                     ) : (
                        <div className={ projectInformationsStyles['add-documents'] } onClick={ () => navigate(`/project/config/documents/${projectId}`) }>
                           <img src={ add_img } alt="add_img" />
                           <p>Adicionar documento</p>
                        </div>
                     ) }
                  </div>

                  { /* add/delete options */ }
                  { documents && documents.length > 0 && (
                     <div className={ projectDocumentsStyle['options-container'] }>
                        <span 
                           className={`material-symbols-outlined tooltip ${projectDocumentsStyle.add}`}
                           data-tooltip="Adicionar documento" 
                           onClick={ () => navigate(`/project/config/documents/${documents[currentIndex].projectId}`) } 
                        >
                           add
                        </span>

                        <span 
                           className={`material-symbols-outlined tooltip ${projectDocumentsStyle.delete}`}
                           data-tooltip="Deletar documento"
                           onClick={ () => deleteDocumentAdvice(documents[currentIndex]._id) }   
                        >
                           delete
                        </span>
                     </div>
                  ) }
               </div>
            </div>
         ) }

         { /* footer */ }
         { loading === false && (
            <div className={ projectInformationsStyles.footer }>
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

export default ProjectDocuments;