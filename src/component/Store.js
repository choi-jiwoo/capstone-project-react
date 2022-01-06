import React from 'react';

function Store({ item }) {
  return (
    <div className='searchResultList flex justify-between text-sm px-2 py-3 cursor-pointer hover:bg-green-100'>
      <div>{item.store}</div>
      <div>
        리뷰수 <span className='text-green-400'>{item.review_count}</span>
      </div>
    </div>
  );
}

export default Store;
