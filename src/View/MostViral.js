import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import * as React from 'react';
import ApiRequest from '../Api/ApiRequest';
import ParseContent from '../Api/ParseContentImages';
import {connect} from "react-redux";
import {Picker} from '@react-native-community/picker'

class MostViral extends React.Component {

    constructor(props) {
        super(props);
        this._isMounted = false
        this.state = {
            apiRes: [],
            loading: true,
            viral: 'hot',
            sort: 'viral',
        }
        ApiRequest.get('gallery/' + this.state.viral + '/' + this.state.sort + '/0.json').then((response) => {
            this.setState({
                apiRes: response.data,
                loading: false
            })
        }, (err) => {
            console.log('error: ', err)
        })
    }


    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this._isMounted) {
            if (prevState.viral !== this.state.viral || prevState.sort !== this.state.sort) {
                ApiRequest.get('gallery/' + this.state.viral + '/' + this.state.sort + '/0.json').then((response) => {
                    this.setState({
                        apiRes: response.data,
                        loading: false
                    })
                }, (err) => {
                    console.log('error: ', err)
                })
            }
        }
    }

    renderImages() {
        const access = JSON.parse(JSON.stringify(this.props.apiInfo))
        console.log(JSON.stringify(access.params))
        return (<ParseContent apiRes={this.state.apiRes} accessToken={access.params.access_token}/>)
    }

    render() {
        return (
            <View style={{ backgroundColor: '#2a2a2a'}}>
                <SafeAreaView style={{backgroundColor: '#2a2a2a'}}>
                    <View style={styles.picker}>
                        <View style={{ flex: 0.5 }}>
                            <Picker
                                selectedValue={this.state.viral}
                                mode='dropdown'
                                style={{backgroundColor: '#ed7462'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({viral: itemValue})
                                }>
                                <Picker.Item label="Hot" value="hot" />
                                <Picker.Item label="Top" value="top" />
                            </Picker>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Picker
                                selectedValue={this.state.sort}
                                mode='dropdown'
                                style={{backgroundColor: '#ed7462'}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({sort: itemValue})
                                }>
                                <Picker.Item label="Viral" value="viral" />
                                <Picker.Item label="Top" value="top" />
                                <Picker.Item label="Time" value="time" />
                            </Picker>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>
                        { this.renderImages() }
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(MostViral);

const styles = StyleSheet.create({

    picker: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },

    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        padding: 20
    },
    text: {
        color: 'white',
    }
});
