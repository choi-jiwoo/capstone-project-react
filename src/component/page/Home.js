import React from 'react';
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
    </>
  );
}

export default Home;
