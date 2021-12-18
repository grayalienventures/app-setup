import * as React from 'react'
import { Linking, StyleSheet, View, Alert } from 'react-native';
import { DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Container, Image, Text, List, Box, Pressable, Stack, Avatar } from "native-base";
import Icon from '../components/Icon'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import config from '../constants/config';

import { logOut } from '../redux/actions/authActions';
import { IAppState } from '../redux/reducers';


import colors from '../constants/colors';
import images from '../constants/images';
import { resolveImageUrl } from '../utils';


function CustomDrawerContent(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    let auth = useSelector((state: IAppState) => state.auth)
    const { userData } = auth;



    const renderLogoProfile = React.useCallback(() => {
        let profilePic = userData && userData.profilePic != undefined ? resolveImageUrl(userData.profilePic.toString()) : ""

        if (profilePic != "") {
            return (
                <Image
                    borderRadius={70}
                    size="xl"
                    style={{ height: 150, width: 150 }}
                    source={{ uri: `${profilePic}` }}
                />
            )
        }
        return (
            <Image
                alt=""
                // minH={100}
                borderRadius={70}
                style={{ height: 150, width: 150 }}
                source={images.logo}
            // alt=""
            />
        )
    }, [userData]);

    const pressLogOut = () => {
        Alert.alert(
            'Log Out',
            '',
            [

                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () =>
                        logOut().then((res) => {

                        })
                },
            ],
            { cancelable: false }
        )

    }
    return (

        <Box style={{ backgroundColor: colors.primary, height: "100%" }}>
            <View style={{ ...styles.logoHeader, backgroundColor: colors.primary }}>
                {renderLogoProfile()}

                <Text style={{ fontSize: 20, color: "#fefefe" }}>{config.name}</Text>
            </View>
            <Stack flex={1}>
                <List ordered={false} borderWidth={0}>
                    <List.Item >
                        <Pressable

                            alignItems="center"
                            width={"100%"}
                            p={1}
                            style={{ flexDirection: "row" }}
                            onPress={() => navigation.navigate("AccountSettings")}  >
                            <Stack>
                                <Icon name="ios-person" style={{ color: "white", fontSize: 20 }} />
                            </Stack>
                            <Stack mr={1} ml={1}>
                                <Text fontSize="lg" style={{ color: "white" }}>My Account</Text>
                            </Stack>

                        </Pressable>
                    </List.Item>

                    <List.Item

                    >
                        <Pressable
                            p={1}
                            // bg={colors.rad}
                            // button
                            alignItems="center"
                            width={"100%"}
                            style={{ flexDirection: "row" }}
                            onPress={pressLogOut}
                        >
                            <Stack>
                                <Icon name="ios-power" style={{ color: "white", fontSize: 20 }} />
                            </Stack>
                            <Stack mr={1} ml={1}>
                                <Text fontSize="lg" style={{ color: "white" }}>Log Out</Text>
                            </Stack>
                        </Pressable>
                    </List.Item>

                </List>
            </Stack>
        </Box>
    );
}

export default CustomDrawerContent;



const styles = StyleSheet.create({

    logoHeader: {
        height: 100,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',


    },
    InputText: {
        color: "#000"
    }
})