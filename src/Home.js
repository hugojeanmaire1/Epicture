import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider as PaperProvider} from "react-native-paper";
import BottomNavbar from "./Components/BottomNavbar";
import {StatusBar} from "expo-status-bar";

export default class Home extends Component {
    render() {
        return (
            <PaperProvider>
                <StatusBar barStyle="dark"/>
                <View style={styles.container}>
                    <BottomNavbar/>
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
