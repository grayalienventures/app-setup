import * as React from "react";
import {
    Text, Button, Box, AspectRatio
} from 'native-base';

import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native";

import Icon from '../../components/Icon'
import { connect, useSelector, useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import InputValidation from "../../components/InputValidation/InputValidation";

import { useImmer } from "use-immer";
import ButtonLoading from "../../components/ButtonLoading";
import colors from "../../constants/colors";

import { InstanceAxios } from "../../utils/RequestMethods";
import config from "../../constants/config";
import { loginSuccess, updateUserData } from "../../redux/actions/authActions";
import Layout from "../../components/Layout";
import images from "../../constants/images";

import { StackNavigationProp } from "@react-navigation/stack";
import { IAppState } from "../../redux/reducers";
import { isEmail } from "../../utils";

export type ILoginScreenProps = {
    navigation: StackNavigationProp<any>;
    route: any
}

const LoginScreen: React.FC<ILoginScreenProps> = (props) => {

    const auth = useSelector((state: IAppState) => state.auth)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [state, setState] = useImmer({
        username: '',
        password: '',
        validated: false,
    });


    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [showPasswod, setShowPasswod] = React.useState(false)
    const [processing, setProcessing] = React.useState(false);
    const [validated, setValidated] = React.useState(false);

    const submitLogin = async (): Promise<string> => {
        setProcessing(true)
        Keyboard.dismiss();
        // setCheckValidation(true)

        setValidated(true)
        if (email == "" || !isEmail(email) || password == "") {
            setProcessing(false)
            throw new Error("Please check and input correct fields!");
        }

        let params = {
            email: email,
            password: password
        };
        try {
            let res = await InstanceAxios.post(config.url.auth.login, params)
            setProcessing(false)

            if (res && res.data) {
                setValidated(false)
                // @ts-ignore
                dispatch(loginSuccess(res.data)).then(() => {

                    updateUserData().then((res) => {
                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: "App",
                                    // params: { },
                                },
                            ],
                        })
                    })
                })
                setEmail('')
                setPassword('')

                return "Login successful"
            }

            throw new Error("login error")
        } catch (error) {
            setProcessing(false)
            throw error;
        }
        return ""
    }
    return (
        <Layout >
            <Box bg={colors.primary} >

                <Box display="flex" w="100%" height="100%"  >
                    <Box
                        bg="#fff"
                        flex={1}
                        h="100%"
                        w="100%"
                        maxW="100%"
                        // rounded="lg"
                        overflow="hidden"
                    // borderColor="coolGray.200"
                    // borderWidth="1"
                    >

                        <Box style={styles.logoHeader}>
                            <Image source={images.reactNativeLogo} style={styles.logoImage} />
                        </Box>
                        <KeyboardAvoidingView style={{ flex: 1, }}
                            behavior={(Platform.OS === 'ios') ? "padding" : null} >
                            <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 5 }}>
                                <Box mt={50}>

                                    <InputValidation
                                        value={email}
                                        placeholderTextColor={config.placeholderTextColor}
                                        type="email"
                                        required

                                        validated={validated}

                                        onChangeText={(text) => setEmail(text)}
                                        placeholder="Email" />


                                    <InputValidation
                                        value={password}
                                        required

                                        placeholderTextColor={config.placeholderTextColor}

                                        validated={validated}
                                        secureTextEntry={!showPasswod}
                                        returnKeyType='go'
                                        onChangeText={(text) => setPassword(text)}
                                        placeholder="Password"
                                        InputRightElement={(
                                            <Button
                                                variant="link"
                                                onPress={() => { setShowPasswod(!showPasswod) }} >
                                                <Icon style={{ color: '#000', fontSize: 25 }} name={!showPasswod ? "ios-eye-off" : "ios-eye"} />
                                            </Button>
                                        )}
                                    />
                                </Box>
                            </ScrollView>
                            <View style={{ padding: 10, paddingBottom: 5, paddingTop: 5 }}>
                                <ButtonLoading
                                    customButton={Button}
                                    customButtonProps={{
                                        size: "lg"
                                    }}
                                    processingComponent={(<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                                        <Text style={{ textAlign: 'center', }}>LOG IN ...</Text>
                                    </View>)}
                                    onPressFetching={async (): Promise<string> => {
                                        return await submitLogin()
                                    }} >
                                    <Text style={{ color: "#fff" }}>LOG IN</Text>
                                </ButtonLoading>

                            </View>
                        </KeyboardAvoidingView >

                    </Box>
                </Box>
            </Box>
        </Layout>
    );
}
export default LoginScreen;
export { LoginScreen };


const styles = StyleSheet.create({

    logoHeader: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    logoImage: {
        width: "100%",
        height: "100%",
        padding: 2,
        // backgroundColor:"#eee"
    },
    logoTitle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: "rgba(0, 0, 0, 0.9);"
    },
    InputText: {
        color: "#000"
    },
    InputError: {
        color: '#F44336',
        fontSize: 15
    }
})