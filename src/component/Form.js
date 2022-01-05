import React, { useState } from 'react';

function Form({ getRequest, selectList }) {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    checkedItems.forEach((item) => {
      params.append('tag', item);
    });
    console.log(params.toString());
    getRequest(params);
  };

  const selectCheckbox = (e) => {
    const item = e.target.value;
    const labelTag = e.target.parentNode;

    if (checkedItems.has(item)) {
      checkedItems.delete(item);
      setCheckedItems(checkedItems);
      labelTag.style.backgroundColor = '#fff';
    } else {
      checkedItems.add(item);
      setCheckedItems(checkedItems);
      labelTag.style.backgroundColor = '#ccffcc';
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div className='flex flex-wrap gap-2 justify-center'>
        {selectList.map((item) => (
          <label
            key={item}
            className='flex place-items-center border rounded-full py-1 px-3 cursor-pointer'
          >
            <input
              type='checkbox'
              className='hidden'
              value={item}
              onChange={(e) => selectCheckbox(e)}
            />
            <div className='select-none text-sm'>{item}</div>
          </label>
        ))}
      </div>
      <button
        type='submit'
        className='place-self-end border select-none text-sm py-2 px-3 rounded-lg mt-3 mr-3 w-20 text-white bg-green-500 hover:bg-green-600'
      >
        Search
      </button>
    </form>
  );
}

export default Form;
