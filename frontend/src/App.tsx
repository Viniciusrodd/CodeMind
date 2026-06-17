
// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import css
import './App.css'

// import images
import loading_img from '@images/loading.png';

// import initial pages
const Register = lazy(() => import('@pages/Register'));
const Welcome = lazy(() => import('@pages/Welcome'));

// import project pages
const ProjectConfig = lazy(() => import('@pages/projects/ProjectConfig'));
const ProjectConfigDocuments = lazy(() => import('@pages/projects/ProjectConfigDocuments'));
const ProjectDashboard = lazy(() => import('@pages/projects/ProjectDashboard'));
const ProjectAnalysis = lazy(() => import('@pages/projects/ProjectAnalysis'));
const AnalysisResult = lazy(() => import('@pages/projects/AnalysisResult'));

// import project details pages
const ProjectInformations = lazy(() => import('@pages/projectDetails/ProjectInformations'));
const ProjectDocuments = lazy(() => import('@pages/projectDetails/ProjectDocuments'));
const ProjectEdit = lazy(() => import('@pages/projectDetails/ProjectEdit'));
const AnalysisHistoric = lazy(() => import('@pages/projectDetails/AnalysisHistoric'));

// import notFound page
const NotFound = lazy(() => import('@pages/NotFound'));


function App() {
   return (
      <div className='app'>
         <BrowserRouter>
            <Suspense
               fallback={
                  <div className='loading_container'>
                     <img
                        src={loading_img}
                        alt="loading"
                        className='loading_img'
                     />
                  </div>
               }
            >
               <Routes>
                  { /* initial pages */ }
                  <Route path='/' element={ <Register /> } />
                  <Route path='/welcome' element={ <Welcome /> } />

                  { /* project pages */ }
                  <Route path='/project/config' element={ <ProjectConfig /> } />
                  <Route path='/project/config/documents/:projectId' element={ <ProjectConfigDocuments /> } />
                  <Route path='/project/dashboard' element={ <ProjectDashboard /> } />
                  <Route path='/project/analysis/:projectId' element={ <ProjectAnalysis /> } />
                  <Route path='/analysis/result/:analysisId' element={ <AnalysisResult /> } />

                  { /* project details pages */ }
                  <Route path='/project/informations/:projectId' element={ <ProjectInformations /> } />
                  <Route path='/project/documents/:projectId' element={ <ProjectDocuments /> } />
                  <Route path='/project/edit/:projectId' element={ <ProjectEdit /> } />
                  <Route path='/analysis/historic/:projectId' element={ <AnalysisHistoric /> } />

                  { /* NotFound page */ }
                  <Route path='*' element={ <NotFound /> } />
               </Routes>
            </Suspense>
         </BrowserRouter>
      </div>
   );
};


export default App;