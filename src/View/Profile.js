import { Text } from 'react-native-paper';
import * as React from 'react';
import { connect } from "react-redux";
import { View } from "react-native"
import ProfileTabView from "../Components/ProfileTabView";
import UserInfos from "../Components/UserInfos";

class Profile extends React.Component {

    render() {
        return (
            <View
                style={{flex: 1}}
            >
                <UserInfos/>
                <ProfileTabView></ProfileTabView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(Profile);
