/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useParams, useNavigate } from 'react-router-dom';
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
   const { projectId } = useParams<string>();
   const navigate = useNavigate();
   const [ registerRedirect, setRegisterRedirect ] = useState<boolean>(false);
   const [ welcomeRedirect, setWelcomeRedirect ] = useState<boolean>(false);
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

            const getActualProject = response.find(p => p._id == projectId);
            if(getActualProject) setActualProject(getActualProject);

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
      };

      checkUser();
      checkProject();
   }, [projectId]);

   // projects redirect
   const projectRedirect = (id: string) => {
      if(id === '') return;

      navigate(`/project/${id}`);
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

         { /* dashboard */ }
         <div className={ styles.dashboard }>

            { /* projects sidebar */ }
            <div className={ styles.sidebar }>
               <h2>Projetos</h2>
               <hr />

               <div className={ `${styles['project-list']} scroll` }>
                  { projects && projects.map((project, index) => (
                     <p key={ index } onClick={ () => projectRedirect(project._id) }>
                        { project.name }
                     </p>
                  )) }
               </div>
               <hr />

               <button type='button'>
                  NOVO PROJETO
               </button>
            </div>

            { /* dashboard */ }
            <div className={ styles.project }>

               <h1 className={ styles.title }>
                  { actualProject.name }
               </h1>

               <div className={ `${styles.desc} scroll` }>
                  <p>{ actualProject.description }</p>
               </div>

               { loading ? (
                  <img 
                     src={ loading_img } 
                     alt="loading_img"
                     className='loading_img'    
                  />
               ) : (
                  <div className={ styles.logo }>
                     <img src={ analysis_img } alt="analysis_img" />
                  </div>
               ) }

               <button type='button'>
                  NOVA ANÁLISE DE CÓDIGO
               </button>
            </div>

            { /* projects details sidebar */ }
            <div className={ styles.sidebar }>
               <h2>Detalhes do projeto</h2>
               <hr />

               <div className={ styles['project-options'] }>
                  <p className={ styles['project-options'] }>Informações do projeto</p>
                  <p className={ styles['project-options'] }>Documentos associados</p>
                  <p className={ styles['project-options'] }>Histórico de análises</p>
               </div>
            </div>

         </div>

         { /* footer */ }
         <div className={ styles.footer }>
            <span className={ `${styles.exit} material-symbols-outlined` }>
               logout
            </span>

            <span className={ `${styles.settings} material-symbols-outlined` }>
               settings
            </span>
         </div>
      </div>
   );
};

export default ProjectDashboard;