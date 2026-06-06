/* eslint-disable react-hooks/exhaustive-deps */

// import css
import projectInformationsStyles from '@styles/pages/projectDetails/projectInformations.module.css';

// imports
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

// import images
import loading_img from '@images/loading.png';

// import interfaces
import type { iModalConfig } from '@interfaces/modal.interface';
import type { IDocument } from '@interfaces/document.interface';

// import components
import Modal from '@components/Modal';

// import services
import { documentService } from '@services/document.service';

// import contexts
import { loadingContext } from '@contexts/loading/loading.context';


const ProjectDocuments = () => {
   //// variables
   const navigate = useNavigate();
   const { projectId } = useParams();
   const [ redirect, setRedirect ] = useState<boolean>(false);
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const { loading, setLoading } = useContext(loadingContext);
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);


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
   useEffect(() => {
      if(redirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt_event: false, 
               btt_close: false, display: false
            });

            navigate(`/project/dashboard`);       
         }, 4000);

         return () =>{
            setLoading(false);
            clearTimeout(clearMessage);
         };
      }
   }, [navigate, redirect]);




   //// jsx


   return (
      <div className={ projectInformationsStyles['page-container'] }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt_event={ modal_btt }
            btt_close={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />

         { /* informations container */ }
         { loading ? (
            <img 
               src={ loading_img } 
               alt="loading_img"
               className='loading_img'    
            />
         ) : (
            <div className={ projectInformationsStyles['informations-container'] }>
               <h1 className={ projectInformationsStyles.title }>
                  project
               </h1>

               <div className={ projectInformationsStyles.informations }>
                  { /* informations header */ }  
                  <div className={ projectInformationsStyles.header }>
                     <span className='material-symbols-outlined tooltip' data-tooltip="Anterior">
                        arrow_circle_left
                     </span>
                     <h2>
                        documento.code
                     </h2>
                     <span className='material-symbols-outlined tooltip' data-tooltip="Próximo">
                        arrow_circle_right
                     </span>
                  </div>

                  { /* informations scroll */ }
                  <div className={ `${projectInformationsStyles.information} scroll` }>
                     <p>
                        {`
                        class AuthenticationService {
                        constructor(private userRepository: UserRepository) {}

                        async login(email: string, password: string): Promise<AuthResponse> {
                           try {
                              const user = await this.userRepository.findByEmail(email);
                              
                              if (!user) {
                              throw new Error('User not found');
                              }
                              
                              const isValid = await bcrypt.compare(password, user.passwordHash);
                              
                              if (!isValid) {
                              throw new Error('Invalid credentials');
                              }
                              
                              const token = this.generateToken(user.id, user.role);
                              
                              return { 
                              success: true, 
                              token, 
                              user: { 
                                 id: user.id, 
                                 email: user.email, 
                                 role: user.role 
                              } 
                              };
                           } catch (error) {
                              console.error('Login failed:', error);
                              return { success: false, error: error.message };
                           }
                        }

                        private generateToken(userId: string, role: string): string {
                           const payload = { 
                              userId, 
                              role, 
                              exp: Math.floor(Date.now() / 1000) + 3600 
                           };
                           
                           return jwt.sign(payload, process.env.JWT_SECRET);
                        }

                        async validateToken(token: string): Promise<UserPayload | null> {
                           try {
                              const decoded = jwt.verify(token, process.env.JWT_SECRET);
                              return decoded as UserPayload;
                           } catch (error) {
                              return null;
                           }
                        }
                        }

                        export default AuthenticationService;
                        `}
                     </p>
                  </div>
               </div>
            </div>
         ) }

         { /* footer */ }
         { loading === false && (
            <div className={ projectInformationsStyles.footer }>
               <span 
                  className='material-symbols-outlined tooltip' data-tooltip="Voltar"
               >
                  Undo
               </span>
            </div>
         ) }
      </div>
   );
};

export default ProjectDocuments;