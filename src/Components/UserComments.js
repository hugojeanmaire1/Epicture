import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView} from 'react-native';
import { connect } from "react-redux";
import Comments from "./Comments";
import ApiRequest from "../Api/ApiRequest";

class UserComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiRes: [],
        }
        this._isMounted = false
        ApiRequest.getProfile("account/" + this.props.apiInfo.params.account_username + "/comments/", this.props.apiInfo.params.access_token).then((response) => {
            this.setState({
                apiRes: response,
                loading: false
            })
        }, (err) => {
            console.log('error: ', err)
        })
    }

    _printThisBitchAssShityFuckingEpictureIFuckHimRightInHisFuckingButtholeFuckThisShit() {
        if (this.state.apiRes === undefined)
            return (<Text style={{color: 'white'}}>No Fucking Comments Yet</Text>)
        var commentsArray = []
        for (var i in this.state.apiRes.data) {
            commentsArray.push(<Comments key={i} comment_img={this.state.apiRes.data[i].album_cover} comment_upvotes={this.state.apiRes.data[i].ups} comment_downvotes={this.state.apiRes.data[i].downs} comment={this.state.apiRes.data[i].comment}></Comments>)
        }
        return (commentsArray)
    }

    _test() {
        return ("BOI")
    }

    render () {
        return (
            <SafeAreaView>
                <ScrollView>
                    {this._printThisBitchAssShityFuckingEpictureIFuckHimRightInHisFuckingButtholeFuckThisShit()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(UserComments);
