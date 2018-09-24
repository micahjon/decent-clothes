import { column } from '../components/CommonStyles.js';

const linkStyle = {};

const Shirt = () => (
  <div className="outer">
    <div className="inner" style={column}>
      <img src="/static/shirt.jpeg" />
      <aside>
        <h2>Our distinctives</h2>
        <ul>
          <li>A great fit for you</li>
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
        max-width: 500px !important;
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
      }
    `}</style>
  </div>
);

export default Shirt;
