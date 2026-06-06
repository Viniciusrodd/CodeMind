
// import css
import projectConfigStyles from '@styles/pages/Projects/ProjectConfig.module.css';

// import images
import project_img from '@images/project.png';


const ProjectEdit = () => {
   return (
      <div className={ projectConfigStyles['page-container'] }>
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
               id="project-form"
               className='scroll'
            >
               <input 
                  type="text" name="name" title='Nome do projeto' 
                  placeholder='Nome do projeto' 
                  autoComplete='off' 
               />

               <input 
                  type="text" name="description" title='Descrição do projeto' 
                  placeholder='Descrição do projeto' 
                  autoComplete='off'
                  maxLength={ 3000 }
               />

               <select 
                  name="type" 
                  title='Tipo de aplicação'
               >
                  <option value="backend">Backend</option>
                  <option value="frontend">Frontend</option>
                  <option value="fullstack">FullStack</option>
               </select>

               <input 
                  type="text" name="languages" title='Linguagens usadas no projeto' 
                  placeholder='Linguagens usadas no projeto (ex: Java, JavaScript, C#, etc...)' 
                  autoComplete='off'
               />

               <input 
                  type="text" name="frameworks" title='Frameworks ou Bibliotecas' 
                  placeholder='Frameworks ou Bibliotecas (ex: SpringBoot, Express, .NET, etc...)' 
                  autoComplete='off'
               />

               <input 
                  type="text" name="purpose" title='Propósito do projeto' 
                  placeholder='Propósito do projeto (ex: "API de gerenciamento de projetos")' 
                  autoComplete='off'
                  maxLength={ 3000 }
               />

               <input 
                  type="text" name="environment" title='Ambiente de execução' 
                  placeholder='Ambiente de execução (ex: Desenvolvimento, Produção, etc...)' 
                  autoComplete='off'
                  maxLength={ 3000 }
               />
            </form>
         </div>

         { /* send */ }
         <button 
            form='project-form'
            type='submit' 
            className={ projectConfigStyles.btt }
         >
            EDITAR CONTEXTO
         </button>  
      </div>
   );
};

export default ProjectEdit;