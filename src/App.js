
import './App.css';
import View from './Pages/View';
import Error from './Pages/Error';
import Contact from './Pages/Contact';
// import ContactList from './Component/ContactList';
// import Add from './Component/Add';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {

  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<View />} />
            <Route path="/contact-list/:id" element={<Contact />} />
            <Route path ="*" element={<Error/>}/>
      

      </Routes>
    </Router>
  );
}

export default App;
