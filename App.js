/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {authorize} from 'react-native-app-auth';

const config = {
  issuer: 'https://api.imgur.com/3/',
  clientId: 'b9aac4c2e7aee5f',
  clientSecret: '88e8af25253fadd26604147a1f4be86d4e9a90fd',
  redirectUrl: 'com.epicture://callback',
  serviceConfiguration: {
    authorizationEndpoint: 'https://api.imgur.com/oauth2/authorize',
    tokenEndpoint: 'https://api.imgur.com/oauth2/token',
    revocationEndpoint: 'https://api.imgur.com/oauth2/revoke',
  },
};

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

  _sendRequestLogin = async () => {
    try {
      const result = await authorize(config);
      console.log(result);
    } catch (error) {
      console.log('Error = ' + error);
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 4}} />
          <View style={{flex: 4}}>
            <Button
              title="Authorize"
              onPress={() => this._sendRequestLogin()}
              style={styles.loginButton}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.loginText}>
              Your informations wont be saved or sold.
            </Text>
            <Text style={styles.loginText}>202000000000000000</Text>
          </View>
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
    color: 'white',
    alignSelf: 'center',
  },
});
