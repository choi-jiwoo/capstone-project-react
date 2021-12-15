import React from 'react';

function Footer() {
  return (
    <footer className='static bottom-0 w-full p-8 bg-light text-center'>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col'>
          <div className='font-bold'>Footer1</div>
          <div>item1</div>
          <div>item2</div>
        </div>
        <div className='flex flex-col'>
          <div className='font-bold'>Footer2</div>
          <div>item1</div>
          <div>item2</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
