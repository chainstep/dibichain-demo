import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, Icon, IconButton, Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, useBreakpointValue, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { COMPANY_NAME } from '../../constants';


const Header: React.FC = (props) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                        fontSize='20px'
                    >
                        {COMPANY_NAME}
                    </Text>
                    <Flex
                        alignItems='center'
                        display={{ base: 'none', md: 'flex' }}
                        ml={10}
                    >
                        <DesktopNav />
                    </Flex>
                </Flex>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
};

const DesktopNav = (): ReactElement => {
    const router = useRouter();
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map(navItem => (
                <Box key={navItem.label}>
                <Popover trigger={'hover'} placement={'bottom-start'}>
                    <PopoverTrigger>
                        <Link
                            p={2}
                            onClick={() => router.push(navItem.href ?? '#')}
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: 'none',
                                color: linkHoverColor,
                            }}
                        >
                            {navItem.label}
                        </Link>
                    </PopoverTrigger>
                    {navItem.children && (
                        <PopoverContent
                            border={0}
                            boxShadow={'xl'}
                            bg={popoverContentBgColor}
                            p={4}
                            rounded={'xl'}
                            minW={'sm'}
                        >
                            <Stack>
                                {navItem.children.map(child => (
                                    <DesktopSubNav key={child.label} {...child}/>
                                ))}
                            </Stack>
                        </PopoverContent>
                    )}
                </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem): ReactElement => {
    return (
        <NextLink href={href} passHref>
            <Link
                role={'group'}
                display={'block'}
                p={2}
                rounded={'md'}
                _hover={{ bg: useColorModeValue('#5DAB6A', 'gray.900') }}
            >
                <Stack direction={'row'} align={'center'}>
                    <Box>
                        <Text  fontWeight={500} _groupHover={{ color: 'white' }}>
                            {label}
                        </Text>
                        <Text fontSize={'sm'}>
                            {subLabel}
                        </Text>
                    </Box>
                </Stack>
            </Link>
        </NextLink>
    );
};

const MobileNav = (): ReactElement => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}
        >
            {NAV_ITEMS.map(navItem => (
                <MobileNavItem key={navItem.label} {...navItem}/>
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem): ReactElement => {
    const { isOpen, onToggle } = useDisclosure();
    const router = useRouter();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                onClick={() => router.push(href ?? '#')}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>
            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children && children.map(child => (
                        <Link
                            key={child.label}
                            py={2}
                            onClick={() => router.push(child.href ?? '#')}
                        >
                            {child.label}
                        </Link>
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Products',
        children: [
        {
            label: 'My Products',
            href: '/my-products',
        },
        {
            label: 'Products',
            href: '/products',
        },
        ],
    },
    {
        label: 'New Products',
        href: '/new-products',
    },
    {
        label: 'Product Details Requests',
        children: [
        {
            label: 'My Product Details Requests',
            href: '/my-product-details-requests',
        },
        {
            label: 'Product Details Requests',
            href: '/product-details-requests',
        },
        ],
    },
    {
        label: 'Upload',
        href: '/upload',
    },
];

export default Header;
