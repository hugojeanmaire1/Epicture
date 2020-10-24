import * as React from 'react';
import {Image, Text, View, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import {Avatar, Card, Paragraph} from "react-native-paper";
import { Video } from 'expo-av';
import { connect } from "react-redux";

class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            should_play: false,
            favorite: false
        }
        this.windowSize = Dimensions.get('window');
        this.widthMax = this.windowSize.width - 40;
        this.imageWidth = this.props.cover_width;
        this.imageHeight = this.props.cover_height;
        this.newWidth = this.widthMax;
        if (this.imageHeight === undefined || this.imageWidth === undefined)
            this.newHeight = this.newWidth;
        else {
            this.coef = this.imageHeight / this.imageWidth
            this.newHeight = this.widthMax * this.coef
        }
    }

    checkImageFormat() {
        if (this.props.data.link.match(/\.(jpg|png)/g)) {
            return (<Image
                source={{ uri: this.props.data.link }}
                style={{ width: this.newWidth, height: this.newHeight, alignSelf: 'stretch'}}/>)
        } else {
            return (<TouchableHighlight onPress={() => {this.shouldVideoPlay()}}>
                        <Video
                            ref={(ref) => {
                                this.player = ref
                            }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay={this.state.should_play}
                            isLooping
                            style={{ width: this.newWidth, height: this.newHeight }}
                            source={{uri: this.props.data.link}}
                        />
                    </TouchableHighlight>)
        }
    }

    passToFavorites() {
        if (this.state.favorite === true) {
            return (
                <TouchableHighlight activeOpacity={0.6}
                                    underlayColor="#DDDDDD"
                                    onPress={() => {this.applyToFavorites()}}>
                    <Avatar.Icon size={30} color='red' icon="heart-outline"/>
                </TouchableHighlight>)
        } else {
            return (
                <TouchableHighlight activeOpacity={0.6}
                                    underlayColor="#DDDDDD"
                                    onPress={() => {this.applyToFavorites()}}>
                    <Avatar.Icon size={30} color={'white'} icon="heart-outline"/>
                </TouchableHighlight>)
        }
    }

    shouldVideoPlay() {
        if (this.state.should_play === false) {
            this.setState({
                should_play: true
            })
        } else {
            this.setState({
                should_play: false
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#4b4b4b', borderRadius: 10, marginBottom: 20}}>
                <View style={{ flexDirection: 'row', paddingTop: 10}}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 7, paddingBottom: 7 }}>
                        <Avatar.Image size={30} source={{uri: 'https://imgur.com/user/' + this.props.data.account_url + '/avatar' }}/>
                        <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 10 }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>{this.props.data.title}</Text>
                            <Text style={{ color: 'white' }}>{this.props.data.account_url}</Text>
                        </View>
                        <View style={{  flexDirection: 'row', paddingRight: 8 }}>
                            <Text style={{ color: 'white', fontSize: 12, paddingTop: 4, paddingRight: 10}}>{this.props.data.views}</Text>
                            <Avatar.Icon style={{ }} size={30} color={'white'} icon="eye"/>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableHighlight onPress={() => {this.shouldVideoPlay()}}>
                        <Video
                            ref={(ref) => {
                                this.player = ref
                            }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay={this.state.should_play}
                            isLooping
                            style={{ width: this.newWidth, height: this.newHeight }}
                            source={{uri: this.props.data.link}}
                        />
                    </TouchableHighlight>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center'}}>
                    <View style={{ paddingRight: 10, flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Avatar.Icon size={30} color={'white'} icon="arrow-up"/>
                        <Text style={{ color: 'white', paddingLeft: 5 }}>{this.props.data.ups}</Text>
                    </View>
                    <View style={{ paddingRight: 10, flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Avatar.Icon size={30} color={'white'} icon="comment"/>
                        <Text style={{ color: 'white', paddingLeft: 5 }}>{this.props.data.comment_count}</Text>
                    </View>
                    <View style={{ paddingRight: 10, flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
                        {this.passToFavorites()}
                        <Text style={{ color: 'white', paddingLeft: 5 }}>{this.props.data.favorite_count}</Text>
                    </View>
                </View>
            </View>
            /*<View
                style={{
                    height: 270,
                    width: 200,
                    borderRadius: 10,
                    backgroundColor: '#313631',
                    margin: 20

                }}
            >
                <Image
                    source={{uri:this.props.img_link}}
                    style={{
                        height: 250,
                        width: 200,
                        borderRadius: 10,
                    }}
                />
                <Text style={{textAlign: 'center', color: 'green'}}>{this.props.img_ups} UpVotes</Text>
            </View>*/
        );
    }

}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(Favorites);
