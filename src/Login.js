import React, {Component} from 'react';
import env from '../env.json'
import {authorize} from 'react-native-app-auth';
import {Button, StyleSheet, Text, View} from 'react-native';

const config = {
    issuer: env.issuer,
    clientId: env.clientId,
    clientSecret: env.clientSecret,
    redirectUrl: env.redirectUrl,
    serviceConfiguration: {
        authorizationEndpoint: 'https://api.imgur.com/oauth2/authorize',
        tokenEndpoint: 'https://api.imgur.com/oauth2/token',
        revocationEndpoint: 'https://api.imgur.com/oauth2/revoke',
    },
};

export default class Login extends Component {

    _sendRequestLogin = async () => {
        try {
            const result = await authorize(config);
            this.calc();
            console.log(result);
            this.props.callback("Home");
        } catch (error) {
            console.log('Error = ' + error);
        }
    };

    calc(){
        this.props.callback(true);
    }

    render() {
        return (
            <Button
                title="Authorize"
                onPress={() => this._sendRequestLogin()}
                style={styles.loginButton}
            />
        );
    }
}


const styles = StyleSheet.create({
    loginButton: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '10%',
        backgroundColor: '#89C623',
    },
});
