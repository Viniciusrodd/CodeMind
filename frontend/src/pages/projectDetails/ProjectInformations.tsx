
// import css
import styles from '@styles/pages/projectDetails/projectInformations.module.css';

// imports
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const ProjectInformations = () => {
   //// variables
   const navigate = useNavigate();
   const { projectId } = useParams();
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const informationsOptions: string[] = [
      'Descrição', 'Tipo de aplicação', 'Linguagens', 
      'Frameworks/Bibliotecas', 'Propósito', 'Ambiente de execução'
   ];


   //// functions


   // go prev
   const goPrev = () => {
      if(currentIndex > 0) setCurrentIndex(prev => prev - 1);
   };

   // go next
   const goNext = () => {
      if(currentIndex < informationsOptions.length - 1) setCurrentIndex(prev => prev + 1);
   };


   //// jsx


   return (
      <div className={ styles['page-container'] }>
         
         { /* informations container */ }
         <div className={ styles['informations-container'] }>
            <h1 className={ styles.title }>
               Projeto
            </h1>

            <div className={ styles.informations }>
               <div className={ styles.header }>
                  <span className='material-symbols-outlined tooltip' data-tooltip="Anterior" onClick={ goPrev }>
                     arrow_circle_left
                  </span>
                  <h2>
                     { informationsOptions[currentIndex] }
                  </h2>
                  <span className='material-symbols-outlined tooltip' data-tooltip="Próximo" onClick={ goNext }>
                     arrow_circle_right
                  </span>
               </div>

               <div className={ `${styles.information} scroll` }>
                  <p>
                     O projeto consiste no desenvolvimento de uma aplicação web open-source voltada para análise 
                     de código fonte utilizando inteligência artificial local, com apoio de técnicas de 
                     RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source voltada para análise 
                     de código fonte utilizando inteligência artificial local, com apoio de técnicas de 
                     RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source voltada para análise 
                     de código fonte utilizando inteligência artificial local, com apoio de técnicas de 
                     RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source voltada para análise 
                     de código fonte utilizando inteligência artificial local, com apoio de técnicas de 
                     RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source voltada para análise 
                     de código fonte utilizando inteligência artificial local, com apoio de técnicas de 
                     RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source voltada para análise 
                     de código fonte utilizando inteligência artificial local, com apoio de técnicas de 
                     RAG (Retrieval-Augmented Generation).

                     O projeto consiste no desenvolvimento de uma aplicação web open-source voltada para análise 
                     de código fonte utilizando inteligência artificial local, com apoio de técnicas de 
                     RAG (Retrieval-Augmented Generation). aaa
                  </p>
               </div>
            </div>
         </div>

         { /* informations container */ }
         <div className={ styles.footer }>
            <span 
               className='material-symbols-outlined tooltip' data-tooltip="Voltar" 
               onClick={ () => navigate(`/project/${projectId}`) }
            >
               Undo
            </span>
         </div>

      </div>
   );
};

export default ProjectInformations;