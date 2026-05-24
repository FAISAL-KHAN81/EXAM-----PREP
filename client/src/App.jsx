import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import Session from './pages/admin/Session.jsx'
import Subject from './pages/admin/Subject.jsx'
import Examination from './pages/admin/Examination.jsx'
import QuestionBank from './pages/admin/Question.jsx'
import UserDashboard from './pages/user/UserDashboard.jsx'
import Myexams from './pages/user/Myexams.jsx'
import Myresults from './pages/user/Myresults.jsx'
import Getexams from './pages/user/Getexams.jsx'
import Message from './pages/user/Message.jsx'
import DashboardHome from './pages/user/DashboardHome.jsx'
import ChangePassword from './pages/user/ChangePassword.jsx'
import AdminDashboardHome from './pages/admin/AdminDashboardHome.jsx'
import Examinee from './pages/admin/Examinee.jsx'
import ReportGeneration from './pages/admin/ReportGeneration.jsx'
import AdminChangePassword from './pages/admin/AdminChangePassword.jsx'
import MessageReply from './pages/admin/MessageReply.jsx'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

        <Route path='/adminlogin' element={<AdminLogin />}></Route>

        <Route path='/admindashboard' element={<AdminDashboard />}>
        <Route index element={<AdminDashboardHome />}></Route>
        <Route path='session' element={<Session />}></Route>
        <Route path='subject' element={<Subject />}></Route>
        <Route path='examinee' element={<Examinee />}></Route>
        <Route path='examination' element={<Examination />}></Route>
        <Route path='question' element={<QuestionBank />}></Route>
        <Route path='reportGeneration' element={<ReportGeneration />}></Route>
        <Route path='changepassword' element={<AdminChangePassword />}></Route>
        <Route path='messagereply' element={<MessageReply />}></Route>

        </Route>


        {/* User Route Start  */}
        <Route path='/userdashboard' element={<UserDashboard/>}>
        <Route index element={<DashboardHome />}></Route>
          <Route path='myexams' element={<Myexams />}></Route>
          <Route path='myresults' element={<Myresults />}></Route>
          <Route path='getexam/:id' element={<Getexams />}></Route>
          {/* <Route path='myresults' element={<Myresults />}></Route> */}
          <Route path='message' element={<Message />}></Route>
          <Route path='changepassword' element={<ChangePassword />}></Route>



        </Route>

        {/* User Route End  */}


      </Routes>
    </Router>
    </>
  )
}

export default App

