import React from 'react';
import { Link } from 'react-router-dom';

function MainService() {
  return (
    <>
      <div className='mt-96 pt-4 text-center text-4xl font-extrabold'>
        공정여행 참여하기🌿
      </div>
      <div className='flex flex-wrap flex-row justify-center items-center gap-9 pt-16'>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to={{
            pathname: '/cafe',
            state: {
              type: 'cafe',
            },
          }}
        >
          <p className='serviceMenuButton'>☕️</p>
          <p className='text-center'>카페</p>
        </Link>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to={{
            pathname: '/restaurant',
            state: {
              type: 'restaurant',
            },
          }}
        >
          <p className='serviceMenuButton'>🥘</p>
          <p className='text-center'>음식점</p>
        </Link>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to='/stay'
        >
          <p className='serviceMenuButton'>🏠</p>
          <p className='text-center'>숙소</p>
        </Link>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to='/plogging'
        >
          <p className='serviceMenuButton'>🏃🏻‍♀️</p>
          <p className='text-center'>플로깅</p>
        </Link>
      </div>
    </>
  );
}

export default MainService;
