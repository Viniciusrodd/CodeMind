
// import css
import styles from '@styles/pages/Register.module.css';

// import images
import codemind_img from '@images/codemind.png';


const Register = () => {
   return (
      <div className={ styles['page-container'] }>
         { /* title */ }
         <div className='title-container'>
            <h1 className='codemind-title'>
               CodeMind
            </h1>
            <img className='img-title' src={ codemind_img } alt="codemind.png" />
         </div>

         { /* register */ }
         <div className={ styles['register-container'] }>
            <p>Olá, como devemos te chamar ?</p>
            <input type="text" name="name" title='name' placeholder='Insira seu nome aqui...' />
         </div>

         { /* send */ }
         <button type='button' className={ styles['btt-register'] }>
            ENVIAR
         </button>
      </div>
   );
};

export default Register;