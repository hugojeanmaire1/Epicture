import * as React from 'react';
import { Image, Text, View } from 'react-native'
import { connect } from "react-redux";

class UserInfos extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.apiInfo)
    }

    render() {
        return (
            <View style={{alignItems: 'center',flexDirection: 'column'}}>
                <Image
                    source={{uri:'https://imgur.com/user/' + this.props.apiInfo.params.account_username + '/cover'}}
                    style={{height: 200, width: 400, zIndex: 0}}
                />
                <Image
                    source={{uri:'https://imgur.com/user/' + this.props.apiInfo.params.account_username + '/avatar'}}
                    style={{height: 80, width: 80, borderRadius: 400 / 2, position: 'absolute', top: 20}}
                />
                <Text
                    style={{
                        top: 120,
                        color: 'white',
                        position: 'absolute',
                        fontSize: 20
                    }}
                >{this.props.apiInfo.params.account_username}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(UserInfos);
