import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView} from 'react-native';
import { connect } from "react-redux";
import Comments from "./Comments";

class UserComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }
    }

    componentDidMount() {
        fetch("https://api.imgur.com/3/account/" +  this.props.apiInfo.tokenAdditionalParameters.account_username + "/comments/\n", {
            headers: {
                'Authorization': 'Bearer ' + this.props.apiInfo.accessToken
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({comments: responseJson})
        })
    };

    _printThisBitchAssShityFuckingEpictureIFuckHimRightInHisFuckingButtholeFuckThisShit() {
        if (this.state.comments === undefined)
            return (<Text style={{color: 'white'}}>No Fucking Comments Yet</Text>)
        var commentsArray = []
        for (var i in this.state.comments.data) {
            commentsArray.push(<Comments key={i} comment_img={this.state.comments.data[i].album_cover} comment_upvotes={this.state.comments.data[i].ups} comment_downvotes={this.state.comments.data[i].downs} comment={this.state.comments.data[i].comment}></Comments>)
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
