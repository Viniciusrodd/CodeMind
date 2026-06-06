
// import css
import projectInformationsStyles from '@styles/pages/projectDetails/projectInformations.module.css';


const ProjectDocuments = () => {
   return (
      <div className={ projectInformationsStyles['page-container'] }>
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

         { /* footer */ }
         <div className={ projectInformationsStyles.footer }>
            <span 
               className='material-symbols-outlined tooltip' data-tooltip="Voltar"
            >
               Undo
            </span>
         </div>
      </div>
   );
};

export default ProjectDocuments;