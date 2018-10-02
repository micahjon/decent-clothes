import { column } from '../components/CommonStyles.js';
import Layout from '../components/MyLayout.js';
import { Box, Markdown } from 'grommet';

const renderers = {
  heading: ({ level, children }) => {
    const tag = `h${level}`;
    console.log('heading tag', tag);
    return <Heading>{children}</Heading>;
  },
};

const Account = props => (
  <Layout pageTitle="Our Story">
    <Box tag="article" pad="large" align="center">
      test
    </Box>
  </Layout>
);

export default Account;
