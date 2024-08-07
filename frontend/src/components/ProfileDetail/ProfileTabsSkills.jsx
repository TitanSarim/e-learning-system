import React from 'react'
import {selectDegree} from '../../Jsons/EducationDegrees'
import Select from 'react-select';

const ProfileTabsSkills = ({setSelectSkills, selectSkills, handleSubmit}) => {

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 1000,
      height: 200,
      backgroundColor: '#1b1d29',
      border: state.isFocused ? 'none' : 'none',
      outline: "none",
      borderRadius: 7, 
      cursour: "pointer",
      border: "1px solid #686868",
      borderRadius: 8,
      border: "1px solid rgba(255, 255, 255, 0.281)"

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
    <div className='general-profile-detail-tabs-skills'>

      <form onSubmit={handleSubmit}>
        <div>
          <p>Skills</p>
          <Select
            isMulti
            defaultValue={selectSkills}
            onChange={(selectedOptions) => setSelectSkills(selectedOptions)}             options={selectDegree} 
            styles={customStyles}
            placeholder="Add Your Skills"
            required
          />
        </div>
        <input type='submit' value="Save"/>
      </form>

    </div>
  )
}

export default ProfileTabsSkills