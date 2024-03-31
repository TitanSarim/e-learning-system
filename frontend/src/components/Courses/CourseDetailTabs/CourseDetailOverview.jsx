import React from 'react';
import './CourseDetailTabs.css';

const CourseDetailOverview = ({ courseDesc }) => {
  const parsedHTML = new DOMParser().parseFromString(courseDesc, 'text/html');
  const bodyContent = parsedHTML?.body;

  return (
    <div className='course-description-container'>

      <p>Course Description</p>
      <div className="course-description">
        {bodyContent &&
          Array.from(bodyContent.childNodes).map((node, index) => (
            <React.Fragment key={index}>
              {node.nodeType === 1 ? (
                <div dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
              ) : (
                <React.Fragment>{node.textContent}</React.Fragment>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default CourseDetailOverview;
