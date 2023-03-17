// const Header = () => {}
import { Box, Text, Heading, UnorderedList, ListItem, Card, CardBody, CardFooter, CardHeader, Flex, Button } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import useRazorpay from 'react-razorpay';
import { matrixPlans } from '../../data/plans';
import axios from 'axios';

import './Home.css'


const Home = () => {
    // console.log(process.env.REACT_APP_STRIPE_PUBLISH_KEY)
    const Razorpay = useRazorpay();

    const createOrder = async (plan) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/order/create`, {
                palnId: plan.id
            })
            console.log('response', response)
            if (response.data) {

                return response.data;
            }
            return false;
        } catch (error) {
            return false
        }
    }

    const handlePayment = async (params) => {
        const order = await createOrder(params); //  Create order on your backend

        const options = {
            key: process.env.REACT_APP_RAZOR_PAY_ID, // Enter the Key ID generated from the Dashboard
            amount: params.price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            image: "https://example.com/your_logo",
            order_id: order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
            },
            prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();
    };

    return (
        <Box maxW='9xl'>
            <Box as='section' display='grid' placeItems='center' height='88vh'>
                <Box textAlign='center'>
                    <Heading as='h2' size='xl' textTransform='capitalize' letterSpacing={-1}>Trade smarter, not harder with</Heading>
                    <Heading as='h1' _hover={{ color: '#f00' }} size='4xl' fontWeight='black' marginBottom='8' letterSpacing={-3}>Matrix Traders</Heading>
                    <Text maxW={500}>
                        We at Matrix Traders, ensure that our client base also understands the reasoning behind trades and
                        not just the results. With this opportunity at hand
                    </Text>
                </Box>
            </Box>

            <Box as='section' display='grid' placeItems='center' height='100vh'>
                <Box textAlign='center'>

                    <Heading as='h2' marginBottom='7' size='xl'>Why Choose Matrix Traders?</Heading>
                    <UnorderedList maxW='xl' spacing={2} listStyleType='none'>
                        <ListItem fontSize={18}>
                            <Text as='span'>YOUR CAPITAL : </Text>
                            <Text as='span'>Matrix Traders is for retailers with a low budget, low risk bearing
                                capacity and
                                high returns :)</Text>
                        </ListItem>
                        <ListItem fontSize={18}>
                            <Text as='span'>
                                TRUSTED FIRM :
                            </Text>
                            <Text as='span'>
                                Backed by our community of satisfied traders.
                            </Text>
                        </ListItem>
                        <ListItem fontSize={18}>
                            <Text as='span'>
                                SUCCESS RATE :
                            </Text>
                            <Text as='span'>
                                A hit ratio of 79% lets you do stress-free trading with us!
                            </Text>
                        </ListItem>
                        <ListItem fontSize={18}>
                            <Text as='span'>
                                STRATEGIES :
                            </Text>
                            <Text as='span'>
                                Backtested in all markets, our strategies are always trustworthy.
                            </Text>
                        </ListItem>
                        <ListItem fontSize={18}>
                            <Text as='span'>
                                PREFERENCES :
                            </Text>
                            <Text as='span'>
                                We focus on your capital growth, small stoplosses and high Risk to Reward ratios
                                ensure it!
                            </Text>
                        </ListItem>
                        <ListItem fontSize={18}>
                            <Text as='span'>
                                BEST IN THE MARKET :
                            </Text>
                            <Text as='span'>
                                The results of our trades speak for themselves!
                            </Text>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </Box>

            <Box as='section' display='grid' placeItems='center' height='50vh'>
                <Box textAlign='center'>
                    <Heading as='h2' size='xl' marginBottom={7}>What We Provide?</Heading>
                    <UnorderedList maxW='xl' spacing={2} listStyleType='none'>
                        <ListItem fontSize={21}>Strategies with minimum loss and maximum reward.</ListItem>
                        <ListItem fontSize={21}>Trades for Nifty, Banknifty and Finnifty.</ListItem>
                        <ListItem fontSize={21}>Logic behind all trades.</ListItem>
                        <ListItem fontSize={21}>Personal guidance.</ListItem>
                    </UnorderedList>
                </Box>
            </Box>

            <Box as='section' display='grid' placeItems='center' height='auto'>
                <Box textAlign='center'>
                    <Heading as='h2' size='xl' marginBottom={7}>Plans</Heading>
                    <Flex flexWrap='wrap' justifyContent='center'>
                        {
                            matrixPlans.map(plan => (
                                <Card width={200} key={plan.id} margin='6' variant='filled'>
                                    <CardHeader>
                                        <Flex>
                                            <Box>
                                                <Heading as='p' size='md'>{plan.month}</Heading>
                                                <Heading as='h2' size='xl'>₹{plan.price}</Heading>
                                                <Text fontSize='lg' as='del'>₹{plan.originalPrice}</Text>
                                            </Box>
                                            <Box borderRadius='full' lineHeight={0.8} width={50} height={50} background='red.500' position='absolute' top={2} right={2} noOfLines={2}>
                                                <Flex height='inherit' alignItems='center' justifyContent='center'>
                                                    <Text size='sm' fontWeight='500' color='whiteAlpha.900'>
                                                        {plan.discount}% off
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                        <Button marginTop={5} width='full' onClick={() => handlePayment(plan)} background='whatsapp.400' _hover={{ background: 'whatsapp.600' }} color='whiteAlpha.900'>Enroll</Button>
                                    </CardHeader>
                                </Card>
                            ))
                        }
                        {/* 
                        <Card width={200} margin='6' variant='filled'>
                            <CardHeader>
                                <Flex>
                                    <Box>
                                        <Heading as='p' size='md'>3 Month</Heading>
                                        <Heading as='h2' size='xl'>₹2,499</Heading>
                                        <Text fontSize='lg' as='del'>₹3,650</Text>
                                    </Box>
                                    <Box borderRadius='full' lineHeight={0.8} width={50} height={50} background='red.500' position='absolute' top={2} right={2} noOfLines={2}>
                                        <Flex height='inherit' alignItems='center' justifyContent='center'>
                                            <Text size='sm' fontWeight='500' color='whiteAlpha.900'>
                                                31% off
                                            </Text>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Button marginTop={5} width='full' background='whatsapp.400' _hover={{ background: '#52f731' }} color='whiteAlpha.900'>Enroll</Button>
                            </CardHeader>
                        </Card>
                        <Card width={200} margin='6' variant='filled'>
                            <CardHeader>
                                <Flex>
                                    <Box>
                                        <Heading as='p' size='md'>6 Month</Heading>
                                        <Heading as='h2' size='xl'>₹4,999</Heading>
                                        <Text fontSize='lg' as='del'>₹10,000</Text>
                                    </Box>
                                    <Box borderRadius='full' lineHeight={0.8} width={50} height={50} background='red.500' position='absolute' top={2} right={2} noOfLines={2}>
                                        <Flex height='inherit' alignItems='center' justifyContent='center'>
                                            <Text size='sm' fontWeight='500' color='whiteAlpha.900'>
                                                50% off
                                            </Text>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Button marginTop={5} width='full' background='whatsapp.400' _hover={{ background: '#52f731' }} color='whiteAlpha.900'>Enroll</Button>
                            </CardHeader>
                        </Card>
                        <Card width={200} margin='6' variant='filled'>
                            <CardHeader>
                                <Flex>
                                    <Box>
                                        <Heading as='p' size='md'>Life Time</Heading>
                                        <Heading as='h2' size='xl'>₹11,999</Heading>
                                        <Text fontSize='lg' as='del'>₹30,000</Text>
                                    </Box>
                                    <Box borderRadius='full' lineHeight={0.8} width={50} height={50} background='red.500' position='absolute' top={2} right={2} noOfLines={2}>
                                        <Flex height='inherit' alignItems='center' justifyContent='center'>
                                            <Text size='sm' fontWeight='500' color='whiteAlpha.900'>
                                                60% off
                                            </Text>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Button marginTop={5} width='full' background='whatsapp.400' _hover={{ background: '#52f731' }} color='whiteAlpha.900'>Enroll</Button>
                            </CardHeader>
                        </Card> */}
                    </Flex>

                </Box>
            </Box>

            <Box as='section'>
                <Flex>

                </Flex>
            </Box>
        </Box>
    )
}

export default Home;