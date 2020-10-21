import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView} from 'react-native';
import { connect } from "react-redux";
import Favorites from "./Favorites";
import ApiRequest from '../Api/ApiRequest';

class UserFavorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
        }
        this._isMounted = false
        ApiRequest.getProfile("account/" + this.props.apiInfo.params.account_username + "/favorites/", this.props.apiInfo.params.access_token).then((response) => {
            this.setState({
                favorites: response.data,
                loading: false
            })
        }, (err) => {
            console.log('error: ', err)
        })
    }

    componentDidMount() {
        this._isMounted = true
    };

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this._isMounted) {
        }
    }

    createFavoritesComponents() {
        if (this.state.favorites === undefined)
            return (<Text style={{color: 'white'}}>No Fucking Favorites Yet</Text>)
        var favoritesArray = []
        console.log("Link: " + JSON.stringify(this.state.favorites))
        for (var i in this.state.favorites.data) {
            favoritesArray.push(<Favorites style={{margin: 20,}} key={i} img_link={this.state.favorites.data[i].link} img_ups={this.state.favorites.data[i].ups} img_downs={this.state.favorites.data[i].downs}/>)
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
