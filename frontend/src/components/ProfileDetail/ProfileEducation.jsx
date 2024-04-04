import React from 'react'
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { LuMinusSquare } from "react-icons/lu";
import {selectField} from '../../Jsons/EducationalPrograms'
import {selectDegree} from '../../Jsons/EducationDegrees'


const ProfileEducation = ({setEducationContainers, educationContainers, handleSubmit}) => {
  
  
  const addEducationContainer = () => {
    const newContainer = {
      id: Date.now(),
      universityName: '',
      field: 'none',
      degree: 'none',
      fromDate: null,
      toDate: null
    };
    setEducationContainers([...educationContainers, newContainer]);
  };

  const removeEducationContainer = (id) => {
    if (educationContainers.length > 1) {
      setEducationContainers(educationContainers.filter(container => container.id !== id));
    }
  };

  const handleUniversityNameChange = (id, newName) => {
    setEducationContainers(educationContainers.map(container => 
      container.id === id ? { ...container, universityName: newName } : container
    ));
  };

  const handleFieldChange = (id, newValue) => {
    setEducationContainers(educationContainers.map(container => 
      container.id === id ? { ...container, field: newValue } : container
    ));
  };

  const handleDegreeChange = (id, newValue) => {
    setEducationContainers(educationContainers.map(container => 
      container.id === id ? { ...container, degree: newValue } : container
    ));
  };

  const handleFromDateChange = (id, newValue) => {
    setEducationContainers(educationContainers.map(container => 
      container.id === id ? { ...container, fromDate: newValue } : container
    ));
  };

  const handleToDateChange = (id, newValue) => {
    setEducationContainers(educationContainers.map(container => 
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
    <div className='general-profile-detail-tabs-about-education'>

      <button onClick={addEducationContainer}>Add More</button>

      <form onSubmit={handleSubmit}>
      <div className='general-profile-detail-tabs-about-education-wrapper' >

      {educationContainers.map(container => (
        <div className='general-profile-detail-tabs-about-education-container' >
          <div className='general-profile-detail-tabs-about-education-university'>
            <p>University name</p>
            <div>
              <input type="text" value={container.universityName} onChange={(e) => handleUniversityNameChange(container.id, e.target.value)} required/>
              <button onClick={() => removeEducationContainer(container.id)}><LuMinusSquare size={24}/></button>
            </div>
          </div>
          <div className='general-profile-detail-tabs-about-education-field-degree'>
              <div>
                <p>Field</p>
                  <Select
                     defaultValue={selectField.find(option => option.value === container.field)}
                    onChange={(selectedOption) => handleFieldChange(container.id, selectedOption.value)}
                    options={selectField}
                    styles={customStyles}
                    placeholder="Select Field"
                    required
                  />
              </div>
              <div>
                <p>Degree</p>
                <Select
                  defaultValue={selectDegree.find(option => option.value === container.degree)}
                  onChange={(selectedOption) => handleDegreeChange(container.id, selectedOption.value)}
                  options={selectDegree} 
                  styles={customStyles}
                  placeholder="Degree Type"
                  required
                />
              </div>
          </div>
          <div className='general-profile-detail-tabs-about-education-date'>
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

      <input type='submit' value="Save" className='general-profile-detail-tabs-about-education-form-submit'/>

      </form>




    </div>
  )
}

export default ProfileEducation