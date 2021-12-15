import React from 'react';
import Service from '../Service';
import { Link } from 'react-router-dom';
import banner from '../../asset/main_banner.jpg';

function Home() {
  return (
    <>
      <img
        className='absolute bg-bottom w-full object-cover'
        src={banner}
        style={{ height: '700px' }}
        alt='banner'
      />
      <div className='relative pt-48 text-center'>
        <p className='text-2xl font-bold'>세상을 바꾸는 여행</p>
        <p className='text-4xl font-bold mb-2'>지금 내가 시작합니다</p>
        <p className='text-xl pb-4'>
          여행자에게는 배려와 감동을, 여행지역에는 환경보전과 경제에 기여하는
          여행!
        </p>

        <button className='bg-white font-bold rounded-full py-3 px-6'>
          <Link to='/about'>더 알아보기</Link>
        </button>
      </div>
      <Service />
      <div className='grid h-96 bg-gray-300 text-center content-center'>
        CONTENT
      </div>
    </>
  );
}

export default Home;
