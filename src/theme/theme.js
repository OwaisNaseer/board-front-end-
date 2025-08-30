import { createTheme } from '@mui/material/styles';
import { breakPoints, colors } from './globalVeriable';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryMain,
      light: colors.primaryLight,
      dark: colors.primaryDark,
    },
    secondary: {
      main: colors.secondaryMain,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
    },
    error: {
      main: colors.danger,
    },
    success: {
      main: colors.success,
    },
    custom: {
      input: {
        main: colors.input,
        hover: colors.inputHover,
        active: colors.inputActive,
        placeholder: colors.inputPlaceholder,
        disabled: colors.inputDisabled,
        title: colors.inputTitle,
      }
    },


    text: {
      primary: colors.foregroundPrimary,
      secondary: colors.greyPrimary,
      disabled: colors.inputDisabled,
    },
    background: {
      default: colors.white,
      paper: colors.neutral200,
    },
    common: {
      black: colors.black,
      white: colors.white,
    },
    grey: {
      50: colors.neutral200,
      100: colors.neutral300,
      200: colors.neutral400,
      300: colors.neutral500,
      400: colors.neutral600,
      500: colors.neutral900,
      600: colors.neutral1000,
      700: colors.neutral1100,
      800: colors.neutral1200,
      900: colors.neutral1300,
      A100: colors.coolGrey200,
      A200: colors.coolGrey600,
      A400: colors.coolGrey800,
      A700: colors.coolGrey900,
      A800: colors.coolGrey1000,
      A900: colors.coolGrey1100,
    },
    blue: {
      50: colors.blue100,
      100: colors.blue200,
      200: colors.blue300,
      500: colors.blue900,
      700: colors.blue1000,
      900: colors.blue1200,
    },
    green: {
      500: colors.green500,
      800: colors.green800,
    },
    red: {
      500: colors.red500,
      800: colors.red800,
    },
    teal: {
      300: colors.teal300,
    },
    action: {
      active: colors.inputActive,
      hover: colors.inputHover,
      disabled: colors.inputDisabled,
      disabledBackground: colors.inputDisabled,
    },
    divider: colors.lightGray,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 14,
    h1: { fontFamily: '"JetBrains Mono", monospace' },
    h2: { fontFamily: '"JetBrains Mono", monospace' },
    h3: { fontFamily: '"JetBrains Mono", monospace' },
    h4: { fontFamily: '"JetBrains Mono", monospace' },
    h5: { fontFamily: '"JetBrains Mono", monospace' },
    h6: { fontFamily: '"JetBrains Mono", monospace' },
    body1: { fontSize: '14px' },
    body2: { fontSize: '12px' },
  },
  breakpoints: {
    values: {
      zero: breakPoints.zero,
      xxs: breakPoints.xxs,
      xs: breakPoints.xs,
      sm: breakPoints.sm,
      smd: breakPoints.smd,
      md: breakPoints.md,
      base: breakPoints.base,
      lg: breakPoints.lg,
      xl: breakPoints.xl,
      xxl: breakPoints.xxl,
      xxxl: breakPoints.xxxl,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: colors.foregroundPrimary,
            backgroundColor: 'input.main', 
            '&:hover': {
              backgroundColor: 'input.hover',
            },
            '&:focus': {
              backgroundColor: 'input.active',
            },
            '&::placeholder': {
              color: 'input.placeholder',
            },
            '&.Mui-disabled': {
              backgroundColor: 'input.disabled',
              color: 'input.title',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          textTransform: 'none',
          '&.MuiButton-containedPrimary': {
            background: colors.linearLight,
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: 'secondary.main',
            '&:hover': {
              backgroundColor: 'secondary.dark',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: colors.linearLight,
        },
      },
    },
  },
});