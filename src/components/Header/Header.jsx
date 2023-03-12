// const Header = () => {}
// import {  } from 'react-router-dom';
import { useState } from 'react';
import { Link, Image, Flex, Box, useMediaQuery } from '@chakra-ui/react';
import { CgMenuRight } from 'react-icons/cg';
import { RiCloseLine } from 'react-icons/ri';

import logo from '../../assets/logo.png';
import insta from '../../assets/instagram.svg';
import tele from '../../assets/telegram.svg';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile] = useMediaQuery('(max-width:770px)')

    const menuClickHandler = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (

        <Box height='70px' position='sticky' zIndex={500} top={0} background='black'>
            <Flex height='full' justifyContent='space-between' alignItems='center'>
                <Image w={150} src={logo} alt="matrix logo" />
                {isMobile ?
                    isMenuOpen ?
                        <RiCloseLine onClick={menuClickHandler} style={{ fontSize: '1.8rem', cursor: 'pointer' }} />
                        :
                        <CgMenuRight onClick={menuClickHandler} style={{ fontSize: '1.8rem', cursor: 'pointer' }} />
                    : null}
                {!isMobile && (
                    <Flex height='full' justifyContent='flex-end' gap={5} alignItems='center'>
                        <Link style={{ color: '#7ad' }} href="/">Home</Link>
                        <Link style={{ color: '#7ad' }} href="/privacy-policy">Policy</Link>
                        <Link style={{ color: '#7ad' }} href="/contact-us">Contact Us</Link>
                        <Link style={{ color: '#7ad' }} href="/terms-and-conditions">Terms And Condition</Link>
                        <Link title="Our Instagram" href="https://instagram.com/matrix_traders_58?igshid=ZDdkNTZiNTM="
                            target="_blank">
                            <Image height={30} src={insta} alt="Ig Logo" />
                        </Link>
                        <Link title="Our Free Telegram" href="https://t.me/matrixtraders58" target="_blank">
                            <Image height={30} src={tele} alt="Tg Logo" />
                        </Link>
                    </Flex>
                )}
            </Flex>
            {
                isMenuOpen && (

                    <Box background='#000' width='full' position='absolute' zIndex={-10} paddingY={3} top={isMenuOpen ? 16 : -500}>
                        <Flex height='full' flexDirection='column' justifyContent='flex-end' gap={5} alignItems='center'>
                            <Link style={{ color: '#7ad' }} href="/">Home</Link>
                            <Link style={{ color: '#7ad' }} href="/privacy-policy">Policy</Link>
                            <Link style={{ color: '#7ad' }} href="/contact-us">Contact Us</Link>
                            <Link style={{ color: '#7ad' }} href="/terms-and-conditions">Terms And Condition</Link>
                            <Link title="Our Instagram" href="https://instagram.com/matrix_traders_58?igshid=ZDdkNTZiNTM="
                                target="_blank">
                                <Image height={30} src={insta} alt="Ig Logo" />
                            </Link>
                            <Link title="Our Free Telegram" href="https://t.me/matrixtraders58" target="_blank">
                                <Image height={30} src={tele} alt="Tg Logo" />
                            </Link>
                        </Flex>
                    </Box>
                )
            }
        </Box>
    )
}

export default Header;