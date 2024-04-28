import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import './AdminDashboard.css'
import NavBar from '../NavBar/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import {getDashboardAnalytics, clearErrors } from '../../../actions/AnalyticsAction'
import { toast } from 'react-toastify';
import CourseRevenueAnalytics from '../../../Charts/CourseRevenueAnalytics'
import Loader from '../../Utils/Loader'
import IncomeByMonthChart from '../../../Charts/IncomeByMonthChart'
import CoursesViewsAnalytics from '../../../Charts/CoursesViewsAnalytics'

const AdminDashboard = () => {

  const dispatch = useDispatch()
  const {analytics, error, loading} = useSelector((state)=>state.dashboardAnalytics)
  const {user} = useSelector((state)=>state.user)

  const [courseRevenue, setCourseRevenue] = useState([])
  const [viewsByCourse, setViewsByCourse] = useState([])
  const [incomeByMonth, setIncomeByMonth] = useState([])
  const [totalStudents, setTotalStudents] = useState();
  const [total_Income, setTotal_Income] = useState();
  const [gst, setGst] = useState();

  useEffect(() => {

    if(error){
        toast.error(error);
        dispatch(clearErrors());
    }
    dispatch(getDashboardAnalytics());
  }, [dispatch, error])

  useEffect(() => {
    setCourseRevenue(analytics?.sortedCoursesByRevenue)
    setViewsByCourse(analytics?.viewsByCourse)
    setIncomeByMonth(analytics?.incomeByMonth)
    setTotalStudents(analytics?.studentCount)
    setTotal_Income(analytics?.totalIncome)
    setGst(analytics?.totalgst)
  }, [analytics]);


  return (
    <div className='admin-container'>

      <div className='admin-dashboard-sidebar'>
        <SideBar/>
      </div>

      <div className='admin-wrapper'>
        <NavBar/>

       {loading ? <Loader/>  : (
        <>
          {user?.role === 'admin' ? (
            <div className='admin-dashboard-charts'>

              <div className='admin-dashboard-top-box'>
                
                <div>
                  <p>Students</p>
                  <span>{totalStudents}</span>
                </div>
                <div>
                  <p>Total Sales</p>
                  <span>${total_Income}</span>
                </div>
                <div>
                  <p>GST</p>
                  <span>${gst}</span>
                </div>
                <div>
                  <p>Profit</p>
                  <span>${total_Income - gst}</span>
                </div>

              </div>

              <div className='admin-dashboard-charts-wrapper-1'>
                <div className='admin-dashboard-charts-CourseRevenueAnalytics'>
                  <CourseRevenueAnalytics courseRevenue={courseRevenue}/>
                </div>

                <div className='admin-dashboard-charts-IncomeByMonthChart'>
                  <IncomeByMonthChart incomeByMonth={incomeByMonth}/>
                </div>
              </div>
              

              <div className='admin-dashboard-charts-CoursesViewsAnalytics'>
                  <CoursesViewsAnalytics viewsByCourse={viewsByCourse}/>
              </div>


            </div>
          ): (
            <p className='not-allowd-heading'>You are Not Allowed</p>
          )}
          </>
       )}

      </div>
    </div>
  )
}

export default AdminDashboard