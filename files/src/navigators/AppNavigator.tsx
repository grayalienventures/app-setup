import React from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Box, useColorModeValue, useToast, useToken } from 'native-base';
// import { RootStack } from '../../src/navigators/rootNavigator';
import { AppContainer } from './AppContainer'
import { navigationRef } from './NavigationService';


export const AppNavigator = () => {
    const toast = useToast()
    const [lightBg, darkBg] = useToken(
        'colors',
        ['coolGray.50', 'blueGray.900'],
        'blueGray.900',
    );
    const bgColor = useColorModeValue(lightBg, darkBg);

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={{
                // @ts-ignore
                colors: { background: bgColor },
            }}
        >
            <Box
                flex={1}
                w="100%"
                _light={{
                    bg: 'primary.50',
                }}
                _dark={{
                    bg: 'blueGray.900',
                }}
                // bg={useColorModeValue('', 'blueGray.900')}
                _web={{
                    overflowX: 'hidden',
                }}
            >
                <AppContainer />
            </Box>
        </NavigationContainer>
    );
};
