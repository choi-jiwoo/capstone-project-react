import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Location from '../Location';
import Form from '../Form';
import Loading from '../Loading';
import StoreList from '../StoreList';

function Place() {
  const location = useLocation();
  const type = location.state.type;
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [params, setParams] = useState(new URLSearchParams());
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [loading, setLoading] = useState(false);

  // 나중에 이부분은 db에서 불러오기
  const cafeKwrd = [
    '가성비',
    '강추',
    '공간',
    '느낌',
    '디저트',
    '만족',
    '맛집',
    '분위기',
    '사진',
    '서비스',
    '선물',
    '식빵',
    '아이',
    '아침',
    '인테리어',
    '존맛',
    '주차',
    '직접',
    '초코',
    '친절',
    '케이크',
    '크림',
    '포장',
  ];
  const restaurantKwrd = [
    '가성비',
    '가족',
    '갈치',
    '강추',
    '고기',
    '고등어',
    '구이',
    '국물',
    '느낌',
    '도민',
    '돈까스',
    '돼지',
    '맛집',
    '모듬전',
    '밑반찬',
    '바삭',
    '배달',
    '백숙',
    '볶음밥',
    '분위기',
    '사진',
    '샐러드',
    '생선',
    '서비스',
    '소스',
    '수정과',
    '야시장',
    '양념',
    '요리',
    '전복',
    '조림',
    '존맛',
    '중국집',
    '짜장',
    '짜장면',
    '짬뽕',
    '치킨',
    '친절',
    '탕수육',
    '토종닭',
    '튀김',
    '파라솔',
    '파스타',
    '포장',
    '포차',
  ];

  const setType = (type) => {
    if (type === 'cafe') return cafeKwrd;
    else return restaurantKwrd;
  };

  const getParameters = (checkedItems, firstPage) => {
    data.length = 0;
    setLoading(true);
    setHasMore(true);
    checkedItems.forEach((item) => {
      params.append('tag', item);
    });
    getRequest(params, firstPage);
    setPage(2);
  };
  };

  useEffect(() => {
    setLoading(false);
  }, [data]);

  return (
    <div className='search container-xl mt-8'>
      <div className='flex h-full relative'>
        <div className='form flex flex-col pr-5'>
          <Form
            getParameters={getParameters}
            selectList={setType(type)}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
          <div className='mb-2'>
            <hr />
          </div>
          <Loading loading={loading} />
          <StoreList
            data={data}
          />
        </div>
        <Location list={data} />
      </div>
    </div>
  );
}

export default Place;
