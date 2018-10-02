import { Box, Heading, Paragraph, Markdown } from 'grommet';

const OrderForm = props => (
  <Box pad="large">
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSeTO1iR7g66jythAdnq1jQIuMTCRVWo32GpOqu-k930xviAfQ//viewform?embedded=true"
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
  </Box>
);

export default OrderForm;
