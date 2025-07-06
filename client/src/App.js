import logo from './logo.svg';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Edit from './Pages/Edit';

function App() {
  return (
    <div>
      
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
