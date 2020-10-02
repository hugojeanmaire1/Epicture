/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import BottomNavbar from "./src/Components/BottomNavbar";
import { Provider as PaperProvider } from "react-native-paper";
import TestComponents from "./src/TestComponents";

export default class App extends Component {

  render() {
    return (
        <PaperProvider>
            <View style={styles.container}>
                <StatusBar hidden/>
                <TestComponents/>
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
