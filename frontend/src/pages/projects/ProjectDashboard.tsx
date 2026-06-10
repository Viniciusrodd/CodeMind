/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

// import css
import styles from '@styles/pages/Projects/ProjectDashboard.module.css';

// import images
import analysis_img from '@images/analysis_2.png';
import loading_img from '@images/loading.png';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';
import type { IProjectDocument } from '@interfaces/project.interface';

// import components
import Modal from '@components/Modal';

// import services
import { projectService } from '@services/project.service';
import { userService } from '@services/user.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';


const ProjectDashboard = () => {
   //// variables
   const navigate = useNavigate();
   const [ registerRedirect, setRegisterRedirect ] = useState<boolean>(false);
   const [ welcomeRedirect, setWelcomeRedirect ] = useState<boolean>(false);
   const [ closeAdvice, setCloseAdvice ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const [ actualProject, setActualProject ] = useState<IProjectDocument>({
      _id: '', name: '', description: '', 
      context: { type: 'backend', languages: [''], frameworks: [''], purpose: '', environment: '' },
      createdAt: new Date(), updatedAt: new Date()
   });
   const [ projects, setProjects ] = useState<IProjectDocument[]>([{
      _id: '', name: '', description: '', 
      context: { type: 'backend', languages: [''], frameworks: [''], purpose: '', environment: '' },
      createdAt: new Date(), updatedAt: new Date()
   }]);
   const [ deleteProjectId, setDeleteProjectId ] = useState<string>('');


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
   }, [registerRedirect, welcomeRedirect, closeAdvice, navigate]);

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

            const errorMessage = error instanceof Error ? error.message : error as string;
            modal_config({
               title: 'Erro ❌', 
               msg: `${ errorMessage }`, 
               btt_event: false, btt_close: false, display: true
            });

            setLoading(false);
            setRegisterRedirect(true);
         }
      };

      // project
      const checkProject = async () => {
         setLoading(true);

         try{
            const response = await projectService.getAllProject();
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
               setLoading(false);

               return;
            }

            setProjects(response);

            const getActualProject = response[0];
            if(getActualProject) setActualProject(getActualProject);

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
            setWelcomeRedirect(true);
         }
      };

      checkUser();
      checkProject();
   }, []);

   // delete project advice
   const deleteProjectAdvice = (id: string) => {
      modal_config({
         title: 'Espere ❕', 
         msg: 'Tem certeza que deseja excluir o projeto ?', 
         btt_event: 'Certeza', btt_close: 'Melhor não', display: true
      });

      setDeleteProjectId(id);
   };

   // delete project
   const deleteProject = async () => {
      setLoading(true);

      try{
         const response = await projectService.deleteProject(deleteProjectId);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
            setLoading(false);

            return;
         }

         if(response.success){
            setLoading(false);

            if(projects.length > 1){
               const projectsFiltered = projects.filter(project => project._id !== deleteProjectId);
               setProjects(projectsFiltered);
               setActualProject(projectsFiltered[0]);
            }else{
               setWelcomeRedirect(true);
            }
            
            modal_config({
               title: 'Sucesso ✔️', 
               msg: 'Projeto deletado com sucesso', 
               btt_event: false, btt_close: false, display: true
            });
            
            setCloseAdvice(true);
         }
      }
      catch(error){
         console.error('❌ Error at delete project: ', error);

         const errorMessage = error instanceof Error ? error.message : error as string;
         modal_config({
            title: 'Erro ❌', 
            msg: `${ errorMessage }`, 
            btt_event: false, btt_close: 'Tentar novamente', display: true
         });

         setLoading(false);
      }
   };

   // get specific project
   const getSpecificProject = (id: string) => {
      const getActualProject = projects.find(p => p._id == id);
      if(getActualProject) setActualProject(getActualProject);
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
            modalEvent={ deleteProject }
            onClose={ closeModal }
         />

         { /* dashboard */ }
         <div className={ styles.dashboard }>

            { /* projects sidebar */ }
            <div className={ styles.sidebar }>
               { loading === false && (
                  <>
                  <h2>Projetos</h2>
                  <hr />

                  <div className={ `${styles['project-list']} scroll` }>
                     { projects && projects.map((project, index) => (
                        <div key={ index }>
                           <p onClick={ () => getSpecificProject(project._id) }>
                              { project.name }
                           </p>
                           <span className="material-symbols-outlined" onClick={ () => deleteProjectAdvice(project._id) }>
                              delete
                           </span>
                        </div>
                     )) }
                  </div>
               
                  <hr />
                  <button type='button' onClick={ () => navigate('/project/config') }>
                     NOVO PROJETO
                  </button>
                  </>
               ) }
            </div>

            { /* dashboard */ }
            <div className={ styles.project }>
               { loading ? (
                  <img 
                     src={ loading_img } 
                     alt="loading_img"
                     className='loading_img'    
                  />
               ) : (
                  <>
                  <h1 className={ styles.title }>
                     { actualProject.name }
                  </h1>

                  <div className={ `${styles.desc} scroll` }>
                     <p>{ actualProject.description }</p>
                  </div>

                  <div className={ styles.logo }>
                     <img src={ analysis_img } alt="analysis_img" />
                  </div>

                  <button type='button' onClick={ () => navigate(`/project/analysis/${actualProject._id}`) }>
                     NOVA ANÁLISE DE CÓDIGO
                  </button>
                  </>
               ) }
            </div>

            { /* projects details sidebar */ }
            <div className={ styles.sidebar }>
               { loading === false && (
                  <>
                  <h2>Detalhes do projeto</h2>
                  <hr />
               
                  <div className={ styles['project-options'] }>
                     <p 
                        className={ styles['project-options'] } 
                        onClick={ () => navigate(`/project/informations/${actualProject._id}`) }
                     >
                        Informações do projeto
                     </p>
                     <p 
                        className={ styles['project-options'] }
                        onClick={ () => navigate(`/project/documents/${actualProject._id}`) }
                     >
                        Documentos associados
                     </p>
                     <p className={ styles['project-options'] }>Histórico de análises</p>
                  </div>
                  </>
               ) }
            </div>

         </div>

         { /* footer */ }
         <div className={ styles.footer }>
            { loading === false && (
               <>
               <span 
                  className={ `${styles.exit} material-symbols-outlined tooltip` }
                  data-tooltip="Sair"
                  onClick={ () => navigate('/welcome') }
               >
                  logout
               </span>
               <span 
                  className={ `${styles.settings} material-symbols-outlined tooltip` } 
                  data-tooltip="Editar projeto"
                  onClick={ () => navigate(`/project/edit/${actualProject._id}`) }
               >
                  edit_square
               </span>
               </>
            ) }
         </div>
      </div>
   );
};

export default ProjectDashboard;