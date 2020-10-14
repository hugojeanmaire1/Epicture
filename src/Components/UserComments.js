import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native'
import Comments from './Comments'
import { connect } from "react-redux";

class UserComments extends React.Component {

    _requestComments() {
        fetch("https://api.imgur.com/3/account/" +  this.props.apiInfo.tokenAdditionalParameters.account_username + "/comments/\n", {
            headers: {
                'Authorization': 'Bearer ' + this.props.apiInfo.accessToken
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            return (responseJson.data)
        })
    };

    _printThisBitchAssShityFuckingEpictureIFuckHimRightInHisFuckingButtholeFuckThisShit() {
        var tableaudemerde = this._requestComments()
        if (tableaudemerde === undefined)
            return (<Text>No Fucking Comments Yet</Text>)
    }

    render () {
        return (
            <View>
                <Comments>
                    img_comment={}
                </Comments>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(UserComments);
