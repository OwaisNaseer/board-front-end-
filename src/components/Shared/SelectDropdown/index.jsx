import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { theme } from '../../../theme/theme';

const colors = theme.palette.custom.input;

export const SelectDropdown = ({
  label = 'date',
  value = '',
  name,
  onChange,
  disabled = false,
  error = false,
  errorMsg = '',
  placeholder = 'Click to select',
  options = [], 
  sx = {},
}) => {
  const labelId = `${name}-label`;

  const normalizedValue = typeof value === 'object' && value !== null ? value.value ?? '' : value ?? '';

  const handleChange = (event) => {
    const selectedValue = event.target.value;

    const selectedOption = options.find((opt) => opt.value === selectedValue);
const returnValue = selectedOption ? selectedOption : selectedValue;
    onChange?.({
      ...event,
      target: { ...event.target, name, value: returnValue },
    });
  };

  return (
    <div className="custom-input-container relative w-full min-w-[180px]">
      <FormControl fullWidth disabled={disabled} error={error}>
        {label && (
          <InputLabel
            htmlFor={labelId}
            shrink
            className="custom-input-label"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '12px',
              color: error ? colors.danger : colors.inputPlaceholder,
              '&.Mui-focused': { color: error ? colors.danger : colors.inputPlaceholder },
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
        <Select
          labelId={labelId}
          id={labelId}
          displayEmpty
          value={normalizedValue}
          name={name}
          onChange={handleChange}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <em
                  style={{
                    color: colors.inputPlaceholder,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {placeholder}
                </em>
              );
            }
            const option = options.find((opt) => opt.value === selected);
            return (
              <span
                style={{
                  color: colors.inputPlaceholder,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {option ? option.label : selected}
              </span>
            );
          }}
          inputProps={{
            style: {
              padding: '8px 40px 8px 12px',
            },
          }}
          sx={{
            height: { xs: '36px', sm: '40px' },
            minWidth: '180px',
            width: '100%',
            '& .MuiSelect-select': {
              fontSize: '14px',
              fontFamily: '"Inter", sans-serif',
              color: colors.inputPlaceholder,
              padding: '0',
              paddingLeft: '10px',
            },
            backgroundColor: disabled ? colors.inputDisabled : colors.white,
            borderRadius: '4px',
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? colors.danger : colors.input,
              borderWidth: '1px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? colors.danger : colors.inputHover,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? colors.danger : colors.inputActive,
              borderWidth: '1px',
            },
            ...sx,
          }}
        >
          <MenuItem
            value=""
            sx={{
              fontSize: '14px',
              fontFamily: '"Inter", sans-serif',
              color: colors.inputPlaceholder,
              fontStyle: 'normal',
              '&.Mui-selected': {
                color: colors.inputPlaceholder,
                backgroundColor: colors.white,
                fontStyle: 'normal',
              },
              '&:hover': {
                backgroundColor: colors.inputHover + '20',
              },
            }}
          >
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                fontSize: '14px',
                fontFamily: '"Inter", sans-serif',
                color: colors.inputPlaceholder,
                fontStyle: 'normal',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '&.Mui-selected': {
                  color: colors.inputPlaceholder,
                  backgroundColor: colors.inputHover + '30',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: colors.inputHover + '40',
                  },
                },
                '&:hover': {
                  backgroundColor: colors.inputHover + '20',
                },
              }}
            >
              <span>{option.label}</span>
              {normalizedValue === option.value && (
                <CheckIcon sx={{ fontSize: '16px', color: colors.inputActive }} />
              )}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <span className="text-[11px] text-danger ml-1 block absolute top-[40px]">
            {errorMsg}
          </span>
        )}
      </FormControl>
    </div>
  );
};