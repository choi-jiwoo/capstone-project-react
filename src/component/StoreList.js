import React from 'react';
import Store from './Store';
import InfiniteScroll from 'react-infinite-scroll-component';

const StoreList = ({ data, page, setPage, hasMore, params, getRequest }) => {
  const fetchData = () => {
    if (page !== 1) {
      getRequest(params, page);
      setPage(page + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      height={512}
      endMessage={
        <p className='text-xs text-gray-300 text-center pb-2'>
          더이상 로드할 수 없습니다.
        </p>
      }
    >
      <div
        className='grid grid-cols-1 content-center divide-y'
        style={{ width: '384px' }}
      >
        {data.map((item) => (
          <Store key={item.id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default StoreList;
