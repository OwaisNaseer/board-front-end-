import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { colors } from "../../../theme/globalVeriable";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputLabel } from "@mui/material";

export const DatePicker = ({
  label,
  fullWidth,
  size,
  onChange,
  name,
  value,
  className,
  helperText,
  color,
  disablePast,
  error,
  PopperProps,
  sx,
  variant = "outlined",
  errorMsg
}) =>{
     const labelId = `${name}-label`;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="relative flex flex-col">
          {label && (
          <InputLabel
            htmlFor={labelId}
            shrink
            className="custom-input-label"
            sx={{
              fontFamily: 'sans-serif',
             
              fontSize: '12px',
              color: error ? colors.danger : colors.inputTitle,
              '&.Mui-focused': { color: error ? colors.danger : colors.inputTitle },
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
        <DesktopDatePicker
         labelId={labelId}
          value={value}
          name={name}
          onChange={onChange}
          disablePast={disablePast}
          PopperProps={PopperProps}
          enableAccessibleFieldDOMStructure={false}
          slots={{ textField: TextField }}
          slotProps={{
            textField: {
              fullWidth,
              size,
              helperText,
              className,
              color,
              error: Boolean(error),
              variant,
           sx: {
  ...sx,
  "& .MuiInputBase-root": {
    minHeight: "36px", 
    height: { xs: 36, sm: 40 },
    padding: "0", 
     borderRadius: "4px",
    boxSizing: "border-box",
    overflow: "hidden", 
  },
  "& .MuiOutlinedInput-input": {
    padding: "8px 12px", 
    fontSize: "14px",
  },
  "& .MuiInputLabel-root": {
    color: error ? colors.danger : "",
    marginBottom: "0px",
  },
    "& .MuiInputAdornment-root": {
    marginRight: "4px",
  },

  "& .MuiIconButton-root": {
    padding: "4px", 
    marginRight: "0px", 
  },

  "& .MuiSvgIcon-root": {
    fontSize: "18px", 
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: colors.danger,
    marginTop: "0px",
    position: "absolute",
    top: 40,
    fontSize: "11px",
    paddingRight: "10px",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
   popper: {
    modifiers: [
      {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
      },
    ],
  },
}

            },
          }}
        />
       {errorMsg && (
          <span className="text-[11px] text-danger ml-1 block absolute top-[40px]">
            {errorMsg}
          </span>
        )}
      </div>
    </LocalizationProvider>
  );
}
