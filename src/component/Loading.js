import React from 'react';

function Loading({ loading }) {
  const loader = (
    <button className='w-full border-transparent p-4 mx-auto' disabled>
      <div className='animate-pulse flex space-x-4 justify-center'>
        <div className='text-blue-400 font-semibold'>Processing</div>
      </div>
    </button>
  );
  return <>{loading ? loader : null}</>;
}

export default Loading;
