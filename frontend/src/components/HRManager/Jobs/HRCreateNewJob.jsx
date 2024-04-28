import React, { useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import { Link } from 'react-router-dom'
import {
  CitySelect,
  CountrySelect,
  StateSelect
} from "react-country-state-city";
import { createJob, ClearErrors } from '../../../actions/jobAction';
import {useDispatch, useSelector} from 'react-redux';
import "react-country-state-city/dist/react-country-state-city.css";
import './HRCreateNewJob.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const HRCreateNewJob = () => {

  const dispatch = useDispatch()
  const{error} = useSelector((state)=>state.hrJob);

  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [education, setEducation] = useState('Bachelors');
  const [category, setCategory] = useState('Website');
  const [skillLevel, setSkillLevel] = useState('Beginner')
  const [duration, setDuration] = useState('Full Time');
  const [type, setType] = useState('On Site');
  const [salary, setSalary] = useState('');
  const [jobDesc, setJobDesc] = useState('')
  const [countryid, setCountryid] = useState([]);
  const [stateid, setStateid] = useState([]);
  const [Cityid, setCityid] = useState([]);

  const handleJobDescChange = (value) => {
    setJobDesc(value);
  }

  
  const handleJobPost = (event) => {

    event.preventDefault();

    const formData = {
      jobTitle: jobTitle,
      company: company,
      education: education,
      category: category,
      skillLevel: skillLevel,
      duration: duration,
      type: type,
      salary: salary,
      jobDesc: jobDesc,
      country: countryid, 
      state: stateid,
      city: Cityid,
      status: 'active',
    }

    dispatch(createJob(formData))
    toast.success("Job created successfully")
    setJobTitle('')
    setCompany('')
    setSalary()
    setJobDesc('')
    setCountryid([])
    setStateid([])
    setCityid([])
  }
  
  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(ClearErrors());
    }
  }, [dispatch, error])

  return (
    <div className='hrcreatejob'>

      <NavBar />

      <div className='hrcreatejob-container'>

        <div className='hrcreatejob-all-jobs'>
          <Link to='/hr/HrProfile'>All Jobs</Link>
        </div>


        <form className='hrcreatejob-form' onSubmit={handleJobPost}>

          <div className='hrcreatejob-form-wrapper'>
            <div className='hrcreatejob-form-input-type1'>
              <p>Job Title <span>*</span></p>
              <input type='text' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required/>
            </div>

            <div className='hrcreatejob-form-input-type2'>
              <p>Company <span>*</span></p>
              <input type='text' value={company} onChange={(e) => setCompany(e.target.value)} required/>
            </div>

            <div className='hrcreatejob-form-input-type3'>
              <p>Education <span>*</span></p>
              <select value={education} onChange={(e) => setEducation(e.target.value)}>
                <option>Bachelors</option>
                <option>Masters</option>
              </select>
            </div>
          </div>

          <div className='hrcreatejob-form-wrapper'>
            <div className='hrcreatejob-form-input-type3'>
              <p>Category <span>*</span></p>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option>Website</option>
                <option>Apps</option>
                <option>Software</option>
                <option>Development</option>
                <option>Photography</option>
                <option>Music</option>
                <option>Marketing</option>
              </select>
            </div>

            <div className='hrcreatejob-form-input-type3'>
              <p>Skill Level <span>*</span></p>
              <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} required>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>

            <div className='hrcreatejob-form-input-type3'>
              <p>Time <span>*</span></p>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} required>
                <option>Full Time</option>
                <option>Part Time</option>
              </select>
            </div>

            <div className='hrcreatejob-form-input-type3'>
              <p>Type <span>*</span></p>
              <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option>On Site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>

          </div>
          
          <div className='hrcreatejob-form-wrapper'>
            <div className='hrcreatejob-form-input-type4'>
              <p>Country <span>*</span></p>
              <CountrySelect
                onChange={(e) => {
                  setCountryid({id:e.id, name:e.name});
                }}
                placeHolder="Select Country"
                required
              />
            </div>
              
            <div className='hrcreatejob-form-input-type4'>
              <p>State <span>*</span></p>
              <StateSelect
                countryid={countryid.id}
                onChange={(e) => {
                  setStateid({id: e.id, name: e.name});
                }}
                placeHolder="Select State"
                required
              />
            </div>
            <div className='hrcreatejob-form-input-type4'>
              <p>City <span>*</span></p>
              <CitySelect
                countryid={countryid?.id}
                stateid={stateid?.id}
                onChange={(e) => {
                  setCityid({id:e.id, name:e.name});
                }}
                placeHolder="Select City"
                required
              />
            </div>

            <div className='hrcreatejob-form-input-type5'>
              <p>Salary $<span>*</span></p>
              <input type='number' value={salary} onChange={(e) => setSalary(e.target.value)} required/>
            </div>

          </div>

          <div className='hrcreatejob-form-input-desc'>
            <p>Description <span>*</span></p>
            <ReactQuill 
                theme="snow"
                value={jobDesc}
                onChange={handleJobDescChange}
                required
            />
          </div>

          <div className='hrcreatejob-submit'>
            <input type='submit'/>
          </div>

        </form>

      </div>

    </div>
  )
}

export default HRCreateNewJob