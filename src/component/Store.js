import React from 'react';

function Store({ item }) {
  return (
    <div className='searchResultList flex flex-col justify-between text-sm px-2 py-3 cursor-pointer hover:bg-green-100'>
      <div className='text-lg'>{item.store}</div>
      <div>
        리뷰수 <span className='text-green-400'>{item.review_count}</span>
      </div>
    </div>
  );
}

export default Store;
