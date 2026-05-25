
// import css
import styles from '@styles/pages/Projects/ProjectDocuments.module.css';

// import images
import folder_img from '@images/folder.png';


const ProjectDocuments = () => {
   return (
      <div className={ styles['page-container'] }>
         { /* title */ }
         <h1>Deseja adicionar algum documento relevante para o projeto ?</h1>

         { /* logo */ }
         <div className={ styles['logo-container'] }>
            <img src={ folder_img } alt="folder_img" />
         </div>

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