import React from 'react';
import { Link } from 'react-router-dom';
import courseList from '../../asset/courseList.json';

function Plogging() {
  const CourseBtn = ({ courseName }) => (
    <button type='button' className='mx-2 my-3'>
      <Link
        to={{
          pathname: '/plogging/courseView',
          state: {
            courseName: courseName,
          },
        }}
        className='border-2 rounded-lg border-black hover:border-blue-600 p-2 '
      >
        {courseName}
      </Link>
    </button>
  );

  const renderBtn = () => {
    return courseList.map((data) => (
      <CourseBtn key={data.id} courseName={data.courseName} />
    ));
  };

  return <div className='m-3'>{renderBtn()}</div>;
}

export default Plogging;
