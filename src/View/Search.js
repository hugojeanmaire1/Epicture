import { Text, Searchbar } from 'react-native-paper';
import * as React from 'react';
import {SafeAreaView, StyleSheet, Platform, ScrollView} from "react-native";
import { connect } from "react-redux";
import ApiRequest from '../Api/ApiRequest';
import ParseContent from "../Api/ParseContentImages";

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            firstQuery: '',
        }
    }

    getSearchResults() {
        ApiRequest.getProfile("gallery/search?q=" + this.state.firstQuery, this.props.apiInfo.params.access_token).then((response) => {
            console.log("Text: " + JSON.stringify(response.data))
            this.setState({
                searchResults: response.data,
                loading: false
            })
        }, (err) => {
            console.log('error: ', err)
        })
    }

    parseContent() {
        if (this.state.searchResults.isEmpty){
            return (<Text>NO RESULTS XS</Text>)
        } else
            return (<ParseContent apiRes={this.state.searchResults} />)
    }

    displaySearchResults() {
        this.getSearchResults()
        console.log(this.state.searchResults)
    }


    render() {
        const { firstQuery } = this.state;
        return (
            <SafeAreaView style={container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    onIconPress={() => this.displaySearchResults()}
                />
                <ScrollView contentContainerStyle={SearchBar.scrollView} removeClippedSubviews={true}>
                    { this.parseContent() }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

const SearchBar = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        marginBottom: 10,
        backgroundColor: '#2a2a2a',
    },
    scrollView: {
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        padding: 20,
        marginTop: 10
    },
});

const container = StyleSheet.compose(SearchBar.androidSafeArea);

export default connect(mapStateToProps)(Search);
