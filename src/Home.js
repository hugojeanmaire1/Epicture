import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Provider as PaperProvider} from "react-native-paper";
import TestComponents from "./TestComponents";

export default class Home extends Component {
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
