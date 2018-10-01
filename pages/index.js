import { connect } from 'react-redux';
import Layout from '../components/MyLayout.js';
import Shirt from '../components/Shirt.js';
import SignUp from '../components/SignUp.js';
import Measurements from '../components/Measurements.js';
import { Box, Heading, Paragraph } from 'grommet';

const mapStateToProps = ({ user }) => ({ user });

const Index = props => (
  <Layout>
    <Box align="center" pad="large">
      <Heading style={{ textAlign: 'center', marginBottom: 0 }}>
        Decent clothes for&nbsp;decent&nbsp;people.
      </Heading>
      <Paragraph style={{ textAlign: 'center' }}>
        Premium made-to-fit clothes from fairly-compensated Cambodian&nbsp;tailors.
      </Paragraph>
    </Box>

    <Shirt />

    {!props.user.isLoggedIn && <SignUp />}

    <Measurements />

    <style jsx>{`
      p {
        text-align: center;
        margin-bottom: 2rem;
      }
      ul {
        padding: 0;
        list-style: none;
      }
      iframe {
        max-width: 100%;
      }
    `}</style>
  </Layout>
);

export default connect(mapStateToProps)(Index);
