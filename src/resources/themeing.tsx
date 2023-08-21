
import { extendTheme } from '@mui/joy/styles';
// import { Manrope } from '@next/font/google';

// import red from "@material-ui/core/colors/red";


// Create a theme instance.
const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // affects all Joy components that has `color="primary"` prop.
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fef2c4',
          300: '#fdc88a',
          500:"#CF9B3F",
          600:"#e3933f",
          700:"#cc8438",
          // 500:'#78350f',
          // 300, 400, ..., 800,
          900: '#78350f',
        },


      }
    }
  },

  
});

export default customTheme;
