import React from 'react';

const Button = ({ children, startIcon, endIcon, onClick, onBlur }) => {
  return (
    <button
      className='bg-blue-voilet text-white px-[10px] min-h-[32px] py-1 flex items-center gap-[8px] rounded-[6px] hover:bg-blue-voilets cursor-pointer'
      onClick={onClick}
      onBlur={onBlur}
    >
      {startIcon && (
        <span className='group-hover:translate-x-1 transition duration-300'>
          {startIcon}
        </span>
      )}
      <span className='text-[14px] font-[475] leading-5'>
        {children ? children : 'Button'}
      </span>
      {endIcon && (
        <span className='group-hover:translate-x-1 transition duration-300'>
          {endIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
