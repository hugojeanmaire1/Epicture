import React from 'react';
import {Dimensions, View, Image, Text, TouchableHighlight} from 'react-native';
import {Avatar} from "react-native-paper";
import ApiRequest from '../Api/ApiRequest';

export default class ImageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        }

        if (this.props.favorite === true) {
            this.state.favorite = true
        }

        this.windowSize = Dimensions.get('window');
        this.widthMax = this.windowSize.width - 40;

        this.imageWidth = this.props.data.cover_width;
        if (this.props.data.cover_width === undefined)
            this.imageWidth = this.props.data.width;

        this.imageHeight = this.props.data.cover_height;
        if (this.props.data.cover_height === undefined)
            this.imageHeight = this.props.data.height;

        this.newWidth = this.widthMax;
        if (this.imageHeight === undefined || this.imageWidth === undefined)
            this.newHeight = this.newWidth;
        else {
            this.coef = this.imageHeight / this.imageWidth
            this.newHeight = this.widthMax * this.coef
        }
    }

    applyToFavorites() {
        ApiRequest.favoriteAnImage("image/" + this.props.image.id + "/favorite", this.props.accessToken).then((r) => {
            if (r.success === true) {
                if (r.data === "favorited") {
                    this.setState({
                        favorite: true,
                    })
                } else if (r.data === "unfavorited") {
                    this.setState({
                        favorite: false,
                    })
                }
            }
        })
        this.passToFavorites()
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
                    <Image
                        source={{ uri: this.props.image.link }}
                        style={{ width: this.newWidth, height: this.newHeight, alignSelf: 'stretch'}}/>
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
        )
    }
}

