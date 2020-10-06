import { Text } from 'react-native-paper';
import * as React from 'react';
import { connect } from "react-redux";

class Profile extends React.Component {
    
    render() {
        console.log("Profile state: " + JSON.stringify(this.props.apiInfo));
        return (
            <Text>Profile { JSON.stringify(this.props.apiInfo) }</Text>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(Profile);
