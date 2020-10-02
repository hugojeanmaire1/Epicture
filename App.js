/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Login from './src/Login';
import Home from './src/Home';
import BottomNavbar from "./src/Components/BottomNavbar";
import {Provider as PaperProvider, Text} from "react-native-paper";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Login',
            isConnected: false,
            accessToken: '',
            refreshToken: '',
            accessTokenExpirationDate: '',
        };
    }

    getResponse(isConnected){
        this.setState({isConnected});
        if (this.state.isConnected == true)
            this.setState({selectedTab: 'Home'});
    }

    selectedTab = () => {
        switch(this.state.selectedTab){
            case 'Home':
                console.log("xddddddddddddddddddddddddddd");
                return <Home></Home>
            case 'Login':
                console.log("CALLBACK = " + this.state.selectedTab)
                return <Login callback={this.getResponse.bind(this)}/>
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                </View>
                {this.selectedTab()}
            </View>
        );
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
