
// imports
import type React from 'react';

// import css
import styles from '@styles/components/Modal.module.css';

// import interfaces
import type { iModal } from '@interfaces/modal.interface';


const Modal: React.FC<iModal> = ({ title, msg, btt_event, btt_close, display, modalEvent, onClose }) => {
   return (
      <div className={ display ? styles.modal : styles.hidden }>
         <div className={ styles.modal_content }>
            <h2 className={styles.h2_modal }>
               { title }
            </h2>
            <p className={ styles.p_modal }>
               { msg }                
            </p>
            {
               btt_event && (
                  <button onClick={ modalEvent } type='button' className={ styles.modal_button }>
                     { btt_event }
                  </button>
               )
            }
            {
               btt_close && (
                  <button onClick={ onClose } type='button' className={ styles.close_modal_button }>
                     { btt_close }
                  </button>
               )
            }
         </div>
      </div>
   );
};

export default Modal;