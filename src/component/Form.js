import React from 'react';

function Form({ getParameters, selectList, checkedItems, setCheckedItems }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const firstPage = 1;
    getParameters(checkedItems, firstPage);
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
      labelTag.style.backgroundColor = '#bbf7d0';
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col mt-12'>
      <div className='flex flex-wrap gap-2 justify-center'>
        {selectList.map((item) => (
          <label
            key={item.id}
            className='flex place-items-center border rounded-full py-1 px-3 cursor-pointer'
          >
            <input
              type='checkbox'
              className='hidden'
              value={item.keyword}
              onChange={(e) => selectCheckbox(e)}
            />
            <div className='select-none text-sm'>{item.keyword}</div>
          </label>
        ))}
      </div>
      <button
        type='submit'
        className='place-self-end border select-none text-sm py-2 px-3 mr-3 my-3 rounded-lg w-20 text-white bg-green-500 hover:bg-green-600'
      >
        Search
      </button>
    </form>
  );
}

export default Form;
