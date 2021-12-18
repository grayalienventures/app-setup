import React from 'react';
import * as _ from 'lodash'
import {
	Box,
	useColorMode,
	Heading,
	HStack,
	Text,
	useBreakpointValue,
	Fab,
	useColorModeValue,
	MoonIcon,
	SunIcon,
	Stagger,
	Pressable,
	ArrowBackIcon,
	Link,
	ChevronLeftIcon,
	IconButton,
	StatusBar
} from 'native-base';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { EvilIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../constants/colors';
import { I18nManager, StyleSheet } from 'react-native';

import Header from './Header';




interface ILayoutProps {
	title?: string | React.ReactNode

	showBtnBack?: boolean
	navigation?: StackNavigationProp<any>;
	goBack?(): void
	navigateTo?: string
	header?: React.ReactNode
	showHeader?: boolean
}

// const Layout: React.FC<ILayoutProps> = ({ }) => {
const Layout: React.FC<ILayoutProps> = ({
	children,
	navigation,
	showBtnBack,
	title,
	navigateTo,
	_status,
	_hStack,
	header,
	showHeader,
	...props
}: any) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const safeArea = useSafeAreaInsets();
	// console.log("I18nManager.isRTL",I18nManager.isRTL)
	// logger.info("_hStack", _hStack)
	// logger.info("header", header)
	return (
		<>
			<StatusBar

				backgroundColor={colors.primary}
				barStyle="light-content"

			/>

			<Box
				safeAreaTop
				backgroundColor={colors.primary}
				{..._status}
				// height={safeArea.top}
				_web={{
					pt: {
						base: 6,
						sm: 6,
						md: 0,
					},
				}}

			/>

			<Box
				{...props}
				// height={safeArea.top}
				bg={colorMode == 'dark' ? '#1c1e21' : '#fff'}
				flex={1}
				// px={4}
				mx="auto"
				pt={(showHeader || header) ? '70px' : 0}
				w={{ base: '100%', md: '768px', lg: '1000px', xl: '1080px' }}
			>
				{header ? header :
					showHeader ? <Header showBtnBack={showBtnBack} navigateTo={navigateTo} title={title} navigation={navigation} 	{..._hStack} /> : null
				}



				{children}
			</Box>


		</>
	)
}

export { Layout }
export default Layout