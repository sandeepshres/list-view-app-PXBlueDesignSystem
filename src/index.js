import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as PXBThemes from '@pxblue/themes/react';
require('typeface-open-sans');

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
      <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
