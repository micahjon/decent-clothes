import { column } from '../components/CommonStyles.js';
import { Box, Heading, Paragraph, Markdown } from 'grommet';

const text = `
Enter your measurements below, and we'll email you once we're ready to take orders!

Learn how to take measurements <a href="https://propercloth.com/reference/dress-shirt-body-measurements/" target="_blank">here</a>.

A measuring tape (or string + ruler) is all you need, but a friend can help things go faster.
`;

const Measurements = props => (
  <Box pad="large">
    <Heading level={2} style={{ marginBottom: 0 }}>
      What's your perfect fit?
    </Heading>
    <Markdown>{text}</Markdown>
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
    <style jsx>{`
      * {
        text-align: center;
      }
      iframe {
        max-width: 100%;
      }
    `}</style>
    {/* <form name="measurements" method="POST" netlify netlify-honeypot="bot-field"> */}
    {/*   <p> */}
    {/*     <label> */}
    {/*       Your Name: <input type="text" name="name" /> */}
    {/*     </label> */}
    {/*   </p> */}
    {/*   <p> */}
    {/*     <label> */}
    {/*       Your Email: <input type="email" name="email" /> */}
    {/*     </label> */}
    {/*   </p> */}
    {/*   <p> */}
    {/*     <label> */}
    {/*       Message: <textarea name="message" /> */}
    {/*     </label> */}
    {/*   </p> */}
    {/* </form> */}
  </Box>
);

export default Measurements;
