import { Box, Heading, Paragraph, Markdown } from 'grommet';
import SizeForm from './SizeForm';

const text = `
Just enter the sizes you know, and we'll take things from there.

As you buy shirts, you'll be able to tweak each value to make your custom fit even better!
`;

const Measurements = props => (
  <Box pad={{ vertical: 'large' }}>
    <Markdown>{text}</Markdown>
    <SizeForm />
    <style jsx>{``}</style>
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
