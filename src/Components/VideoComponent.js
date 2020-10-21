import React from 'react';
/*import Video from 'react-native-video';*/
import { Dimensions, View, Text } from 'react-native';

export default class ImageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.windowSize = Dimensions.get('window');
        this.widthMax = this.windowSize.width - 40;
        this.imageWidth = this.props.data.cover_width;
        this.imageHeight = this.props.data.cover_height;
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
                {/*<View style={{ flex: 1, flexDirection: 'row' }}>
                    <Video
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={{ width: this.newWidth, height: this.newHeight }}
                        source={{uri: this.props.video.link}}
                        onBuffer={this.onBuffer}
                        onEnd={this.onEnd}
                        onError={this.onError}
                        repeat={true}
                    />
                </View>*/}
            </View>
        )
    }
}
