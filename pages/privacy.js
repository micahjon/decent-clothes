import { column } from '../components/CommonStyles.js';
import Layout from '../components/MyLayout.js';
import { Box, Markdown } from 'grommet';

const Privacy = props => (
  <Layout pageTitle="Privacy Policy">
    <Box tag="article" pad="large">
      <Markdown>{props.content}</Markdown>
    </Box>
  </Layout>
);

Privacy.getInitialProps = async function() {
  const content = await require(`../content/privacy.md`);
  return { content };
};

export default Privacy;
