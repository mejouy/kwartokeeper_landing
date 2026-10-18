import { createTheme } from '@mui/material/styles';

// KwartoKeeper Brand Guideline Sheet
export const BRAND = {
  charcoal: '#202020', // primary dark
  orange: '#ff4500', // primary accent, call-to-action buttons
  gray: '#545454', // borders, secondary icons
  cream: '#f2e9dd', // cards, panels
  blue: '#cadcf6', // info banners, secondary buttons
};

const HEAD = '"Inter", "Helvetica Neue", Arial, sans-serif'; // headings, buttons, nav
const BODY = '"Open Sans", "Helvetica Neue", Arial, sans-serif'; // body text

const theme = createTheme({
  palette: {
    primary: { main: BRAND.orange, dark: '#d93a00', contrastText: '#ffffff' },
    secondary: { main: BRAND.blue, contrastText: BRAND.charcoal },
    text: { primary: BRAND.charcoal, secondary: BRAND.gray },
    background: { default: '#fcfaf7', paper: '#ffffff' },
    divider: '#e7ded1',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: BODY,
    h1: { fontFamily: HEAD, fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.02 },
    h2: { fontFamily: HEAD, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.08 },
    h3: { fontFamily: HEAD, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25 },
    button: { fontFamily: HEAD, fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
    overline: { fontFamily: HEAD, fontWeight: 700, letterSpacing: '0.14em', lineHeight: 1.5 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth', scrollPaddingTop: 92 },
        body: { WebkitFontSmoothing: 'antialiased' },
        img: { maxWidth: '100%', display: 'block' },
        'h1, h2, h3': { textWrap: 'balance' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 10, paddingInline: 22, paddingBlock: 11, fontSize: 16 } },
    },
  },
});

export default theme;