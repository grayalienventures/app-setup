
import * as  React from 'react';
import { Container, Text, Button } from 'native-base';
import { View, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import ViewPager from '@react-native-community/viewpager';

import Layout from '../../components/Layout';
import { StackNavigationProp } from "@react-navigation/stack";
import { logOut } from '../../redux/actions/authActions';
export type IHomePublicScreenProps = {
    navigation: StackNavigationProp<any>;
    route: any
}

const HomePublicScreen: React.FC<IHomePublicScreenProps> = (props) => {
    const navigation = useNavigation()
    const [activePage, setActivePage] = React.useState(0);
    const openScreenLogin = () => {

        navigation.navigate("LoginScreen")
    }

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
        <Layout
            showHeader
            title="Home"
            goBack={() => { }}

            navigation={props.navigation}>
            <ViewPager style={{ flex: 1, backgroundColor: colors.primary }} initialPage={0} onPageSelected={(e) => {
                setActivePage(e.nativeEvent.position)
            }}>
                <View key="1" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Welcome </Text>

                </View>
                <View key="2">
                    <Text>2</Text>
                </View>
            </ViewPager>

            <View style={{ justifyContent: 'flex-end', backgroundColor: colors.primary, padding: 5 }}>
                <Button onPress={() => {
                    navigation.navigate("AccountSettings")
                }} style={{}}>
                    <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 17 }}>My Account </Text>
                </Button>
                <Button onPress={pressLogOut} style={{ marginTop: 5 }}>
                    <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 17 }}>Log out </Text>
                </Button>
            </View>
        </Layout>
    );
}
export default HomePublicScreen;
export { HomePublicScreen };
const styles = StyleSheet.create({
    iconDot: {
        fontSize: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
    }
})