/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Login from './src/Login'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      accessToken: '',
      refreshToken: '',
      accessTokenExpirationDate: '',
    };
  }



  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.loginText}>Salut</Text>
          <View>
            <Login/>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textinputs: {
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    width: '80%',
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginBottom: 20,
  },
  loginButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10%',
    backgroundColor: '#89C623',
  },
  loginText: {
    color: 'black',
    alignSelf: 'center',
  },
});
