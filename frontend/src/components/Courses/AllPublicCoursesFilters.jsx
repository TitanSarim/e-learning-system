import React from 'react'
import StarRatings from 'react-star-ratings'

const AllPublicCoursesFilters = () => {
  return (
    <div className='pubic-all-courses-filters'>

          <div className='pubic-all-courses-filters-wrapper'>
            <p>Categories</p>
              <div>
                <input type='checkbox'/>
                <p>Website</p>
              </div>
              <div>
                <input type='checkbox'/>
                <p>Apps</p>
              </div>
              <div>
                <input type='checkbox'/>
                <p>Software</p>
              </div>
              <div>
                <input type='checkbox'/>
                <p>Development</p>
              </div>
              <div>
                <input type='checkbox'/>
                <p>Photography</p>
              </div>
              <div>
                <input type='checkbox'/>
                <p>Music</p>
              </div>
              <div>
                <input type='checkbox'/>
                <p>Marketing</p>
              </div>
          </div>
          <div className='pubic-all-courses-filters-wrapper'>
            <p>Language</p>
            <div>
              <input type='checkbox'/>
              <p>English</p>
            </div>
            <div>
              <input type='checkbox'/>
              <p>Spanish</p>
            </div>
            <div>
              <input type='checkbox'/>
              <p>Arabic</p>
            </div>
            <div>
              <input type='checkbox'/>
              <p>Urdu</p>
            </div>
          </div>

          {/* <div className='pubic-all-courses-filters-wrapper'>
            <p>Price</p>
            <div>
              <input type='checkbox'/>
              <p>10%</p>
            </div>
          </div> */}

          <div className='pubic-all-courses-filters-wrapper'>
            <p>Skill level</p>
            <div>
              <input type="checkbox"/>
              <p>Beginner</p>
            </div>
            <div>
              <input type="checkbox"/>
              <p>Intermediate</p>
            </div>
            <div>
              <input type="checkbox"/>
              <p>Expert</p>
            </div>
          </div>

          <div className='pubic-all-courses-filters-wrapper'>
            <p>Rating</p>
            <div>
              <input type='checkbox'/>
              <StarRatings 
                rating={4.403}
                starDimension="20px"
                starSpacing="2px"
                numberOfStars={5}
                starRatedColor="#FFFF00"
              />
            </div>
            <div>
              <input type='checkbox'/>
              <StarRatings 
                rating={3.3}
                starDimension="20px"
                starSpacing="2px"
                numberOfStars={5}
                starRatedColor="#FFFF00"
              />
            </div>
            <div>
              <input type='checkbox'/>
              <StarRatings 
                rating={4}
                starDimension="20px"
                starSpacing="2px"
                numberOfStars={5}
                starRatedColor="#FFFF00"
              />
            </div>
            <div>
              <input type='checkbox'/>
              <StarRatings 
                rating={2.3}
                starDimension="20px"
                starSpacing="2px"
                numberOfStars={5}
                starRatedColor="#FFFF00"
              />
            </div>
          </div>
        </div>
  )
}

export default AllPublicCoursesFilters