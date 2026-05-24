
// import images
import codemind_img from '@images/codemind.png';


const Title = () => {
   return (
      <div className='title-container'>
         <h1 className='codemind-title'>
            CodeMind
         </h1>
         <img className='img-title' src={ codemind_img } alt="codemind.png" />
      </div>
   );
};

export default Title;