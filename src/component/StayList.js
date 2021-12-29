import React from 'react';

function StayList({ data }) {
  const showResults = () =>
    data.map((item) => (
      <div key={item.id} className='m-4'>
        <div className='flex flex-col border-solid border border-black shadow-md rounded-lg py-4'>
          <div className='text-3xl text-center'>{item.name}</div>
          <div className='text-center pt-2 pb-2'>{item.address}</div>
          <div className='text-center pb-8'>총객실 수 {item.numofrooms}</div>
          <button
            key={item.id}
            className='place-self-center border-solid border-2 border-green-400 text-green-400 hover:text-green-500 hover:border-green-500 rounded-lg py-2 px-3 text-sm'
            onClick={() => {
              searchGoogle(item.name);
            }}
          >
            Search in Google
          </button>
        </div>
      </div>
    ));

  const searchGoogle = (name) => {
    window.open(
      'https://www.google.com/search?q=제주도+숙소+' + name,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return <div className='grid grid-cols-3'>{showResults()}</div>;
}

export default StayList;
