import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';


import './App.css';
import Auth from './components/Auth/Auth';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Home />}/>
          
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          
          <Route path="/login" element={<Auth />}/>

        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
