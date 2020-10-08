import { Text } from 'react-native-paper';
import * as React from 'react';
import { connect } from "react-redux";
import ProfileTabView from "../Components/ProfileTabView";

class Profile extends React.Component {

    render() {
        return (
            <ProfileTabView></ProfileTabView>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(Profile);
