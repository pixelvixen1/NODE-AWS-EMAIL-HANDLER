module.exports = {
  mode: 'jit',
  theme: {
    screens: {
      all: {raw: 'screen'},
      sm: {max: '525px'},
    },
    extend: {
      colors: {
        inherit: 'inherit',
        slate: {
          body: '#f0f3f5',
          body2: '#e1e6e9',
          body1: '#e6e6e6',
          darkbg: '#383838',
          boxbg: '#424345',
          lighttext: '#f0f3f5',
          white: '#ffffff',
          black: '#2e2f30',
          dark: '#666666',
          grey : '#777777', // footer legals
          btnbg: '#424345', //button bg 
          btnhover: '#cf2e2e', //button bg mouse over
          linkhover: '#fcb900', //links hover
          linkhover2: '#0693e3', // footer nav
        },
      },
      spacing: {
        screen: '100vw',
        full: '100%',
        px: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
        6: '6px',
        7: '7px',
        8: '8px',
        9: '9px',
        10: '10px',
        11: '11px',
        12: '12px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        25: '25px',
        26: '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        35: '35px',
        36: '36px',
        40: '40px',
        45: '45px',
        48: '48px',
        50: '50px',
        60: '60px',
        70: '70px',
        115: '115px',
        100: '100px',
        130: '130px',
        140: '140px',
        150: '150px',
        170: '170px',
        180: '180px',
        200: '200px',
        240: '240px',
        325: '325px',
        350: '350px',
        385: '385px',
        500: '500px',
        600: '600px',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },
      fontFamily: {
        work: ['"Work Sans"', 'Arial', 'Helvetica', 'sans-serif'],
        sans: ['sans-serif','-apple-system', '"Segoe UI"'],
        serif: ['Constantia', 'Georgia', 'serif'],
        mono: ['Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        0: '0',
        xxs: '12px',
        xs: '13px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        17: '17px',
        18: '18px',
        19: '19px',
        20: '20px',
        22: '22px',
        24: '24px',
        '2xl': '22px',
        '3xl': '24px',
        '32px': '32px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
        '7xl': '72px',
        '8xl': '96px',
        '9xl': '128px',
      },
      inset: theme => ({
        ...theme('spacing'),
      }),
      letterSpacing: theme => ({
        tighter: '-2px',
        tight: '-1px',
        normal: '0',
        wide: '1px',
        wider: '2px',
        loose: '4px',
        ...theme('spacing'),
      }),
      lineHeight: theme => ({
        ...theme('spacing'),
      }),
      maxHeight: theme => ({
        ...theme('spacing'),
      }),
      maxWidth: theme => ({
        ...theme('spacing'),
        xs: '160px',
        sm: '192px',
        md: '224px',
        lg: '256px',
        xl: '288px',
        '2xl': '336px',
        '3xl': '384px',
        '4xl': '448px',
        '5xl': '512px',
        '6xl': '576px',
        '7xl': '640px',
      }),
      minHeight: theme => ({
        ...theme('spacing'),
      }),
      minWidth: theme => ({
        ...theme('spacing'),
      }),
    },
  },
  corePlugins: {
    animation: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    textOpacity: false,
  },
}
