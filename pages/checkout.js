import Layout from '../components/MyLayout.js';
import { Box, Markdown, Button, Heading } from 'grommet';
import StripeCheckout from 'react-stripe-checkout';
import fetch from 'unfetch';

const markdown = `

#Hey guys, thanks for buying a shirt!

<img src="/static/micah-thumbs-up.jpg" title="Eeeyyyyy" style="float: right; width: 200px; margin: 0 0 0 2em;">

Cambodia -> Kansas -> <b>Portland</b> -> Your House

I just got your tailored shirt in the mail, and will ship it as soon as you pay the $40. 

When you get it, let me know if there are any areas with room for improvement. Really appreciate your support on round one!

\\- Micah & Martin
`;

class Privacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPaid: false,
        };
    }

    onToken(token) {
        console.log('got token', token);
        this.setState({ hasPaid: true });
        // fetch('/save-stripe-token', {
        //     method: 'POST',
        //     body: JSON.stringify(token),
        // }).then(response => {
        //     response.json().then(data => {
        //         alert(`We are in business, ${data.email}`);
        //         this.setState({ hasPaid: true });
        //     });
        // });
    }

    render() {
        const {
            props, state,
        } = this;

        return (
            <Layout pageTitle="Checkout">
                <Box tag="article" pad="large" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    {state.hasPaid ?
                        (<Heading style={{ textAlign: 'center' }}>Thanks!</Heading>) :
                        (<React.Fragment>
                            <Markdown>{markdown}</Markdown>
                            <StripeCheckout
                                name="Decent Clothes"
                                description="A Decent Shirt"
                                amount={4000} // cents
                                token={this.onToken.bind(this)}
                                stripeKey="pk_live_lcJwNj0APV6Qumn7I6XW1AdL"
                                shippingAddress
                            >
                                <Button primary plain={false}>Pay for Shirt</Button>
                            </StripeCheckout>
                        </React.Fragment>)
                    }
                </Box>
            </Layout>
        );
    }
}

export default Privacy;
