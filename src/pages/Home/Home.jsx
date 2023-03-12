// const Header = () => {}
import { Box, Text, Heading, UnorderedList, ListItem, Card, CardBody, CardFooter, CardHeader, Flex, Button } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { matrixPlans } from '../../data/plans';
// import {} from 'axios';

import './Home.css'


const Home = () => {
    // console.log(process.env.REACT_APP_STRIPE_PUBLISH_KEY)
    const makePayment = async (product) => {
        try {
            // console.log('stripe')
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
            // console.log(stripe, 'stripe')
            const body = { product };
            const headers = {
                "Content-Type": "application/json",
            };

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/create-checkout`,
                {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(body),
                }
            );

            const session = await response.json();
            console.log(session, 'session')
            const result = stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.log(error)
        }

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
                                        <Button marginTop={5} width='full' onClick={() => makePayment(plan.id)} background='whatsapp.400' _hover={{ background: 'whatsapp.600' }} color='whiteAlpha.900'>Enroll</Button>
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