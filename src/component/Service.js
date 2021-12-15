import React from 'react';
import { Link } from 'react-router-dom';
import cafe from '../asset/cafe.png';
import restaurant from '../asset/restaurant.png';
import stay from '../asset/stay.png';
import activity from '../asset/activity.png';
import plogging from '../asset/plogging.png';

function Service() {
  return (
    <>
      <div className='mt-80 pt-4 text-center text-2xl font-extrabold'>
        공정여행 참여하기🌿
      </div>
      <div className='container-xl flex flex-wrap flex-row justify-center items-center gap-6 pt-3 pb-7'>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to='/cafe'
        >
          {/* <img className='serviceMenuButton' src={cafe} alt='cafe' /> */}
          <p className='serviceMenuButton'>☕️</p>
          <p className='text-center'>카페</p>
        </Link>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to='/restaurant'
        >
          {/* <img
            className='serviceMenuButton'
            src={restaurant}
            alt='restaurant'
          /> */}
          <p className='serviceMenuButton'>🥘</p>
          <p className='text-center'>음식점</p>
        </Link>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to='/stay'
        >
          {/* <img className='serviceMenuButton' src={stay} alt='stay' /> */}
          <p className='serviceMenuButton'>🏠</p>
          <p className='text-center'>숙소</p>
        </Link>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to='/activity'
        >
          {/* <img className='serviceMenuButton' src={activity} alt='activity' /> */}
          <p className='serviceMenuButton'>🏄🏻‍♂️</p>
          <p className='text-center'>체험활동</p>
        </Link>
        <Link
          className='grid border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3'
          to='/plogging'
        >
          {/* <img className='serviceMenuButton' src={plogging} alt='plogging' /> */}
          <p className='serviceMenuButton'>🏃🏻‍♀️</p>
          <p className='text-center'>플로깅</p>
        </Link>
      </div>
    </>
  );
}

export default Service;
