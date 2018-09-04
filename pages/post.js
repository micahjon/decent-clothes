import Layout from '../components/MyLayout.js';
import { withRouter } from 'next/router';

const Post = withRouter(props => (
  <Layout>
    <Content title={props.router.query.title} />
  </Layout>
));

const Content = ({ title }) => (
  <div>
    <h1>Post: {title}</h1>
    <p>This is a post!</p>
  </div>
);

export default Post;
