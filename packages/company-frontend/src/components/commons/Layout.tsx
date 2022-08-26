import { Flex } from '@chakra-ui/react';


interface Props {
    children?: JSX.Element[] | JSX.Element;
}


const Layout: React.FC<Props> = (props) => {
    return (
        <Flex flexDirection='column' minHeight='100vh'>
            {props.children}
        </Flex>
    );
};

export default Layout;
