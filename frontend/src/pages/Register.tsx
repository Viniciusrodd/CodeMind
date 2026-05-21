
// import css
import styles from '@styles/pages/Register.module.css';

// import images
import codemind_img from '@images/codemind.png';


const Register = () => {
   return (
      <div className={ styles.container }>
         <div className='title-container'>
            <h1 className='codemind-title'>
               CodeMind
            </h1>
            <img className='img-title' src={ codemind_img } alt="codemind.png" />
         </div>
      </div>
   );
};

export default Register;