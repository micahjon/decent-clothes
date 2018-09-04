import Layout from '../components/MyLayout.js';
// import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

const Show = props => (
  <Layout>
    <Content show={props.show} />
  </Layout>
);

const Content = ({ show }) => (
  <div>
    <h1>{show.name}</h1>
    <p>{show.summary.replace(/<[^>]+>/g, '')}</p>
    <img src={show.image.medium} alt="Poster" />
  </div>
);

Show.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Show;
