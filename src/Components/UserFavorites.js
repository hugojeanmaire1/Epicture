import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView} from 'react-native';
import { connect } from "react-redux";
import Favorites from "./Favorites";

class UserFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
        }
    }

    componentDidMount() {
        fetch("https://api.imgur.com/3/account/" + this.props.apiInfo.tokenAdditionalParameters.account_username + "/favorites/\n", {
            headers: {
                'Authorization': 'Bearer ' + this.props.apiInfo.accessToken
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({favorites: responseJson})
            })
    };

    createFavoritesComponents() {
        if (this.state.favorites == undefined)
            return (<Text style={{color: 'white'}}>No Fucking Favorites Yet</Text>)
        var favoritesArray = []
        for (var i in this.state.favorites.data) {
            favoritesArray.push(<Favorites style={{margin: 20,}} key={i} img_link={this.state.favorites.data[i].link} img_ups={this.state.favorites.data[i].ups} img_downs={this.state.favorites.data[i].downs}></Favorites>)
        }
        return (favoritesArray)
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
                    {this.createFavoritesComponents()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
    const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(UserFavorites);
