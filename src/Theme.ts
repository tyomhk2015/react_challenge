import { DefaultTheme } from 'styled-components';

const defaultTheme: DefaultTheme = {
  textColor: '#333',
  bgColor: 'bisque',
  accentColor: 'red',
  tableBgColor: 'none',
  tableTextColor: 'white',
}

const darkTheme: DefaultTheme = {
  textColor: 'white',
  bgColor: '#333345',
  accentColor: 'aqua',
  tableBgColor: 'white',
  tableTextColor: 'white',
}

export {defaultTheme, darkTheme}