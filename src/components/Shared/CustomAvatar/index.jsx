// Library imports
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';

export const CustomAvatar = ({
  userName,
  role,
  reverse,
  avatarSX,
  userNameSx,
  noUrlNameSx,
  hideUsername,
  url,
}) => {
  const formatLabel = (key) => {
    return key? key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '):'';
  };

  return (
    <Box
      display={'flex'}
      flexDirection={reverse ? 'row-reverse' : 'row'}
      gap={1}
      justifyContent='start'
      alignItems='center'
    >
      <Box display={hideUsername ? 'none' : 'flex'} flexDirection='column'>
        <Typography
          fontSize='16px'
          component={'p'}
          fontFamily={'Montserrat'}
          sx={{ ...userNameSx }}
        >
          {formatLabel(userName)}
        </Typography>
        <Typography
          mt={'-2px'}
          fontSize={'10px'}
          fontWeight={400}
          variant='base'
          color='primary.darkGray'
          fontFamily={'Montserrat'}
        >
          {formatLabel(role)}
        </Typography>
      </Box>

      <Avatar
        alt={userName}
        src={url}
        sx={{
          width: 30,
          height: 30,
          bgcolor: 'primary.main',
          ...avatarSX,
        }}
      >
        {/* If no URL is provided, fallback to displaying the user's initial */}
        {!url && (
          <Typography
            variant='h6'
            sx={{
              fontSize: '14px',
              padding: 0,
              lineHeight: 0,
              ...noUrlNameSx,
            }}
          >
            {userName?.charAt(0).toUpperCase()}
          </Typography>
        )}
      </Avatar>
    </Box>
  );
};
