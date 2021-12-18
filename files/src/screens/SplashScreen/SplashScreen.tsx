import * as React from 'react';

import {
  ScrollView,
  StyleSheet,
  BackHandler,
  Platform,
  View,
  Text,
  Image
} from "react-native";


import { connect, useDispatch, useSelector } from 'react-redux';
// import * as actions from '../actions'
import config from '../../constants/config';
import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';
import { Container } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../constants/images';
import { IAppState } from '../../redux/reducers';

interface Props {

}
const SplashScreen: React.FunctionComponent<Props> = (props): JSX.Element => {
  const navigation = useNavigation();
  let auth = useSelector((state: IAppState) => state.auth)
  const [isMount, setIsMount] = React.useState(false);

  const dispatch = useDispatch()

  React.useEffect(() => {
    setTimeout(() => {
      bootstrapAsync()
    }, 1000);


  }, []);


  React.useEffect(() => {

  }, [auth])

  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    navigation.navigate(userToken ? 'App' : 'Auth');
  };


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

        <View style={styles.welcomeContainer}>
          <Image
            source={images.logo}
            style={styles.welcomeImage}
          />
          {/* <Text style={{ fontFamily: config.fontFamily.header }}>{config.name} </Text> */}

          <Animatable.Text
            style={styles.text}
            duration={1500}
            animation="rubberBand"
            easing="linear"
            iterationCount="infinite"
          >
            Loading...
          </Animatable.Text>
        </View>
      </ScrollView>
    </View>
  )

}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 106,
    resizeMode: 'cover',
    marginTop: 3,
    marginLeft: -10,
    //borderRadius: 50
  },
  text: {
    marginTop: 50,
    fontSize: 15,
    color: '#1A1A1A'
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
  textSpinner: {
    marginTop: 50,
    fontSize: 15,
    color: '#fff'
  }
})