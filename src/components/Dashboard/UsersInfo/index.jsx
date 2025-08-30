import React, { useRef, useState } from 'react';
// Local Imports
import { Button, IconWithText } from '../../Shared';
import { useOnClickOutside } from '../../../utils/utils';
import { data } from '../../../utils/data';
import { LeftArrowIcon } from '../../../assets/icons';
const UserInfo = () => {
  // DATA
  const actions = data.quickActions;
  // STATES & REFS
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);

  // CLICK ON OUTSIDE TO CLOSE POPOVER
  useOnClickOutside(popoverRef, () => setOpen(false));
  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-[3px] sm:gap-[4px] lg:gap-[9px] justify-start'>
        <h1 className='text-[18px] sm:text-[20px] lg:text-[24px] font-[600] leading-7 cool-grey-1100 tracking-[-0.72px]'>
          Good afternoon, Bilal Cheema
        </h1>
        <p className='text-[10px] sm:text-[12px] lg:text-[14px] font-[400] leading-5 cool-grey-1100 tracking-[-0.05px] text-cool-grey-800'>
          Today is Wednesday, March 27th, 2024
        </p>
      </div>
      <div className='relative' ref={popoverRef}>
        <Button
          endIcon={
            <LeftArrowIcon
              color='#fff'
              className={`transform transition-all duration-[0.4s] ${
                open ? 'rotate-90' : 'rotate-0'
              }`}
            />
          }
          onClick={() => setOpen(!open)}
        >
          Create New
        </Button>
        {/* PopOver */}
        {open && (
          <div
            className={`transition-all duration-[1s] sm:w-64 w-52 h-[218px] absolute bg-white rounded-lg border border-neutral-400 right-0 top-9  popover-shadow`}
          >
            <div className='pt-2 pr-2 pb-[5px] pl-4'>
              <p className='text-[11px] font-[400] leading-4 uppercase text-neutral-1000'>
                Quick Actions
              </p>
            </div>
            <div className='px-2'>
              {actions.map((action, index) => (
                <IconWithText
                  name={action.name}
                  key={index}
                  className='mt-[4px]'
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
