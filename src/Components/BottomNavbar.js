import React, { Component } from 'react';
import { View } from 'react-native';
import {BottomNavigation} from "react-native-paper";
import Login from "../Login";

export default class BottomNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'most_viral', title: 'Most Viral', icon:'home', color: '#000000'},
                {key: 'login', title: 'Login', icon:'account-circle', color: '#2a2a2a', loginFunc: this.loginHandler},
            ],
            isLogged: false
        };
        this.loginHandler = this.loginHandler.bind(this);
    }


    loginHandler = (result) => {
        this.setState({
            isLogged: true,
            index: 0,
        })
    }

    handleIndexChanges = index => this.setState({index});

    renderScene = BottomNavigation.SceneMap({
        login: Login,
    })

    render() {
        return (
            <View style={{flex: 1}}>
                <BottomNavigation
                    shifting={true}
                    navigationState={this.state}
                    onIndexChange={this.handleIndexChanges}
                    renderScene={this.renderScene}
                />

            </View>
        );
    }
}
