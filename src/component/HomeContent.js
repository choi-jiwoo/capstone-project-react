import React from 'react';

function HomeContent() {
  return (
    <>
      <div className='container-xl'>
        <div className='text-2xl font-bold w-full text-center pb-4 pt-10'>
          Recommendation
        </div>
        <div className='grid grid-cols-3 w-full justify-items-center'>
          <div className='border border-black w-80 h-48'></div>
          <div className='border border-black w-80 h-48'></div>
          <div className='border border-black w-80 h-48'></div>
        </div>
        <div className='text-2xl font-bold w-full text-center pb-4 pt-10'>
          Activiy
        </div>
        <div className='grid grid-cols-3 w-full justify-items-center'>
          <div className='border border-black w-80 h-48'></div>
          <div className='border border-black w-80 h-48'></div>
          <div className='border border-black w-80 h-48'></div>
        </div>
        <div className='text-2xl font-bold w-full text-center pb-4 pt-10'>
          Curation
        </div>
        <div className='grid grid-cols-3 w-full justify-items-center'>
          <div className='border border-black w-80 h-48'></div>
          <div className='border border-black w-80 h-48'></div>
          <div className='border border-black w-80 h-48'></div>
        </div>
      </div>
    </>
  );
}

export default HomeContent;
