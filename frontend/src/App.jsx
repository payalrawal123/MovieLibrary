import {Link, Route, Routes} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Favriote from './pages/favriote';

function App() {
  

  return (
    <>
   <div>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/favriote'>Favriote</Link>
      <input type="text" placeholder='searce' />
    </nav>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/favriote' element={<Favriote/>}/>
    </Routes>
   </div>
    </>
     
  )
}

export default App
