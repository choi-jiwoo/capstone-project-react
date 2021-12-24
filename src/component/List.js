import React from 'react';

const List = ({ list }) => {
  const showResults = (list) =>
    list.map((item) => (
      <>
        <div
          className='searchResultList flex justify-between text-sm pl-4 py-3 cursor-pointer hover:bg-green-100'
          key={item.id}
        >
          <div>{item.store}</div>
          <div>
            리뷰수 <span className='text-green-400'>{item.reviewcount}</span>
          </div>
        </div>
      </>
    ));

  return (
    <div
      className='grid grid-cols-1 content-center divide-y'
      style={{ width: '320px' }}
    >
      {showResults(list)}
    </div>
  );
};

export default List;
