import { Text } from 'react-native-paper';
import * as React from 'react';
import { connect } from "react-redux";
import ConfigureStore from "../Store/ConfigureStore";

class Profile extends React.Component {

    render() {
        console.log("State: " + JSON.stringify(ConfigureStore.getState()));
        return (
            <Text>Profile</Text>
        );
    }
}

export default connect()(Profile);
