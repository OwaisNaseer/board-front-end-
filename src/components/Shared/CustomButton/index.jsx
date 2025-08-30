import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

export const CustomButton = ({
  variant = 'contained',
  onClick,
  disabled,
  loading,
  children,
  sx,
  type,
  className,
}) => {
  return (
    <Button
      variant={variant}
      onClick={disabled || loading ? null : onClick}
      disabled={disabled}
      type={type || 'submit'}
      className={className}
      sx={{
        textTransform: 'none',
        height: '35px',
        display: 'flex !important',
        textWrap: 'nowrap',
        alignItems: 'center',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        '&:disabled': {
          color: 'white',
          backgroundColor: 'primary.main',
          opacity: '0.5',
        },
        ...sx,
      }}
    >
      {loading ? (
        <div className='flex items-center gap-1'>
          {children}
          <CircularProgress size={16} className='!text-white' />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
