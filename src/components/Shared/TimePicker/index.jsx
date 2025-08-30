import { InputLabel, Stack, TextField } from '@mui/material';
import { LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker as Picker } from '@mui/x-date-pickers/TimePicker';
import { colors } from '../../../theme/globalVeriable';

export const TimePicker =
  () =>
  ({
    value,
    label,
    name,
    disablePast,
    onChange,
    sx,
    variant = 'outlined',
    error,
  }) => {
    const labelId = `${name}-label`;
    return (
      <div className='w-full relative'>
        {label && (
          <InputLabel
            htmlFor={labelId}
            shrink
            className='custom-input-label'
            sx={{
              fontFamily: 'sans-serif',

              fontSize: '12px',
              color: error ? colors.danger : colors.inputTitle,
              '&.Mui-focused': {
                color: error ? colors.danger : colors.inputTitle,
              },
              '&.Mui-disabled': { color: colors.inputPlaceholder },

              position: 'absolute',
              top: '-6px',
              left: '12px',
              backgroundColor: 'white',
              padding: '0 4px',
              zIndex: 1,
              transform: 'none',
              lineHeight: '1',
            }}
          >
            {label}
          </InputLabel>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={0}>
            <Picker
              labelId={labelId}
              value={value}
              disablePast={disablePast}
              onChange={onChange}
              slots={{ textField: TextField }}
              enableAccessibleFieldDOMStructure={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              slotProps={{
                textField: {
                  error: Boolean(false),
                  size: 'small',
                  variant,
                  sx: {
                    ...sx,
                    '& .MuiInputBase-input': {
                      height: 21,
                    },
                    '& .MuiInputLabel-root': {
                      marginBottom: '0px',
                    },
                  },
                  id: 'inputDate',
                },
              }}
            />
          </Stack>
        </LocalizationProvider>
      </div>
    );
  };
