import React from 'react';
import footer1 from '../asset/footer_logo.gif';

function Footer() {
  const courseUrl = 'https://biz.ajou.ac.kr/ebiz/index.jsp';

  return (
    <footer className='container-xl static bottom-0 bg-white text-center py-20'>
      <div className='grid grid-cols-3 text-gray-400 text-sm'>
        <div className='pr-12'>
          <img src={footer1} alt='footer_logo' />
        </div>
        <div className='flex flex-col text-center'>
          <a
            href={courseUrl}
            className='hover:text-gray-600 font-bold tracking-widest'
          >
            아주대학교 경영대학 e비즈니스학과
          </a>
          <div className='text-xs'>
            21-2 비즈니스 애널리틱스 (캡스톤 디자인)
          </div>
        </div>
        <div className='flex gap-2 flex-auto justify-end self-center'>
          <span className='font-bold tracking-widest'>TEAM</span>
          <span>김선태</span>
          <span>백세희</span>
          <span>장예슬</span>
          <span>최지우</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
