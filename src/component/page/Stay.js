import React from 'react';
import { Link } from 'react-router-dom';

function Stay() {
  const seogwiposi = [
    '서귀포시 남원읍',
    '서귀포시 대정읍',
    '서귀포시',
    '서귀포시 성산읍',
    '서귀포시 안덕면',
    '서귀포시 표선면',
  ];
  const jejusi = [
    '제주시 한경면',
    '제주시 한림읍',
    '제주시 애월읍',
    '제주시',
    '제주시 구좌읍',
    '제주시 우도면',
    '제주시 조천읍',
  ];

  const DistrictCard = ({ district }) => (
    <Link
      className='border-solid border-2 border-transparent shadow-sm rounded-lg py-2 px-3 hover:text-green-500'
      to={{
        pathname: '/stay/district',
        state: {
          district: district,
        },
      }}
    >
      {district}
    </Link>
  );

  const renderBtn = (districtList) => {
    return districtList.map((data) => (
      <DistrictCard key={data} district={data} />
    ));
  };

  return (
    <>
      <div className='bg-gray-200 w-full'>
        <div className='text-7xl font-bold pl-24 h-96 pt-36'>STAY</div>
      </div>
      <div className='container-xl'>
        <div className='text-4xl font-bold pt-20 w-full text-center'>
          제주시
        </div>
        <div className='flex pt-2 space-x-4 justify-center'>
          {renderBtn(jejusi)}
        </div>
        <div className='text-4xl font-bold pt-20 w-full text-center'>
          서귀포시
        </div>
        <div className='flex pt-2 space-x-4 justify-center pb-20'>
          {renderBtn(seogwiposi)}
        </div>
      </div>
    </>
  );
}

export default Stay;
