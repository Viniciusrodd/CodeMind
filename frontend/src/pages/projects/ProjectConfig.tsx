/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

// import css
import styles from '@styles/pages/projectDetails/ProjectConfig.module.css';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';
import type { contextType } from '@interfaces/project.interface';

// import DTOs
import type { CreateProjectDTO } from '@DTOs/project.dtos';

// import components
import Modal from '@components/Modal';

// import services
import { userService } from '@services/user.service';
import { projectService } from '@services/project.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';

// import images
import project_img from '@images/project.png';
import loading_img from '@images/loading.png';


const ProjectConfig = () => {
   //// variables
   const navigate = useNavigate();
   const [ redirect, setRedirect ] = useState<boolean>(false);
   const [ isConfigurated, setIsConfigurated ] = useState<boolean>(false);
   const [ projectId, setProjectId ] = useState<string>('');
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const [ name, setName ] = useState<string>('');
   const [ description, setDescription ] = useState<string>('');
   const [ type, setType ] = useState<contextType>('backend');
   const [ dataList, setDataList ] = useState({
      languagesInput: '',
      frameworksInput: '',
      languages: [] as string[],
      frameworks: [] as string[]
   });
   const [ purpose, setPurpose ] = useState<string>('');
   const [ environment, setEnvironment ] = useState<string>('');


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

      if(isConfigurated){
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
   }, [redirect, isConfigurated, navigate]);

   // check user
   useEffect(() => {
      const checkUser = async () => {
         setLoading(true);

         try{
            const response = await userService.getUser();
            if(!response) throw new Error('Usuário não encontrado');

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
            setRedirect(true);
         }
      }

      checkUser();
   }, []);

   // array fields treatment
   const treatment = (e: React.ChangeEvent<HTMLInputElement>, field: 'languages' | 'frameworks') => {
      const rawValue = e.target.value;

      setDataList(prev => ({
         ...prev,
         [`${field}Input`]: rawValue,
         [field]: rawValue.split(',').map(item => item.trim()).filter(item => item !== '')
      }));
   };

   // create project
   const handleForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      // data setup
      const data: CreateProjectDTO = {
         name,
         description,
         context: {
            type,
            languages: dataList.languages,
            frameworks: dataList.frameworks,
            purpose,
            environment
         }
      };

      try{
         const response = await projectService.createProject(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
            setLoading(false);

            return;
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Projeto configurado com sucesso`, 
            btt_event: false, btt_close: false, display: true
         });

         setProjectId(response._id);

         setLoading(false);
         setIsConfigurated(true);
      }
      catch(error){
         console.error('❌ Error at project configuration: ', error);

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

         { /* project logo  */ }
         <div className={ styles.img }>
            <img 
               src={ project_img } 
               alt="project_img"
               className='project_img'    
            />
         </div>

         { /* form-container */ }
         <div className={ styles['form-container'] }>
            <h1>Nos informe sobre o seu projeto</h1>

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
                  value={ name }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) }  
               />

               <input 
                  type="text" name="description" title='Descrição do projeto' 
                  placeholder='Descrição do projeto' 
                  autoComplete='off'
                  maxLength={ 3000 }
                  value={ description }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value) }
               />

               <select 
                  name="type" 
                  title='Tipo de aplicação'
                  value={ type }
                  onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as contextType) }
               >
                  <option value="backend">Backend</option>
                  <option value="frontend">Frontend</option>
                  <option value="fullstack">FullStack</option>
               </select>

               <input 
                  type="text" name="languages" title='Linguagens usadas no projeto' 
                  placeholder='Linguagens usadas no projeto (ex: Java, JavaScript, C#, etc...)' 
                  autoComplete='off'
                  value={ dataList.languagesInput }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => treatment(e,'languages') }
               />

               <input 
                  type="text" name="frameworks" title='Frameworks ou Bibliotecas' 
                  placeholder='Frameworks ou Bibliotecas (ex: SpringBoot, Express, .NET, etc...)' 
                  autoComplete='off'
                  value={ dataList.frameworksInput }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => treatment(e,'frameworks') }
               />

               <input 
                  type="text" name="purpose" title='Propósito do projeto' 
                  placeholder='Propósito do projeto (ex: "API de gerenciamento de projetos")' 
                  autoComplete='off'
                  maxLength={ 3000 }
                  value={ purpose }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setPurpose(e.target.value) }
               />

               <input 
                  type="text" name="environment" title='Ambiente de execução' 
                  placeholder='Ambiente de execução (ex: Desenvolvimento, Produção, etc...)' 
                  autoComplete='off'
                  maxLength={ 3000 }
                  value={ environment }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setEnvironment(e.target.value) }
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
               className={ styles.btt }
            >
               ENVIAR CONTEXTO
            </button>            
         ) }

         { /* footer */ }
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

export default ProjectConfig;