/* eslint-disable react-hooks/exhaustive-deps */

// imports
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';

// import DTOs
import type { UserDTOs } from '@DTOs/user.dtos';

// import components
import Modal from '@components/Modal';
import Title from '@components/Title';

// import services
import { userService } from '@services/user.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';

// import css
import styles from '@styles/pages/Register.module.css';

// import images
import loading_img from '@images/loading.png';


const Register = () => {
   //// variables
   const navigate = useNavigate();
   const [ redirect, setRedirect ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ name, setName ] = useState<string>('');
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

   // redirect
   useEffect(() =>{
      if(redirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt_event: false, 
               btt_close: false, display: false
            });

            navigate('/welcome');       
         }, 4000);

         return () =>{
            setLoading(false);
            clearTimeout(clearMessage);
         };
      }
   }, [redirect, navigate]);

   // user check
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

            modal_config({
               title: 'Espere ❕', 
               msg: `Usuário já registrado, \n você será redirecionado...`, 
               btt_event: false, btt_close: false, display: true
            });

            setLoading(false);
            setRedirect(true);
         }
         catch(error){
            console.error('❌ Error at get user: ', error);
            setLoading(false);
         }
      };

      getUser();
   }, []);

   // register
   const handleForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      // data setup
      const data: UserDTOs = { name };

      try{
         const response = await userService.createUser(data);
         if(!response) console.error('⚠️ Unexpected return from API:', response);

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Registro feito com sucesso`, 
            btt_event: false, btt_close: false, display: true
         });

         setLoading(false);
         setRedirect(true);
      }
      catch(error){
         console.error('❌ Error at register: ', error);

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
      <form 
         onSubmit={ handleForm }
         method='post'
         className={ styles['page-container'] }
      >
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt_event={ modal_btt }
            btt_close={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />

         { /* send */ }
         { loading ? (
            <img 
               src={ loading_img } 
               alt="loading_img"
               className='loading_img'    
            />
         ) : (
            <>
            { /* title */ }
            <Title />

            { /* register */ }
            <div className={ styles['register-container'] }>
               <p>Olá, como devemos te chamar ?</p>
               <input 
                  type="text" name="name" title='name' 
                  placeholder='Insira seu nome aqui...' 
                  autoComplete='off'
                  value={ name }
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) }  
               />
            </div>

            <button type='submit' className={ styles['btt-register'] }>
               ENVIAR
            </button>
         
            { /* footer */ }
            <p className='advice'>
               *Este sistema funciona localmente, portanto é permitido apenas 1 usuário por máquina
            </p>
            </>
         ) }

      </form>
   );
};

export default Register;