
// imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import css
import './App.css'

// import pages
import Register from './pages/Register';


function App() {
   return (
      <div className='app'>
         <BrowserRouter>
            <Routes>
               <Route path='/' element={ <Register /> } />
            </Routes>
         </BrowserRouter>
      </div>
   );
};


export default App;