
// imports
import { useParams } from 'react-router-dom';

// import css
import styles from '@styles/pages/Projects/ProjectDashboard.module.css';

// import images
import analysis_img from '@images/analysis_2.png';


const ProjectDashboard = () => {
   //// variables
   const { projectId } = useParams<string>();


   //// functions


   //// jsx


   return (
      <div className={ styles['page-container'] }>
         { /* dashboard */ }
         <div className={ styles.dashboard }>

            { /* projects sidebar */ }
            <div className={ styles.sidebar }>
               <h2>Projetos</h2>
               <hr />

               <div className={ `${styles['project-list']} scroll` }>
                  <p>Projeto 1</p>
               </div>
               <hr />

               <button type='button'>
                  NOVO PROJETO
               </button>
            </div>

            { /* dashboard */ }
            <div className={ styles.project }>
               <h1 className={ styles.title }>
                  Projeto 1
               </h1>

               <div className={ `${styles.desc} scroll` }>
                  <p>
                     O projeto consiste no desenvolvimento de uma aplicação web open-source 
                     voltada para análise de código fonte utilizando inteligência artificial local, 
                     com apoio de técnicas de RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source 
                     voltada para análise de código fonte utilizando inteligência artificial local, 
                     com apoio de técnicas de RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source 
                     voltada para análise de código fonte utilizando inteligência artificial local, 
                     com apoio de técnicas de RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source 
                     voltada para análise de código fonte utilizando inteligência artificial local, 
                     com apoio de técnicas de RAG (Retrieval-Augmented Generation).
                  </p>
               </div>

               <div className={ styles.logo }>
                  <img src={ analysis_img } alt="analysis_img" />
               </div>

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