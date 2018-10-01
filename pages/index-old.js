import { column } from '../components/CommonStyles.js';
import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <article style={column}>
      <h1>Decent clothes for&nbsp;decent&nbsp;people.</h1>
      <p>Premium made-to-fit clothes from fairly-compensated Cambodian tailors.</p>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScDh6wGqKI2GFtbRMEX6JRLhQJlvBnzoyIPsEtihl21yycvDg/viewform?embedded=true"
        width="640"
        height="2343"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Loading...
      </iframe>
    </article>
    <style jsx>{`
      h1 {
        margin-top: 2rem;
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

// <p>How about paying for living wages instead of advertising?</p>

//   <form action="#">
//     <input type="email" placeholder="Your email" />
//     <button>Request Invite</button>
//   </form>

// const LinkToPost = ({ title, slug }) => (
//   <li>
//     <Link as={`/post/${slug}`} href={`/post?title=${title}`}>
//       <a>{title}</a>
//     </Link>
//   </li>
// );

// const LinkToShow = ({ id, name }) => (
//   <li key={id}>
//     <Link as={`/show/${id}`} href={`/show?id=${id}`}>
//       <a>{name}</a>
//     </Link>
//     <style jsx>{`
//       li {
//         font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
//         margin: 10px;
//       }

//       a {
//         text-decoration: none;
//         color: blue;
//       }

//       a:hover {
//         opacity: 0.6;
//       }
//     `}</style>
//   </li>
// );

// Index.getInitialProps = async function() {
//   const response = await fetch('https://api.tvmaze.com/search/shows?q=batman');
//   const shows = await response.json();

//   console.log('Shows:', shows.length);

//   return { shows };
// };

export default Index;
