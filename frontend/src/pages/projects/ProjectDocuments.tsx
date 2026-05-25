/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

// import css
import styles from '@styles/pages/Projects/ProjectDocuments.module.css';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';

// import components
import Modal from '@components/Modal';

// import services
import { projectService } from '@services/project.service';
import { userService } from '@services/user.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';

// import images
import folder_img from '@images/folder.png';
import loading_img from '@images/loading.png';
import check_img from '@images/check.png';


const ProjectDocuments = () => {
   //// variables
   const navigate = useNavigate();
   const [ registerRedirect, setRegisterRedirect ] = useState<boolean>(false);
   const [ welcomeRedirect, setWelcomeRedirect ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const { projectId } = useParams<string>();
   const [ files, setFiles ] = useState<File[] | null>(null);
   const [ fileAdded, setFileAdded ] = useState<boolean>(false);


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
      if(registerRedirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt_event: false, 
               btt_close: false, display: false
            });

            navigate('/');       
         }, 4000);

         return () =>{
            setLoading(false);
            clearTimeout(clearMessage);
         };
      }

      if(welcomeRedirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt_event: false, 
               btt_close: false, display: false
            });

            navigate('/welcome');       
         }, 4000);

         return () =>{
            setLoading(false);
            clearTimeout(clearMessage);
         };
      }
   }, [registerRedirect, welcomeRedirect, navigate]);

   // check user/project existence
   useEffect(() => {
      // user
      const checkUser = async () => {
         setLoading(true);

         try{
            const response = await userService.getUser();
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
               setLoading(false);

               return;
            }

            setLoading(false);
         }
         catch(error){
            console.error('❌ Error at get user: ', error);

            modal_config({
               title: 'Erro ❌', 
               msg: `${ error }, \n você será redirecionado...`, 
               btt_event: false, btt_close: false, display: true
            });

            setLoading(false);
            setRegisterRedirect(true);
         }
      }

      // project
      const checkProject = async () => {
         setLoading(true);

         try{
            const response = await projectService.getProjectById(projectId as string);
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
               setLoading(false);

               return;
            }

            setLoading(false);
         }
         catch(error){
            console.error('❌ Error at get project: ', error);

            modal_config({
               title: 'Erro ❌', 
               msg: `${ error }, \n você será redirecionado...`, 
               btt_event: false, btt_close: false, display: true
            });

            setLoading(false);
            setWelcomeRedirect(true);
         }
      }

      checkUser();
      checkProject();
   }, []);

   // upload file
   const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) =>{
      if(e.target.files && e.target.files.length > 0){
         const newFiles = Array.from(e.target.files);
    
         setFiles(prev => {
            if(prev){
               return [...prev, ...newFiles];
            }
            
            return newFiles;
         });
         
         setFileAdded(true);
      }
   };

   // remove document
   const removeDocument = (indexToRemove: number) => {
      setFiles(prev => {
         if(!prev) return null;

         const newFiles = prev.filter((_, index) => index !== indexToRemove);

         if(newFiles.length > 0){
            return newFiles;
         }else{
            setFileAdded(false);
            return null
         }
      });
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

         { /* title */ }
         <h1>Deseja adicionar algum documento relevante para o projeto ?</h1>

         { /* logo */ }
         { loading ? (
            <img 
               src={ loading_img } 
               alt="loading_img"
               className='loading_img'    
            />
         ) : (
            <div className={ fileAdded ? `${styles['logo-container-added']} scroll` : styles['logo-container'] }>
               { fileAdded ? (
                  <div>
                     <img src={ check_img } alt="folder_img" />
                     <p className={ styles.title }>
                        Documentos adicionados: { files?.length }
                     </p>
                     { files?.map((file, index) => (
                        <div key={ index } className={ styles.line }>
                           <p>{ index + 1 }. { file.name }</p>
                           <span className="material-symbols-outlined" onClick={ () => removeDocument(index) }>
                              delete
                           </span>
                        </div>
                     )) }
                  </div>
               ) : (
                  <img src={ folder_img } alt="folder_img" />
               ) }
            </div>
         ) }

         { /* buttons */ }
         <div className={ styles.buttons }>
            <input 
               title='file' type="file" name="add_file" 
               id='add_file' className={ styles.file_input }
               accept="
                  .txt, .md, .pdf, .docx, .doc, .js, .jsx, .ts, .tsx,
                  .json, .yaml, .yml, .xml, .html, .css, .scss, .py,
                  .java, .kt, .cs, .go, .rs, .php, .rb, .c, .cpp, .h,
                  .sql, .sh, .bash, .env.example, README, Dockerfile, 
                  docker-compose.yml
               "
               onChange={ uploadFile }
            />
            <label htmlFor="add_file" className={ styles.add }>
               <p>ADICIONAR DOCUMENTO</p>
            </label>

            <button type='button' className={ styles.next }>
               SEGUIR EM FRENTE
            </button>
         </div>

         { /* infos */ }
         <div className={ styles.infos }>
            <h3>Exemplos:</h3>
            <p>1. Arquivos de código (.js, .ts, .tsx, etc.)</p>
            <p>2. Documentação (README, especificações)</p>
         </div>
      </div>
   );
};

export default ProjectDocuments;