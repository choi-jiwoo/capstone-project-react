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
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [params, setParams] = useState(new URLSearchParams());
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [storeKwrd, setStoreKwrd] = useState([]);

  const removeResults = () => {
    data.length = 0;
    params.delete('page');
    params.delete('tag');
    setLoading(true);
    setHasMore(true);
  };

  const getParameters = (checkedItems, firstPage) => {
    removeResults();
    checkedItems.forEach((item) => {
      params.append('tag', item);
    });
    getRequest(params, firstPage);
    setPage(2);
    console.log(params.toString()); 
  };

  const getRequest = (params, page) => {
    params.append('page', page);
    setParams(params);

    const url = baseUrl + type + '?' + params;
    axios
      .get(url)
      .then((response) => {
        const res = response.data;
        const list = res.results;
        if (res.next === null || list.length < 10) setHasMore(false);
        setData([...data, ...list]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(false);
  }, [data]);

  useEffect(() => {
    let pageType;
    switch (type) {
      case 'cafe':
        pageType = 'cafe';
        break;
      case 'res':
        pageType = 'restaurant';
        break;
      default:
        console.log('Store type error.');
    }
    axios.get(url).then(function (response) {
      setStoreKwrd(response.data);
    });
    const url = baseUrl + pageType + '/keyword';
  }, []);

  return (
    <div className='search container-xl mt-8'>
      <div className='flex h-full relative'>
        <div className='form flex flex-col pr-5'>
          <Form
            getParameters={getParameters}
            selectList={storeKwrd}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
          <div className='mb-2'>
            <hr />
          </div>
          <Loading loading={loading} />
          <StoreList
            data={data}
            page={page}
            setPage={setPage}
            hasMore={hasMore}
            params={params}
            getRequest={getRequest}
          />
        </div>
        <Location list={data} />
      </div>
    </div>
  );
}

export default Place;
