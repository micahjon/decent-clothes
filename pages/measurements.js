import Layout from '../components/MyLayout.js';
import { Box, Heading } from 'grommet';
import Measurements from '../components/Measurements.js';

const MeasurementsPage = props => (
  <Layout pageTitle="Our Story">
    <Box tag="article" pad="large" align="center">
      <Heading style={{ marginBottom: 0 }}>What's your perfect fit?</Heading>
      <Measurements />
    </Box>
  </Layout>
);

export default MeasurementsPage;
