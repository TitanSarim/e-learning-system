import React, { useState } from 'react'

const AllPublicJobsFilters = ({applyFilters, allJobs }) => {

  const getCategoryCounts = () => {
    return allJobs?.AllJobs?.reduce((counts, job) => {
      counts[job.category] = (counts[job.category] || 0) + 1;
      return counts;
    }, {});
  };

  const getDurationCounts = () => {
    return allJobs?.AllJobs?.reduce((counts, job) => {
      counts[job.duration] = (counts[job.duration] || 0) + 1;
      return counts;
    }, {});
  };

  const getSkillLevelCounts = () => {
    return allJobs?.AllJobs?.reduce((counts, job) => {
      counts[job.skillLevel] = (counts[job.skillLevel] || 0) + 1;
      return counts;
    }, {});
  };

  
  const getTypeLevelCounts = () => {
    return allJobs?.AllJobs?.reduce((counts, job) => {
      counts[job.type] = (counts[job.type] || 0) + 1;
      return counts;
    }, {});
  };

  const categoryCounts = getCategoryCounts();
  const durationCounts = getDurationCounts();
  const skillsCounts = getSkillLevelCounts()
  const typeCounts = getTypeLevelCounts()

  const [filters, setFilters] = useState({
    category: '',
    duration: '',
    level: '',
    type: '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === 'skillLevel' ? event.target.dataset.value : value;
    const newFilters = { ...filters, [name]: newValue };
    setFilters(newFilters);
    applyFilters(newFilters);
  };


  return (
    <div className='pubic-all-Jobs-filters'>
      <div className='pubic-all-Jobs-filters-wrapper'>
        <p>Categories</p>
        <div>
          <input type='radio' name='category' value='' onChange={handleFilterChange} />
          <p>All</p>
        </div>
        <div>
          <input type='radio' name='category' value='Website' onChange={handleFilterChange} />
          <p>Website ({categoryCounts?.Website > 0 ? (categoryCounts?.Website) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='category' value='Apps' onChange={handleFilterChange} />
          <p>Apps ({categoryCounts?.Apps > 0 ? (categoryCounts?.Apps) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='category' value='Software' onChange={handleFilterChange} />
          <p>Software ({categoryCounts?.Software > 0 ? (categoryCounts?.Software) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='category' value='Development' onChange={handleFilterChange} />
          <p>Development ({categoryCounts?.Development > 0 ? (categoryCounts?.Development) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='category' value='Photography' onChange={handleFilterChange} />
          <p>Photography ({categoryCounts?.Photography > 0 ? (categoryCounts?.Photography) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='category' value='Music' onChange={handleFilterChange} />
          <p>Music ({categoryCounts?.Music > 0 ? (categoryCounts?.Music) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='category' value='Marketing' onChange={handleFilterChange} />
          <p>Marketing ({categoryCounts?.Marketing > 0 ? (categoryCounts?.Marketing) : '0'})</p>
        </div>
      </div>

      
      <div className='pubic-all-Jobs-filters-wrapper'>
        <p>Skill level</p>
        <div>
          <input type='radio' name='level' value='' onChange={handleFilterChange} />
          <p>All</p>
        </div>
        <div>
          <input type='radio' name='level' value='Beginner' data-value='Beginner' onChange={handleFilterChange} />
          <p>Beginner ({skillsCounts?.Beginner > 0 ? (skillsCounts?.Beginner) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='level' value='Intermediate' data-value='Intermediate' onChange={handleFilterChange} />
          <p>Intermediate ({skillsCounts?.Intermediate > 0 ? (skillsCounts?.Intermediate) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='level' value='Expert' data-value='Expert' onChange={handleFilterChange} />
          <p>Expert ({skillsCounts?.Expert > 0 ? (skillsCounts?.Expert) : '0'})</p>
        </div>
      </div>

      <div className='pubic-all-Jobs-filters-wrapper'>
        <p>Duration</p>
        <div>
          <input type='radio' name='duration' value='' onChange={handleFilterChange} />
          <p>All</p>
        </div>
        <div>
          <input type='radio' name='duration' value='Full Time' onChange={handleFilterChange} />
          <p>Full Time ({durationCounts?.['Full Time'] > 0 ? durationCounts?.['Full Time'] : '0'})</p>
        </div>
        <div>
          <input type='radio' name='duration' value='Part Time' onChange={handleFilterChange} />
          <p>Part Time ({durationCounts?.['Part Time'] > 0 ? durationCounts?.['Part Time'] : '0'})</p>
        </div>
      </div>

      <div className='pubic-all-Jobs-filters-wrapper'>
        <p>Type</p>
        <div>
          <input type='radio' name='type' value='' onChange={handleFilterChange} />
          <p>All</p>
        </div>
        <div>
          <input type='radio' name='type' value='Hybrid' onChange={handleFilterChange} />
          <p>Hybrid ({typeCounts?.['Hybrid'] > 0 ? typeCounts?.['Hybrid'] : '0'})</p>
        </div>
        <div>
          <input type='radio' name='type' value='On Site' onChange={handleFilterChange} />
          <p>On Site ({typeCounts?.['On Site'] > 0 ? typeCounts?.['On Site'] : '0'})</p>
        </div>
        <div>
          <input type='radio' name='type' value='Remote' onChange={handleFilterChange} />
          <p>Remote ({typeCounts?.['Remote'] > 0 ? typeCounts?.['Remote'] : '0'})</p>
        </div>
      </div>

    </div>
  );

};


export default AllPublicJobsFilters