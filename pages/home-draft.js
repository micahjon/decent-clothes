import { column } from '../components/CommonStyles.js';
import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import Shirt from '../components/Shirt.js';
import SignUp from '../components/SignUp.js';

const Index = props => (
  <Layout>
    <div style={column}>
      <h1>Decent clothes for&nbsp;decent&nbsp;people.</h1>
      <p>Premium made-to-fit clothes from fairly-compensated Cambodian&nbsp;tailors.</p>
    </div>

    <Shirt />

    <SignUp />

    <style jsx>{`
      h1 {
        text-align: center;
        margin-top: 2rem;
      }
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

export default Index;
