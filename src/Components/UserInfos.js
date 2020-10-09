import * as React from 'react';
import { Image, Text, View } from 'react-native'
import { connect } from "react-redux";

class UserInfos extends React.Component {

    _requestAvatar = async () => {
        let response = await fetch(
            'https://api.imgur.com/3/account/' + this.props.apiInfo.tokenAdditionalParameters.account_username +  '/avatar', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.apiInfo.accessToken
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.data.avatar)
                return responseJson.data.avatar.split("?")[0]
            })
    };

    render() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >

                <Image
                    source={{uri:'https://imgur.com/user/' + this.props.apiInfo.tokenAdditionalParameters.account_username + '/cover'}}
                    style={{height: 200, width: 400, zIndex: 0}}
                />
                <Image
                    source={{uri:'https://imgur.com/user/' + this.props.apiInfo.tokenAdditionalParameters.account_username + '/avatar'}}
                    style={{height: 80,
                        width: 80,
                        borderRadius: 400/ 2,
                        zIndex: 1,
                        position: 'absolute',
                        top: 20
                    }}
                />
                <Text
                    style={{
                        top: 120,
                        color: 'white',
                        position: 'absolute',
                        fontSize: 20
                    }}
                >{this.props.apiInfo.tokenAdditionalParameters.account_username}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(UserInfos);
