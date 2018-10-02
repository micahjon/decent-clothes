import Layout from '../components/MyLayout.js';
import { Box, Heading } from 'grommet';
import OrderForm from '../components/OrderForm.js';

const Order = props => (
  <Layout pageTitle="Our Story">
    <Box tag="article" pad="large" align="center">
      <Heading style={{ marginBottom: 0 }}>Place an Order</Heading>
      <OrderForm />
    </Box>
  </Layout>
);

export default Order;
