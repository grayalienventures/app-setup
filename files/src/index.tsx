/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppState,
  BackHandler,
  AsyncStorage,
  YellowBox,

} from 'react-native';
import { NativeBaseProvider, Box, useToast } from 'native-base';
import { BaseTheme } from './constants/theme/theme.default'
import { Provider, connect } from 'react-redux';
import { store, persistor } from './redux/store';
import { AppNavigator } from './navigators/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from "react-native-flash-message";

interface Props {

}

const App: React.FunctionComponent<Props> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState(true);



  React.useEffect(() => {

    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);
 
  return (
    <NativeBaseProvider theme={BaseTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );

}

export default App;