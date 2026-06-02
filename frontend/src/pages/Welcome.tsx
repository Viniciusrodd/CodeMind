/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

// import css
import styles from '@styles/pages/Welcome.module.css';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';

// import components
import Title from '@components/Title';
import Modal from '@components/Modal';

// import services
import { userService } from '@services/user.service';
import { projectService } from '@services/project.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';

// import images
import loading_img from '@images/loading.png';


const Welcome = () => {
   //// variables
   const navigate = useNavigate();
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ name, setName ] = useState<string>('');
   const [ hasProject, setHasProject ] = useState<boolean>(false);
   const [ projectId, setProjectId ] = useState<string>('');
   const { loading, setLoading } = useContext(loadingContext);


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

   // get user name
   useEffect(() => {
      const getUser = async () => {
         setLoading(true);
         
         try{
            const response = await userService.getUser();
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
               setLoading(false);

               return;
            }

            setName(response.name);

            setLoading(false);
         }
         catch(error){
            console.error('❌ Error at get user: ', error);
            setLoading(false);
         }
      };

      getUser();
   }, []);

   // user projects check
   useEffect(() => {
      if(name !== ''){
         const checkProjects = async () => {
            setLoading(true);

            try{
               const response = await projectService.getAllProject();
               if(!response){
                  console.error('⚠️ Unexpected return from API:', response);
                  setLoading(false);

                  return;
               }

               if(response.length > 0){
                  setHasProject(true);
                  setProjectId(response[0]._id);
               };

               setLoading(false);
            }
            catch(error){
               console.error('❌ Error at check projects: ', error);
               setLoading(false);
            }
         }

         checkProjects();
      }
   }, [name, setName]);

   // redirect
   const redirect = () => {
      if(hasProject){
         navigate(`/project/${projectId}`);
      }else{
         navigate('/project/config');
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

         { /* welcome */ }
         { loading ? (
            <img 
               src={ loading_img } 
               alt="loading_img"
               className='loading_img'    
            />
         ) : (
            <>
            {/* title */}
            <Title />
            
            <p className={ styles.welcome }>
               { name }, seu analisador de códigos já está no ar 🚀
            </p>
            
            { /* send */ }
            { hasProject ? (
               <button type='button' className={ styles.welcome_btt } onClick={ redirect }>
                  VISITAR MEUS PROJETOS
               </button>
            ) : (
               <button type='button' className={ styles.welcome_btt } onClick={ redirect }>
                  CRIAR MEU PRIMEIRO PROJETO
               </button>
            ) }
            </>
         ) }

      </div>
   );
};

export default Welcome;