import React from 'react'
import { LuMinusSquare } from 'react-icons/lu';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const ProfileTabsExperience = ({handleSubmit, setskillsContainers, skillsContainers}) => {


  const addExperienceContainer = () => {
    const newContainer = {
      id: Date.now(),
      CompanyName: '',
      location: '',
      JobTitle: '',
      desc: '',
      fromDate: null,
      toDate: null
    };
    setskillsContainers([...skillsContainers, newContainer]);
  };

  const removeSkillContainer = (id) => {
    if (skillsContainers.length > 1) {
      setskillsContainers(skillsContainers.filter(container => container.id !== id));
    }
  };
  
  const handleCompanyNameChange = (id, newName) => {
    setskillsContainers(skillsContainers.map(container => 
      container.id === id ? { ...container, CompanyName: newName } : container
    ));
  };

  const handleLocationNameChange = (id, newName) => {
    setskillsContainers(skillsContainers.map(container => 
      container.id === id ? { ...container, location: newName } : container
    ));
  };

  const handleJobNameChange = (id, newName) => {
    setskillsContainers(skillsContainers.map(container => 
      container.id === id ? { ...container, JobTitle: newName } : container
    ));
  };

  const handledesceChange = (id, newContent) => {
    setskillsContainers(skillsContainers.map(container => 
      container.id === id ? { ...container, desc: newContent } : container
    ));
  };

  const handleFromDateChange = (id, newValue) => {
    setskillsContainers(skillsContainers.map(container => 
      container.id === id ? { ...container, fromDate: newValue } : container
    ));
  };

  const handleToDateChange = (id, newValue) => {
    setskillsContainers(skillsContainers.map(container => 
      container.id === id ? { ...container, toDate: newValue } : container
    ));
  };


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 210,
      backgroundColor: '#1B1D29',
      border: state.isFocused ? 'none' : 'none',
      outline: "none",
      borderRadius: 7, 
      cursour: "pointer"
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'white', 
      }),  
      placeholder: (provided) => ({
        ...provided,
        color: 'rgb(163, 163, 163)', 
      }),
    };


  return (
    <div className='general-profile-detail-tabs-about-experience'>

      <button onClick={addExperienceContainer}>Add More</button>

      <form onSubmit={handleSubmit}>

        <div className='general-profile-detail-tabs-about-experience-wrapper'>
          {skillsContainers.map(container => (

            <div className='general-profile-detail-tabs-about-experience-container'>

                <div className='general-profile-detail-tabs-about-experience-inputs'>
                    <div>
                      <p>Company Name</p>
                        <input type="text" value={container.universityName} onChange={(e) => handleCompanyNameChange(container.id, e.target.value)} required/>
                    </div>
                    <div>
                      <p>Location</p>
                        <input type="text" value={container.location} onChange={(e) => handleLocationNameChange(container.id, e.target.value)} required/>
                    </div>
                    <div>
                      <p>Job Title</p>
                        <input type="text" value={container.JobTitle} onChange={(e) => handleJobNameChange(container.id, e.target.value)} required/>
                    </div>
                    <button onClick={() => removeSkillContainer(container.id)}><LuMinusSquare size={24}/></button>
                </div>

                <div className='general-profile-detail-tabs-about-experience-text-editor'>
                  <p>Job Description</p>
                  <ReactQuill 
                      theme="snow"
                      value={container?.desc}
                      onChange={(newContent) => handledesceChange(container.id, newContent)}
                  />
                </div>

                <div className='general-profile-detail-tabs-about-experience-dates'>
                  <div>
                    <p>From</p>
                    <DatePicker onChange={(date) => handleFromDateChange(container.id, date)} value={container.fromDate} required/>
                  </div>
                  <div>
                    <p>To</p>
                    <DatePicker onChange={(date) => handleToDateChange(container.id, date)} value={container.toDate} required/>
                  </div>
                </div>
                

            </div>

          ))}
        </div>

        <input type='submit' value="Save" className='general-profile-detail-tabs-about-experience-form-submit'/>

      </form>


    </div>
  )
}

export default ProfileTabsExperience