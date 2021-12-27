import React from 'react';
import ploggingImg from '../../asset/plogging.jpg';
import about from '../../asset/about.jpg';

function About() {
  return (
    <div className='container-xl'>
      <div className='part1 text-center'>
        <div>
          <div className='text-4xl py-4 font-bold mt-20'>공정여행이란</div>
          <div>
            <p className='text-2xl'>
              <span className='text-green-500'>공정여행</span>은
            </p>
            <p className='text-xl mb-3'>
              공정무역의 개념에서 차용해온 것으로서
            </p>
          </div>
          <div>
            <p>지속가능한 여행, 책임여행 등의 한국적 표현으로</p>
            <p>
              여행산업 내부의 각종 관계에서의 공정성 및 책임성을 강조한 개념
            </p>
          </div>
          <div className='grid grid-cols-3 gap-10 mx-20 m-8'>
            <div className='flex flex-col py-8 px-4 shadow-sm bg-green-100'>
              <p className='text-2xl'>책임 관광</p>
              <p className='pb-3'>Responsible Tourism</p>
              <p className='text-justify'>
                현지의 자연과 문화 자원을 비롯하여 관광과 관련된 모든 분야에
                대한 이익을 존중하는 관광
              </p>
            </div>
            <div className='flex flex-col py-8 px-4 shadow-sm bg-green-100'>
              <p className='text-2xl'>생태 관광</p>
              <p className='pb-3'>Eco Tourism</p>
              <p className='text-justify'>
                자연 지역에서 책임있는 관광객의 태도와 행동을 통하여 이루어져
                행해지는 관광행위이며, 지역주민의 참여 및 이익 창출이 동반되어
                관광에 의한 환경 및 사회 문화적 영향을 관리하는 관광
              </p>
            </div>
            <div className='flex flex-col py-8 px-4 shadow-sm bg-green-100'>
              <p className='text-2xl'>지속 가능한 관광</p>
              <p className='pb-3'>Sustainable Tourism</p>
              <p className='text-justify'>
                문화의 보전, 필수적인 생태적 과정, 생물 다양성, 경제적, 사회적,
                심미적 필요를 총족시킬 수 있도록 모든 자원을 관리하는 것,
                경제적, 환경적, 그리고 사회문화적 지속가능성 등 3개 차원을 모두
                포괄하는 개념
              </p>
            </div>
          </div>
          <img
            className='block ml-auto mr-auto w-2/6'
            src={about}
            alt='about'
          />
        </div>
      </div>
      <div className='part2 mt-20'>
        <div className='text-4xl text-center py-4 font-bold'>플로깅이란</div>
        <div className='flex flex-row place-items-center mb-20'>
          <img
            className='rounded-xl flex-initial m-10 2-5/12'
            src={ploggingImg}
            alt='plogging'
          />
          <div className='text-xl text-justify break-words px-20 py-10'>
            <div className='mb-10'>
              <span className='text-green-500 font-bold'>플로깅(plogging)</span>
              은 ‘이삭을 줍는다’는 뜻의 스웨덴어 ‘Plocka upp’과 ‘달리는 운동’을
              뜻하는 영어 ‘Jogging’의 합성어로
            </div>
            <div>❝달리기를 하면서 쓰레기를 줍는 환경 보호 활동❞이다. </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
