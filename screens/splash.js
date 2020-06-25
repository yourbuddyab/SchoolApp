import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

/* Logo */
import Logo from '../assets/splash.jpg';
import { StackActions } from '@react-navigation/native';




class Splash extends Component {
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false,
  };
  switchToAuth = async () => {
    // console.error(this.props); 
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

    this.props.navigation.dispatch(
      StackActions.replace(isLoggedIn == 1 ? 'HomeScreen' : 'AuthScreen', {
        screen: 'Login'
      }))
  };
  componentDidMount() {
    const { LogoAnime, LogoText } = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1200,
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });

      setTimeout(this.switchToAuth, 1000);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={Logo} />

          {this.state.loadingSpinner ? (
            <ActivityIndicator
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              size="large"
              color="#5257f2"
            />
          ) : null}
        </Animated.View>
        <Animated.View style={{ opacity: this.state.LogoText }}>
        </Animated.View>
      </View>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: '#FFFFFF',
    fontFamily: 'GoogleSans-Bold',
    fontSize: 30,
    marginTop: 29.1,
    fontWeight: '300',
  },
});
