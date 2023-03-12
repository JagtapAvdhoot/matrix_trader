import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';

const Contact = () => {
    const [mail, setmail] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('hi')
    }

    const onChangeHandler = (event) => {
        event.preventDefault();
        setmail((prevValues) => ({ ...prevValues, [event.target.name]: event.target.value }))
    }

    return (
        <Box height='88vh'>
            {/* <form onSubmit={handleSubmit} style={{ height: 'inherit' }}> */}
                <Flex height='full' alignItems='center'>
                    <Box flex='1'>
                        {/* shit */}
                    </Box>
                    <Box flex='1' height='full' display='grid' placeItems='center'>
                        <Box>
                            <Flex marginBottom={2}>
                                <Input type='text' marginRight={1} name='firstName' value={mail.firstName} onChange={onChangeHandler} placeholder='First name' />
                                <Input type='text' name='lastName' value={mail.lastName} onChange={onChangeHandler} placeholder='Last name' />
                            </Flex>
                            <Input type='email' marginBottom={2} name='email' value={mail.email} onChange={onChangeHandler} placeholder='Email' />
                            <Input type='text' name='message' marginBottom={2} value={mail.message} onChange={onChangeHandler} placeholder='Message' />
                            <Button variant='solid' w='100%' _hover={{background:'red.500'}} background='red.300'>Submit</Button>
                        </Box>
                    </Box>
                </Flex>
            {/* </form> */}
        </Box>
    )
}

export default Contact;