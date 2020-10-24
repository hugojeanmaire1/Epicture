import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView} from 'react-native';
import { connect } from "react-redux";
import Favorites from "./Favorites";
import ParseContent from "../Api/ParseContentImages";

class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiRes: [],
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
                this.setState({apiRes: responseJson.data})
            })
        })
    };

    createPostsComponents() {
        if (this.state.apiRes === undefined)
            return (<Text style={{color: 'white'}}>No Fucking Posts Yet</Text>)
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
