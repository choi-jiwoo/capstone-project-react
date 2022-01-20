import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Page from '../Page';
import StayList from '../StayList';

function District() {
  const location = useLocation();
  const district = location.state.district;
  const subDistrict = district.split(' ')[1];
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const baseUrl = 'http://127.0.0.1:8000/api/';

  const movePage = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    axios
      .get(baseUrl + 'stay?district=' + subDistrict + '&page=' + page)
      .then((response) => {
        setCount(response.data.count);
        setData(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <div className='container-xl'>
      <div className='ml-4 Btn text-xl text-gray-400 pt-10'>
        <Link to='/stay'>
          <span className='hover:text-green-500'>&lt; 뒤로가기</span>
        </Link>
      </div>
      <div className='m-4 pt-4 text-4xl font-bold'>
        <span className='text-green-500'>{district}</span>에 대한 검색결과
      </div>
      <StayList data={data} />
      <Page page={page} count={count} setPage={movePage} />
    </div>
  );
}

export default District;
