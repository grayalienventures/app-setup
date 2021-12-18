import React from 'react';
import { Box, IconButton, HStack, ArrowBackIcon, Heading, useColorMode, Pressable, View, Image } from 'native-base';
import Icon from './Icon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import _ from 'lodash';
import images from '../constants/images';
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';

interface HeaderProps {
	title: string | JSX.Element
	navigation: StackNavigationProp<any>
	_hStack?: any
	showBtnBack?: boolean
	navigateTo?: string
	notGoBack?: boolean
}
const Header = (props: HeaderProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const safeArea = useSafeAreaInsets();
	const navigation = useNavigation()

	const openDrawer = () => {
		navigation.dispatch(DrawerActions.openDrawer())
	}


	const goBack = () => {
		if (props.notGoBack) {
			return false;
		}
		if (props.navigation && props.navigateTo) {
			props.navigation.navigate(props.navigateTo);
		} else {
			navigation.dispatch(CommonActions.goBack());
		}
	}

	return (
		<HStack
			minHeight={70}
			bg={colorMode == 'dark' ? '#1c1e21' : colors.primary}
			borderBottomWidth={StyleSheet.hairlineWidth}
			borderBottomColor="primary.500"
			position="absolute"
			left={0}
			top={0}
			right={0}
			px={4}
			zIndex={-1}
			{...props._hStack}
		>
			<HStack
				py={2}

				alignItems="center"
				w="100%"
				justifyContent="space-between"
			>

				<HStack>
					{props.showBtnBack && <Pressable

						onPress={goBack}
						justifyContent="center"

					>

						<Icon style={{
							fontSize: 30,
							color: colorMode == 'dark' ? '#fff' : '#fff'
						}}
							name={"ios-arrow-back"} />

					</Pressable>}
					{_.isString(props.title) ?
						<Heading
							color={'secondary.50'}
							fontSize="2xl"
							isTruncated
						>
							{props.title ? props.title : ''}
						</Heading> :
						props.title
					}
				</HStack>

				<HStack>
					<Pressable onPress={() => { openDrawer() }}>
						<Image
							alt=" "
							source={images.logoHeader} style={{
								width: 30,
								height: 30,
								margin: 5,
								marginRight: 0,
							}} />
					</Pressable>
				</HStack>

			</HStack>
		</HStack>

	);
}
export { Header }
export default Header