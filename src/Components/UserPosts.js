import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView} from 'react-native';
import { connect } from "react-redux";
import Favorites from "./Favorites";

class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        fetch("https://api.imgur.com/3/account/me/images/", {
            headers: {
                'Authorization': 'Bearer ' + this.props.apiInfo.params.access_token
            }
        }).then((response) => {
            console.log("Text: " + JSON.stringify(response))
            response.json().then((responseJson) => {
                console.log(responseJson);
                this.setState({posts: responseJson})
            })
        })
    };

    createPostsComponents() {
        if (this.state.posts === undefined)
            return (<Text style={{color: 'white'}}>No Fucking Posts Yet</Text>)
        var postsArray = []
        for (var i in this.state.posts.data) {
            postsArray.push(<Favorites style={{margin: 20,}} key={i} img_title={"sssssssssssssssssssssssssssssssssss"} img_link={this.state.posts.data[i].link} img_ups={this.state.posts.data[i].ups} img_downs={this.state.posts.data[i].downs}/>)
        }
        return (postsArray)
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
