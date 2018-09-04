import Header from './Header';

const style = {
  margin: '1em auto',
  width: 'calc(100% - 2rem)',
  maxWidth: 800,
};

const Layout = props => (
  <div style={style}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
