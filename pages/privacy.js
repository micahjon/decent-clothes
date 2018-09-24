import { column } from '../components/CommonStyles.js';
import Layout from '../components/MyLayout.js';
import ReactMarkdown from 'react-markdown';

const Privacy = props => (
  <Layout pageTitle="Privacy Policy">
    <article style={column}>
      <ReactMarkdown source={props.content} />
    </article>
  </Layout>
);

Privacy.getInitialProps = async function() {
  const content = await require(`../content/privacy.md`);
  return { content };
};

export default Privacy;
