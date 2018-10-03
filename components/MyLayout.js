import Head from 'next/head';
import Nav from './Nav';
import { Grommet, Box } from 'grommet';
import './global-styles.scss';

const fontSize = '15px';

var accentColors = ['#2AD2C9', '#614767', '#ff8d6d'];
var neutralColors = ['#425563', '#5F7A76', '#80746E', '#767676'];
var statusColors = {
  critical: '#F04953',
  error: '#F04953',
  warning: '#FFD144',
  ok: '#01a982',
  unknown: '#CCCCCC',
  disabled: '#CCCCCC'
};

var colors = {
  brand: '#01a982',
  focus: accentColors[0]
};

var colorArray = function colorArray(array, prefix) {
  return array.forEach(function (color, index) {
    colors[prefix + '-' + (index + 1)] = color;
  });
};

colorArray(accentColors, 'accent');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach(function (color) {
  colors['status-' + color] = statusColors[color];
});

const hpe = {
  global: {
    colors: colors,
  },
  anchor: {
    textDecoration: 'underline',
    color: '#000000'
  },
  button: {
    border: {
      radius: '0px'
    },
    colors: {
      accent: '#ff8d6d',
      secondary: 'rgba(51,51,51,0.6)'
    },
    extend: 'letter-spacing: .75px;'
  },
  icon: {
    colors: colors
  },
  paragraph: {
    extend: `font-size: ${fontSize};`,
  }
}

// console.log(hpe)

const copyright = `© ${new Date().getFullYear()} Decent Clothes`;

const Layout = props => (
  <Grommet theme={hpe} style={{fontSize}}>
    <Head>
      <title>
        {props.pageTitle ? `${props.pageTitle} | ` : ''}
        Decent Clothes
      </title>
    </Head>
    <Nav {...props} />
    {props.children}
    <Box align="center" pad="large" style={{ borderTop: '1px solid #f5f5f5', color: '#999' }}>
      {copyright}
    </Box>
  </Grommet>
);

export default Layout;
