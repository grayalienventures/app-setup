import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { createSwitchNavigator } from "@react-navigation/compat";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import AccountSettings from '../screens/AccountSettings/AccountSettings'

const defaultOptions = {
  headerShown: false
}
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();




export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
  > {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, RouteName>,
    DrawerNavigationProp<AppRoutes, "AuthLoading">
  >
  route: RouteProp<AuthenticationRoutes, RouteName>
}
export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: DrawerNavigationProp<HomeRoutes, RouteName>
  route: RouteProp<HomeRoutes, RouteName>
}
export type AppRoutes = {
  AuthLoading: undefined
  App: undefined
  Auth: undefined
}


export type AuthenticationRoutes = {
  LoginScreen: undefined
  RegisterScreen: undefined
}
export type HomeRoutes = {
  HomeProtected: undefined
}





/**
 *  All Stack for Screen 
 */
const AppScreens = () => {


  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />

    </Stack.Navigator>
  )
}


const AppStack = () => {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName='AppScreens'
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="AppScreens" component={AppScreens} />
      {/* Screens */}
    </Drawer.Navigator>
  );
}


const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> */}
    </Stack.Navigator>
  )
}


export const AppContainer = createSwitchNavigator({
  "AuthLoading": { screen: SplashScreen, },
  "App": { screen: AppStack },
  "Auth": { screen: AuthStack }

},
  {

    initialRouteName: "AuthLoading",
  });
