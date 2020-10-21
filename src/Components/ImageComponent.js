import React from 'react';
import { Dimensions, View, Image, Text } from 'react-native';

export default class ImageComponent extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#4b4b4b', borderRadius: 10, marginBottom: 20 }}>
                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 7, paddingLeft: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>{this.props.data.title}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 7, paddingBottom: 7 }}>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                        source={{ uri: this.props.image.link }}
                        style={{ width: this.newWidth, height: this.newHeight, alignSelf: 'stretch'}}/>
                </View>
            </View>
        )
    }
}
