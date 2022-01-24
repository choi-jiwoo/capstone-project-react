import React from 'react';

function Card({ place, alt, name, about, link }) {
  return (
    <>
      <div className='w-96 border border-gray-500 rounded-lg shadow-sm'>
        <img
          className='object-cover w-96 h-80 rounded-t-lg'
          src={place}
          alt={alt}
        />
        <h5 className='text-2xl font-bold pt-4 pb-2 px-4'>{name}</h5>
        <p className='overflow-y-scroll tracking-wide h-24 px-4'>{about}</p>
        <a href={link}>
          <button className='text-green-400 hover:text-green-600 pl-6 py-3'>
            ⟶ 바로가기
          </button>
        </a>
      </div>
    </>
  );
}

export default Card;
