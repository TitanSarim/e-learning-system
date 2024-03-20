import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ProtectedRoutes from './components/Utils/ProtectedRoutes'

import './App.css';
import Auth from './components/Auth/Auth';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import StudentProfile from './components/Students/Profile/StudentProfile';
import AllUsers from './components/Admin/User/AllUsers';
import CreateUser from './components/Admin/User/CreateUser';
import UpdateUser from './components/Admin/User/UpdateUser';
import ClassRoom from './components/Students/ClassRoom/ClassRoom';
import AllCourses from './components/Admin/Courses/AllCourses';
import CreateCourse from './components/Admin/Courses/CreateCourse';
import ProfileDetail from './components/ProfileDetail/ProfileDetail';

function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Home />}/>
          
          <Route path="/Student" element={<ProtectedRoutes />}>
            <Route path="/Student/Profile" element={<StudentProfile/>}/>
          </Route>

          <Route path='/Profile' element={<ProtectedRoutes/>}>
            <Route path="/Profile/detail" element={<ProfileDetail/>}/>
          </Route>

          <Route path="/admin" element={<ProtectedRoutes />}>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin/all-users' element={<AllUsers/>}/>
            <Route path='/admin/create-users' element={<CreateUser/>}/>
            <Route path='/admin/update-users/:id' element={<UpdateUser />} />

            <Route path='/admin/all-courses' element={<AllCourses/>}/>
            <Route path='/admin/create-course' element={<CreateCourse />}/>
          </Route>

          
          <Route path="/login" element={<Auth />}/>
          
          {/* Route Path is Temporary */}
          <Route path="/class" element={<ClassRoom />}/> 

        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
