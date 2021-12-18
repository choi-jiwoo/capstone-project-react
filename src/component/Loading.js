import React from 'react';

function Loading({ loading }) {
  let loader = (
    <button className='border-transparent p-4 mx-auto' disabled>
      <div className='animate-pulse flex space-x-4 justify-center'>
        <div className='text-blue-400 font-semibold'>Processing</div>
      </div>
    </button>
  );
  if (!loading) loader = null;
  return <div>{loader}</div>;
}

export default Loading;
