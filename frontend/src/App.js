import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoutes from "./components/Utils/ProtectedRoutes";
import Home from "./components/Home/Home";
import AllPublicCourses from './components/Courses/AllPublicCourses'
import Cart from './components/Cart/Cart'
import WishList from "./components/Cart/WishList";
import Auth from "./components/Auth/Auth";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import StudentProfile from "./components/Students/Profile/StudentProfile";
import AllUsers from "./components/Admin/User/AllUsers";
import CreateUser from "./components/Admin/User/CreateUser";
import UpdateUser from "./components/Admin/User/UpdateUser";
import ClassRoom from "./components/Students/ClassRoom/ClassRoom";
import AllCourses from "./components/Admin/Courses/AllCourses";
import CreateCourse from "./components/Admin/Courses/CreateCourse";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import ProfileDetail from "./components/ProfileDetail/ProfileDetail";

// user register form userside
import UserForm from "./components/Admin/User/UserForm";
import EditCourse from "./components/Admin/Courses/EditCourse";
import PublicCourseDetail from "./components/Courses/PublicCourseDetail";
import MakeOrder from "./components/Cart/MakeOrder.jsx/MakeOrder";
import AdminProfile from "./components/Admin/Profile/AdminProfile";
import AllPublicJobs from "./components/Job/Jobs/AllPublicJobs";
import HrProfile from "./components/HRManager/Profile/HrProfile";
import HRCreateNewJob from "./components/HRManager/Jobs/HRCreateNewJob";
import HRUpdateJob from "./components/HRManager/Jobs/HRUpdateJob";
import HRJobsApplications from "./components/HRManager/Jobs/HRJobsApplications";
import JobSeeker from "./components/Job/Profile/JobSeeker";
import Message from "./components/Chat/Message";
import MessageJobSeeker from "./components/Chat/MessageJobSeeker";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/courses" element={<AllPublicCourses/>} />
          <Route path="/courses/course/:slug" element={<PublicCourseDetail/>} />

          <Route path="/Student" element={<ProtectedRoutes />}>
            <Route path="/Student/class/:slug" element={<ClassRoom />} />
            <Route path="/Student/Profile" element={<StudentProfile />} />
            <Route path="/Student/wishList" element={<WishList/>}/>
            <Route path="/Student/Cart" element={<Cart/>}/>
            <Route path="/Student/make-order" element={<MakeOrder/>}/>
          </Route>

          <Route path="/hr" element={<ProtectedRoutes />}>
            <Route path="/hr/HrProfile" element={<HrProfile/>}/> 
            <Route path="/hr/create-job" element={<HRCreateNewJob/>}/>
            <Route path="/hr/update-job/:slug" element={<HRUpdateJob/>}/>
            <Route path="/hr/job-applications/:slug" element={<HRJobsApplications/>}/>
          </Route>

          <Route path="/all-jobs" element={<AllPublicJobs/>}/>
          <Route path="/JobSeeker" element={<ProtectedRoutes />}>
            <Route path="/JobSeeker/JobSeeker-profile" element={<JobSeeker/>}/>
          </Route>

          <Route path="/chat" element={<ProtectedRoutes />}>
            <Route path="/chat/job-chat" element={<Message/>}/>
            <Route path="/chat/job-seeker-chat" element={<MessageJobSeeker/>}/>
          </Route>

          <Route path="/Profile" element={<ProtectedRoutes />}>
            <Route path="/Profile/detail" element={<ProfileDetail />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/all-users" element={<AllUsers />} />
            <Route path="/admin/create-users" element={<CreateUser />} />
            
            <Route path="/admin/update-users/:id" element={<UpdateUser />} />

            <Route path='/admin/all-courses' element={<AllCourses/>}/>
            <Route path='/admin/create-course' element={<CreateCourse />}/>
            <Route path='/admin/edit-course/:slug' element={<EditCourse/>}/>

            <Route path='/admin/profile' element={<AdminProfile/>}/>
          </Route>

          <Route path="/login" element={<Auth />} />
          <Route path="/forget/password" element={<ForgotPassword />} />
          <Route
            path="/reset/password/:token/:id"
            element={<ResetPassword />}
          />

          {/* will shift to admin or other route soon */}
          <Route path="/create/new/user/:token/:id" element={<UserForm />}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
