import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import {Container } from 'react-bootstrap'
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';


function App() {
  return (
    <Container className="App">
     <Router>
       <Routes>
         <Route path="/" element={<Registration/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/home" element={<Home/>}/>
       </Routes>
     </Router>
    </Container>
  );
}

export default App;
