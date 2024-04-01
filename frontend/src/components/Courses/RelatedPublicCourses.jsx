import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StarRatings from 'react-star-ratings';

const RelatedPublicCourses = ({relatedCourses}) => {

    console.log("relatedCourses", relatedCourses)
  return (
    <div className='public-single-course-related-courses'>

        <p>Related Courses</p>

        <div className='public-single-course-related-courses-container'>
        {relatedCourses?.map((course) => (
            <div className='pubic-single-related-course-box-view' key={course.id}>
                <LazyLoadImage src={course.course_thumbnail.url} alt='Course'/>
                <div className='pubic-single-related-course-box-view-header'>
                    <p>{course.category}</p>
                    <span>
                        <StarRatings 
                            rating={JSON.parse(course.reviews)}
                            starDimension="20px"
                            starSpacing="2px"
                            numberOfStars={1}
                            starRatedColor="#FFFF00"
                        />
                        ({JSON.parse(course.reviews)} Reviews)
                    </span>
                </div>
                <p className='pubic-single-related-course-box-view-title'>{course.course_title}</p>
                <p className='pubic-single-related-course-box-view-teacher'><span>By </span> {course.teacher_name}</p>
                <div className='pubic-single-related-course-box-view-price'>
                    <Link to={`/courses/course/${course.slug}`}>Enroll Now</Link>
                    <p>${course.price}.00</p>
                </div>
            </div>
    ))}
        </div>

    </div>
  )
}

export default RelatedPublicCourses