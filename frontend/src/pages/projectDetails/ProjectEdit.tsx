/* eslint-disable react-hooks/exhaustive-deps */

// imports
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import css
import projectConfigStyles from '@styles/pages/Projects/ProjectConfig.module.css';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';
import type { contextType, IContextUpdate } from '@interfaces/project.interface';

// import DTOs
import type { UpdateProjectDTO } from '@DTOs/project.dtos';

// import components
import Modal from '@components/Modal';

// import services
import { projectService } from '@services/project.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';

// import images
import project_img from '@images/project.png';
import loading_img from '@images/loading.png';


const ProjectEdit = () => {
   //// variables
   const navigate = useNavigate();
   const { projectId } = useParams<string>();
   const [ redirect, setRedirect ] = useState<boolean>(false);
   const [ isUpdated, setIsUpdated ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const [ projectData, setProjectData ] = useState<UpdateProjectDTO>({
      name: '',
      description: '',
      context: {
         type: '' as contextType,
         languages: [] as string[],
         frameworks: [] as string[],
         purpose: '',
         environment: ''
      }
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
      if(redirect){
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

      if(isUpdated){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt_event: false, 
               btt_close: false, display: false
            });

            navigate(`/project/config/documents/${projectId}`);       
         }, 4000);

         return () =>{
            setLoading(false);
            clearTimeout(clearMessage);
         };
      }
   }, [redirect, isUpdated, navigate]);

   // check project
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

            setProjectData(response);

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

      checkProject();
   }, [projectId]);

   // handle form fields
   const handleFields = {
      // change simple fields
      handleFieldChange: (field: keyof UpdateProjectDTO, value: string) => {
         setProjectData(prev => ({
            ...prev,
            [field]: value
         }));
      },

      // change context fields
      handleContextChange: (field: keyof IContextUpdate, value: string | string[]) => {
         setProjectData(prev => ({
            ...prev,
            context: {
               ...prev.context,
               [field]: value
            }
         }));
      },

      // array fields treatment
      handleArrayChange: (field: 'languages' | 'frameworks', value: string) => {
         const arrayValue = value.split(',').map(item => item.trim()).filter(item => item !== '');

         setProjectData(prev => ({
            ...prev,
            context: {
               ...prev.context,
               [field]: arrayValue
            }
         }));
      }
   };

   // edit project
   const handleForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try{
         const response = await projectService.updateProject(projectId!, projectData);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
            setLoading(false);

            return;
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Projeto editado com sucesso`, 
            btt_event: false, btt_close: false, display: true
         });

         setLoading(false);
         setIsUpdated(true);
      }
      catch(error){
         console.error('❌ Error at project update: ', error);

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
      <div className={ projectConfigStyles['page-container'] }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt_event={ modal_btt }
            btt_close={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />

         { /* project logo  */ }
         <div className={ projectConfigStyles.img }>
            <img 
               src={ project_img } 
               alt="project_img"
               className='project_img'    
            />
         </div>

         { /* form-container */ }
         <div className={ projectConfigStyles['form-container'] }>
            <h1>Edite seu projeto</h1>

            { /* form */ }
            <form 
               method="post" 
               onSubmit={ handleForm }
               id="project-form"
               className='scroll'
            >
               <input 
                  type="text" name="name" title='Nome do projeto' 
                  placeholder='Nome do projeto' 
                  autoComplete='off' 
                  value={ projectData?.name ?? '' }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleFields.handleFieldChange('name', e.target.value) }  
               />

               <input 
                  type="text" name="description" title='Descrição do projeto' 
                  placeholder='Descrição do projeto' 
                  autoComplete='off'
                  maxLength={ 3000 }
                  value={ projectData?.description ?? '' }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleFields.handleFieldChange('description', e.target.value) }
               />

               <select 
                  name="type" 
                  title='Tipo de aplicação'
                  value={ projectData?.context?.type ?? 'backend' }
                  onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => handleFields.handleContextChange('type', e.target.value as contextType) }
               >
                  <option value="backend">Backend</option>
                  <option value="frontend">Frontend</option>
                  <option value="fullstack">FullStack</option>
               </select>

               <input 
                  type="text" name="languages" title='Linguagens usadas no projeto' 
                  placeholder='Linguagens usadas no projeto (ex: Java, JavaScript, C#, etc...)' 
                  autoComplete='off'
                  value={ projectData.context?.languages?.join(', ') ?? '' }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleFields.handleArrayChange('languages', e.target.value) }
               />

               <input 
                  type="text" name="frameworks" title='Frameworks ou Bibliotecas' 
                  placeholder='Frameworks ou Bibliotecas (ex: SpringBoot, Express, .NET, etc...)' 
                  autoComplete='off'
                  value={ projectData.context?.frameworks?.join(', ') ?? '' }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleFields.handleArrayChange('frameworks', e.target.value) }
               />

               <input 
                  type="text" name="purpose" title='Propósito do projeto' 
                  placeholder='Propósito do projeto (ex: "API de gerenciamento de projetos")' 
                  autoComplete='off'
                  maxLength={ 3000 }
                  value={ projectData?.context?.purpose ?? '' }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleFields.handleContextChange('purpose', e.target.value) }
               />

               <input 
                  type="text" name="environment" title='Ambiente de execução' 
                  placeholder='Ambiente de execução (ex: Desenvolvimento, Produção, etc...)' 
                  autoComplete='off'
                  maxLength={ 3000 }
                  value={ projectData?.context?.environment ?? '' }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleFields.handleContextChange('environment', e.target.value) }
               />
            </form>
         </div>

         { /* send */ }
         { loading ? (
            <img 
               src={ loading_img } 
               alt="loading_img"
               className='loading_img'    
            />
         ) : (
            <button 
               form='project-form'
               type='submit' 
               className={ projectConfigStyles.btt }
            >
               EDITAR CONTEXTO
            </button>  
         ) }
      </div>
   );
};

export default ProjectEdit;