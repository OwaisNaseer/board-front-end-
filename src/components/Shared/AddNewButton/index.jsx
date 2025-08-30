import { AddIcon } from '../../../assets/icons';
import { CustomButton } from '../CustomButton';

const AddNewButton = ({ onClick, text,isSearchOpen }) => {
  return (
    <CustomButton
      sx={{
        display: {
          xs: isSearchOpen ? 'none' : 'block',
          sm: 'block',
        },
      }}
      className={`!h-[28px] sm:!h-[33px] !font-normal bg-primary/80 !py-0 !w-fit !min-w-fit !px-2 sm:!pr-[12px]`}
      onClick={onClick}
    >
      <div className='flex items-center justify-center gap-1 text-white'>
        <AddIcon height={19} width={19} />
        <span className='hidden sm:block'>{text}</span>
      </div>
    </CustomButton>
  );
};

export default AddNewButton;
