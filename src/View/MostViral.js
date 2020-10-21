import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import * as React from 'react';
import ApiRequest from '../Api/ApiRequest';
import ParseContent from '../Api/ParseContentImages';

export default class MostViral extends React.Component {

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
        return (<ParseContent apiRes={this.state.apiRes} />)
    }

    render() {
        return (
            <View>
                <SafeAreaView style={{backgroundColor: '#2a2a2a'}}>
                    <View style={styles.picker}>

                    </View>
                    <ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>
                        { this.renderImages() }
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

/*
<View style={{ flex: 0.5 }}>
                        <Picker
                            selectedValue={this.state.viral}
                            style={{backgroundColor: '#C4DBF6'}}
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
                            style={{backgroundColor: '#C4DBF6'}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({sort: itemValue})
                            }>
                            <Picker.Item label="Viral" value="viral" />
                            <Picker.Item label="Top" value="top" />
                            <Picker.Item label="Time" value="time" />
                        </Picker>
                    </View>
 */

const styles = StyleSheet.create({

    picker: {
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
