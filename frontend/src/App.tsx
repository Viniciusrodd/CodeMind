
// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import css
import './App.css'

// import pages
import Register from './pages/Register';
import Welcome from '@pages/Welcome';
import ProjectConfig from '@pages/projects/ProjectConfig';
import ProjectDocuments from '@pages/projects/ProjectDocuments';
import ProjectDashboard from '@pages/projects/ProjectDashboard';
import ProjectInformations from '@pages/projectDetails/ProjectInformations';


function App() {
   return (
      <div className='app'>
         <BrowserRouter>
            <Routes>
               { /* initial pages */ }
               <Route path='/' element={ <Register /> } />
               <Route path='/welcome' element={ <Welcome /> } />

               { /* project pages */ }
               <Route path='/project/config' element={ <ProjectConfig /> } />
               <Route path='/project/config/documents/:projectId' element={ <ProjectDocuments /> } />
               <Route path='/project/:projectId' element={ <ProjectDashboard /> } />

               { /* project details pages */ }
               <Route path='/project/informations/:projectId' element={ <ProjectInformations /> } />
            </Routes>
         </BrowserRouter>
      </div>
   );
};


export default App;