const reactToolboxVariables = {
  'color-accent': '#00aeff',
  'color-accent-contrast': '#fff',
  'color-accent-dark': '#0091ea',
  'color-divider': '#e0e0e0',
  'color-primary': '#651fff',
  'color-primary-contrast': '#fff',
  'color-primary-dark': '#311b92',
  'color-text': 'rgba(0, 0, 0, 0.87)',
  'color-text-secondary': 'rgba(0, 0, 0, 0.54)',
  'font-size': '14px',
  'font-size-big': '16px',
  'font-size-small': '12px',
  'font-size-tiny': '10px',
  'font-weight-bold': '800',
  'font-weight-semi-bold': '600',
  'input-text-required-color': '#f50057',
  'preferred-font':
    '"Proxima Nova", -apple-system, BlinkMacSystemFont, "Segoe UI",' +
    'Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  'snackbar-color-accept': '#68f5ca !important',
  'snackbar-color-warning': '#b388ff !important',
  'snackbar-color-cancel': '#f50057 !important',
  'tooltip-background': 'rgba(0, 0, 0, 0.54)',
};

module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-preset-env': {
      stage: 0,
      features: {
        'custom-properties': {
          preserve: false,
          variables: reactToolboxVariables,
        },
      },
    },
  },
};
