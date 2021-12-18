import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import { Box, Button, ScrollView, Spinner, Text, View, VStack } from 'native-base';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../components/ButtonLoading';
import InputValidation from '../../components/InputValidation/InputValidation';
import Layout from '../../components/Layout';
import colors from '../../constants/colors';
import config from '../../constants/config';
import { updateUserData } from '../../redux/actions/authActions';
import { IAppState } from '../../redux/reducers';
import { initUserObj, UserT } from '../../types/Users';
import { copyObject } from '../../utils';
import { InstanceAxios, uploadFileServer } from '../../utils/RequestMethods';
import { ProfilePicture } from './ProfilePicture';

export const getCurrentUser = async (): Promise<UserT> => {
    return InstanceAxios.get(`${config.url.wpJson}/wp/v2/users/me`).then((res) => {
        if (res && res.data) {
            return res.data
        }
    }).catch((error) => {
        throw error
    })
}

export type IAccountSettingsProps = {
    navigation: StackNavigationProp<any>;
    route: any
}

const AccountSettings: React.FC<IAccountSettingsProps> = (props) => {
    let auth = useSelector((state: IAppState) => state.auth)
    const [dirty, setDirty] = React.useState({});
    const [isReady, setIsReady] = React.useState(false);
    const [validated, setValidated] = React.useState(false);
    const [user, setUser] = React.useState(initUserObj);

    let fieldRef = React.useRef(null);
    const dispatch = useDispatch();

    const [fileLogo, setFileLogo] = React.useState(null)
    React.useEffect(() => {
        fetchUserData()
    }, []);



    const getValue = (key, fields, fieldsDirty) => {
        return _.has(fieldsDirty, key) ? fieldsDirty[key] : fields[key] ? fields[key] : ""
    }



    const onChangeText = (key: string, value: any): void => {
        let cloneDirty = copyObject(dirty)
        cloneDirty[key] = value
        setDirty(cloneDirty)

    }

    const fetchUserData = async () => {
        getCurrentUser().then((res) => {
            setUser(res)
            setIsReady(true)
        }).catch((error) => {
            setIsReady(true)
        })

    }

    const save = async (params = {}): Promise<string> => {
        if (!params) {
            params = {}
        }
        try {
            let res = await InstanceAxios.post(`${config.url.users}/me`, params)
            if (res && res.data) {
                setTimeout(() => {
                    updateUserData()
                }, 200);
                setUser(res.data)
                resetDirty()
                return 'User saved successfully.'
            }
        } catch (error) {
            throw error
        }
    }



    const resetDirty = () => {
        setDirty({})
    }



    const processingComponent = () => {
        return (
            <View style={{
                flexDirection: "row",
                height: 35,
                justifyContent: "center",
                alignContent: "center", alignItems: "center"
            }}>
                <Spinner color={"#fff"} />
            </View>
        )
    }

    return (
        <Layout
            showHeader
            showBtnBack
            title="Account settings"
            goBack={() => { }}
            navigation={props.navigation}>
            <Box h={"100%"} >
                <View flex={1}  >

                    <ScrollView
                        nestedScrollEnabled={true}
                        style={{ flex: 1 }} >
                        <ProfilePicture save={save} profilePic={user && user.profilePic} />
                        <View style={{ marginTop: 20 }}>
                            <Text fontSize="xl" fontWeight="bold"  > Personal Information</Text>
                        </View>
                        <VStack style={{}}>

                            <View style={{}}>
                                <InputValidation

                                    variant="underlined"
                                    value={`${_.has(dirty, "firstName") ? dirty['firstName'] : user.firstName}`}
                                    validated={validated}
                                    placeholderTextColor={config.placeholderTextColor}
                                    onChangeText={(text) => onChangeText("firstName", text)}

                                    placeholder="First Name" />

                                <InputValidation
                                    // required
                                    variant="underlined"
                                    value={`${_.has(dirty, "lastName") ? dirty['lastName'] : user.lastName}`}
                                    placeholderTextColor={config.placeholderTextColor}

                                    validated={validated}
                                    onChangeText={(text) => onChangeText("lastName", text)}
                                    placeholder="Last Name" />
                                <InputValidation
                                    variant="underlined"
                                    customInputProps={{
                                        isDisabled: true,
                                        isReadOnly: true,
                                    }}
                                    value={`${_.has(dirty, "email") ? dirty['email'] : user.email}`}
                                    placeholderTextColor={config.placeholderTextColor}
                                    type="email"
                                    placeholder="Email"
                                />
                            </View>


                        </VStack>

                    </ScrollView>
                </View>
                <View style={{ justifyContent: "flex-end" }}>
                    <ButtonLoading
                        style={{ width: "100%" }}
                        customButton={Button}
                        processingComponent={processingComponent()}

                        onPressFetching={async (): Promise<string> => {
                            let params = { ...dirty }
                            return await save(params)
                        }}

                    ><Text style={{ color: "#fff" }}>Save</Text>
                    </ButtonLoading>
                </View>

            </Box >
        </Layout>
    );
}

export default AccountSettings
export { AccountSettings };

const currentStyles = StyleSheet.create({

    InputText: {
        color: "#000",
        fontSize: 16.5,
    },
    InputError: {
        marginRight: 5,
        color: '#F44336',
        fontSize: 14
    },
    InputErrorAutocomplete: {
        marginRight: 5,
        marginTop: 20,
        color: '#F44336',
        fontSize: 14
    },
    flag: {
        height: 20,
        width: 30,

        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#cecece',
        backgroundColor: '#cecece',
    },
})