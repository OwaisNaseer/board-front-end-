import { Box, Typography } from '@mui/material';
export const PopoverData = ({ icon, label, onClick }) => {
  return (
    <Box
      component={'div'}
      onClick={onClick}
      display={'flex'}
      justifyContent={'start'}
      alignItems={'center'}
      width={'100%'}
      gap={1}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      }}
      className='hover:bg-lightGray/40 rounded py-0.5 px-1.5'
    >
      {icon ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          width={'20px'}
          pr={'4px'}
        >
          {icon}
        </Box>
      ) : (
        ''
      )}
      <Typography
        fontSize='14px'
        component={'p'}
        fontFamily={'Montserrat'}
        sx={{ ...label?.sx }}
      >
        {label?.text}
      </Typography>
    </Box>
  );
};
