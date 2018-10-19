import { column } from '../components/CommonStyles.js';
import { Heading, Paragraph } from 'grommet';

const linkStyle = {};

const Shirt = () => (
  <div className="outer">
    <div className="inner" style={column}>
      <img src="/static/shirt.jpeg" />
      <aside>
        <Heading
          level={2}
          style={{ background: 'white', boxShadow: '0 0 3px white' }}
        >
          Our distinctives
        </Heading>
        <ul>
          <li>A custom fit for you</li>
          <li>Living wages for tailors</li>
          <li>100% salvaged fabric</li>
        </ul>
      </aside>
    </div>
    <style jsx>{`
      .outer {
        background: white;
        padding: 1rem 0;
      }
      .inner {
        position: relative;
        max-width: 480px !important;
      }

      img {
        margin: 0 auto;
      }
      aside {
        position: absolute;
        right: 0;
        top: 3rem;
      }
      @media (min-width: 500px) {
        aside {
          top: 0;
        }
      }
      h2,
      li {
        background: white;
        box-shadow: 0 0 3px white;
      }
    `}</style>
  </div>
);

export default Shirt;
