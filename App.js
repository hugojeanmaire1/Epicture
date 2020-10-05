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
import {Provider as PaperProvider, Text} from "react-native-paper";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Login',
            isConnected: false,
        };
    }

    getResponse(isConnected){
        this.setState({isConnected: isConnected});
        if (this.state.isConnected === true)
            this.setState({selectedTab: 'Home'});
    }

    selectedTab = () => {
        switch(this.state.selectedTab){
            case 'Home':
                return <Home/>
            case 'Login':
                return <Login callback={this.getResponse.bind(this)}/>
        }
    }

    render() {
        return (
            <PaperProvider>
                <View style={styles.container}>
                    <StatusBar backgroundColor="#2a2a2a"/>
                    { this.selectedView() }
                </View>
            </PaperProvider>
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
