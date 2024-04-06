import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'

const AllPublicCoursesFilters = ({applyFilters, courses }) => {

  const getCategoryCounts = () => {
    return courses?.Publiccourses?.reduce((counts, course) => {
      counts[course.category] = (counts[course.category] || 0) + 1;
      return counts;
    }, {});
  };

  const getLanguageCounts = () => {
    return courses?.Publiccourses?.reduce((counts, course) => {
      counts[course.language] = (counts[course.language] || 0) + 1;
      return counts;
    }, {});
  };

  const getSkillLevelCounts = () => {
    return courses?.Publiccourses?.reduce((counts, course) => {
      counts[course.level] = (counts[course.level] || 0) + 1;
      return counts;
    }, {});
  };

  const categoryCounts = getCategoryCounts();
  const languageCounts = getLanguageCounts();
  const skillsCounts = getSkillLevelCounts()

  const [filters, setFilters] = useState({
    category: '',
    language: '',
    level: '',
    rating: 0,
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === 'skillLevel' ? event.target.dataset.value : value;
    const newFilters = { ...filters, [name]: newValue };
    setFilters(newFilters);
    applyFilters(newFilters); // Apply filters immediately
  };

  const handleRatingChange = (newRating) => {
    // Pass the selected rating value to applyFilters
    applyFilters({ rating: newRating });
  };

  return (
    <div className='pubic-all-courses-filters'>
      <div className='pubic-all-courses-filters-wrapper'>
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

      <div className='pubic-all-courses-filters-wrapper'>
        <p>Language</p>
        <div>
          <input type='radio' name='language' value='' onChange={handleFilterChange} />
          <p>All</p>
        </div>
        <div>
          <input type='radio' name='language' value='English' onChange={handleFilterChange} />
          <p>English ({languageCounts?.English > 0 ? (languageCounts?.English) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='language' value='Spanish' onChange={handleFilterChange} />
          <p>Spanish ({languageCounts?.Spanish > 0 ? (languageCounts?.Spanish) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='language' value='Arabic' onChange={handleFilterChange} />
          <p>Arabic ({languageCounts?.Arabic > 0 ? (languageCounts?.Arabic) : '0'})</p>
        </div>
        <div>
          <input type='radio' name='language' value='Urdu' onChange={handleFilterChange} />
          <p>Urdu ({languageCounts?.Urdu > 0 ? (languageCounts?.Urdu) : '0'})</p>
        </div>
      </div>

      <div className='pubic-all-courses-filters-wrapper'>
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

      <div className='pubic-all-courses-filters-wrapper'>
        <p>Rating</p>
        <div>
          <input type='radio' name='rating' onChange={() => handleRatingChange(4)} />
          <StarRatings rating={4} starDimension='20px' starSpacing='2px' numberOfStars={5} starRatedColor='#FFFF00' />
        </div>
        <div>
          <input type='radio' name='rating' onChange={() => handleRatingChange(3)} />
          <StarRatings rating={3} starDimension='20px' starSpacing='2px' numberOfStars={5} starRatedColor='#FFFF00' />
        </div>
        <div>
          <input type='radio' name='rating' onChange={() => handleRatingChange(2)} />
          <StarRatings rating={2} starDimension='20px' starSpacing='2px' numberOfStars={5} starRatedColor='#FFFF00' />
        </div>
        <div>
          <input type='radio' name='rating' onChange={() => handleRatingChange(1)} />
          <StarRatings rating={1} starDimension='20px' starSpacing='2px' numberOfStars={5} starRatedColor='#FFFF00' />
        </div>
      </div>
    </div>
  );

};


export default AllPublicCoursesFilters