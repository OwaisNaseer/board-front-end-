import React from 'react';
// Local Imports
import { PlusFilledIcon } from '../../../assets/icons';

const IconWithText = ({ name, icon, className, textClassName, onClick }) => {
  return (
    <React.Fragment>
      <div
        className={`flex items-center gap-[6px] p-[6px] rounded-md hover:bg-neutral-300 transition-all duration-[0.3s] cursor-pointer ${
          className ? className : ''
        }`}
        onClick={onClick}
      >
        {icon ? icon : <PlusFilledIcon />}
        <p
          className={`text-[14px] font-[400] leading-5 text-neutral-1300 ${
            textClassName ? textClassName : ''
          }`}
        >
          {name}
        </p>
      </div>
    </React.Fragment>
  );
};

export default IconWithText;
