import React, { useState } from 'react';
import Select from 'react-select';

function Form({ getRequest }) {
  const [selected, setSelected] = useState(0);
  const selectList = [1, 2, 3]; // 추후에 실제 데이터로 바꿔야 할 부분
  const options = selectList.map((item) => ({
    ...item,
    label: item,
    value: item,
  }));

  const handleSelect = (item) => {
    setSelected(item.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('cat', selected);
    const params = new URLSearchParams(formData);
    getRequest(params);
  };

  return (
    <div>
      <form className='flex' onSubmit={handleSubmit}>
        <Select
          className='border rounded p-1'
          onChange={handleSelect}
          options={options}
        />
        <button type='submit' className='bg-gray-300 rounded px-2'>
          Search
        </button>
      </form>
    </div>
  );
}

export default Form;
