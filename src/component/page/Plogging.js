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
        className=' border-transparent shadow-sm rounded-lg py-2 px-3 hover:text-green-500'
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

  return (
    <>
      <div className='bg-gray-200 w-full'>
        <div className='text-7xl font-bold pl-24 h-96 pt-36'>PLOGGING</div>
      </div>
      <div className='container-xl'>
        <div className='text-4xl font-bold pt-20 pb-8 w-full text-center'>
          코스 리스트
        </div>
        <div className='flex pt-2 flex-wrap justify-center pb-20'>
          {renderBtn()}
        </div>
      </div>
    </>
  );
}

export default Plogging;
