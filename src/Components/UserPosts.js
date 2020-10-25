import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView} from 'react-native';
import { connect } from "react-redux";
import Favorites from "./Favorites";
import ParseContent from "../Api/ParseContentImages";
import ApiRequest from "../Api/ApiRequest";

class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRes: [],
        }
        this._isMounted = false
        ApiRequest.getProfile("account/" + this.props.apiInfo.params.account_username + "/images/", this.props.apiInfo.params.access_token).then((response) => {
            this.setState({
                apiRes: response.data,
                loading: false
            })
        }, (err) => {
            console.log('error: ', err)
        })
    }

    createPostsComponents() {
        if (this.state.apiRes === undefined)
            return (<Text style={{color: 'white'}}>No Fucking Favorites Yet</Text>)
        const access = JSON.parse(JSON.stringify(this.props.apiInfo))
        console.log(JSON.stringify(access.params))
        return (<ParseContent apiRes={this.state.apiRes} accessToken={access.params.access_token}/>)
    }

    render() {
        return (
            <SafeAreaView
                style={{
                    alignItems: 'center',
                    paddingTop: 30,
                }}
            >
                <ScrollView>
                    {this.createPostsComponents()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(UserPosts);
