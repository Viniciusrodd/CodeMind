
// imports
import { useParams } from 'react-router-dom';

// import css
import styles from '@styles/pages/Projects/ProjectDashboard.module.css';


const ProjectDashboard = () => {
   //// variables
   const { projectId } = useParams<string>();


   //// functions
   

   //// jsx


   return (
      <div>
         <p className={ styles.p }>project dashboard - { projectId }</p>         
      </div>
   );
};

export default ProjectDashboard;