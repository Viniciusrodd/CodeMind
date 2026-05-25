
// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import css
import './App.css'

// import pages
import Register from './pages/Register';
import Welcome from '@pages/Welcome';
import ProjectConfig from '@pages/projects/ProjectConfig';
import ProjectDocuments from '@pages/projects/ProjectDocuments';


function App() {
   return (
      <div className='app'>
         <BrowserRouter>
            <Routes>
               <Route path='/' element={ <Register /> } />
               <Route path='/welcome' element={ <Welcome /> } />
               <Route path='/project/config' element={ <ProjectConfig /> } />
               <Route path='/project/config/documents/:projectId' element={ <ProjectDocuments /> } />
            </Routes>
         </BrowserRouter>
      </div>
   );
};


export default App;