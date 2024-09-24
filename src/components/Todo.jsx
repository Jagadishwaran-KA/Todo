import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import { FaArrowRightLong } from 'react-icons/fa6';

import { useRef, useState } from 'react';

function Todo({ title, completed, check, OnDelete, OnEdit, bgColor }) {
  const [isEdit, setIsEdit] = useState(false);
  const newTitle = useRef(null);

  const edit = () => {
    const newValue = newTitle.current.value.trim();
    if (newValue) {
      OnEdit(newValue);
      setIsEdit(false);
    } else {
      alert('Todo title cannot be empty.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') edit();
    if (e.key === 'Escape') setIsEdit(false);
  };

  const editable = () => setIsEdit(true);

  return (
    <div
      className={`flex justify-between border p-3 border-gray-300 rounded-md w-auto h-auto m-4 ${bgColor}`}
    >
      {isEdit ? (
        <input
          type="text"
          className="text-lg font-opensans focus:outline-none"
          ref={newTitle}
          placeholder="Edit the todo"
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="flex space-x-3">
          <input
            type="checkbox"
            className="cursor-pointer w-5 h-auto"
            checked={completed}
            onChange={check}
          />
          <h1
            className={`text-lg font-opensans ${completed ? 'line-through' : ''}`}
          >
            {title}
          </h1>
        </div>
      )}

      <div className="flex w-14 space-x-5 ml-6">
        {isEdit ? (
          <span onClick={edit}>
            <FaArrowRightLong className="text-green-600 font-bold mt-2 cursor-pointer" />
          </span>
        ) : (
          <span onClick={editable}>
            <MdOutlineEdit className="text-black mt-2 cursor-pointer" />
          </span>
        )}

        <span onClick={OnDelete}>
          <RiDeleteBin6Line className="text-red-600 mt-2 cursor-pointer hover:scale-125" />
        </span>
      </div>
    </div>
  );
}

export default Todo;
