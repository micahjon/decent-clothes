import Layout from '../components/MyLayout.js';
import ReactMarkdown from 'react-markdown';

const About = props => (
  <Layout pageTitle="Our Story">
    <ReactMarkdown source={props.content} />
  </Layout>
);

About.getInitialProps = async function() {
  const content = await require(`../content/about.md`);
  return { content };
};

export default About;
