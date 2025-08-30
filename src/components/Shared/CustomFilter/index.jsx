import { CustomPopover } from '../../../components/Shared';
import { FilterIcon } from '../../../assets/icons';

const CustomFilter = ({
  className = '',
  open,
  setOpen,
  handleClear,
  children,
}) => {
  return (
    <div className={` ${className}`}>
      <CustomPopover
        open={open}
        onOpenChange={setOpen}
        trigger={
          <div className='cursor-pointer flex items-center gap-1 text-primary'>
            <FilterIcon  />
            {/* <span className='text-sm'> Filter</span> */}
          </div>
        }
      >
        <div className='bg-white rounded-lg border border-neutral-400 shadow-lg p-4 flex flex-col gap-3 w-[250px]'>
          <div className='flex items-center justify-between'>
            <p className=' text-sm'>Filter Options</p>
            <p
              onClick={handleClear}
              className=' cursor-pointer font-semibold text-sm text-danger'
            >
              Clear
            </p>
          </div>
          {children && (
            <div className='flex flex-col gap-4 overflow-auto max-h-[400px] min-h-[100px]'>
              {children}
            </div>
          )}
        </div>
      </CustomPopover>
    </div>
  );
};

export default CustomFilter;
