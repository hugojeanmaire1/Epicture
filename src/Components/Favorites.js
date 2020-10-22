import * as React from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';
import {Card, Paragraph} from "react-native-paper";
import { Video } from 'expo-av';

class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
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
        if (this.props.img_link.match(/\.(jpg|png)/g)) {
            return (<Card.Cover source={{uri:this.props.img_link}} />)
        } else {
            return (<Video
                        ref={(ref) => {
                            this.player = ref
                        }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={{ width: this.newWidth, height: this.newHeight }}
                        source={{uri: this.props.link}}
                    />)
        }
    }

    render() {
        return (
            <Card style={{marginVertical: 20}}>
                <Card.Content>
                    {this.checkImageFormat()}
                    <Paragraph style={{fontWeight: 'bold', marginTop: 20, fontSize: 18}}>{this.props.img_title}</Paragraph>
                </Card.Content>
                <Card.Actions style={{marginTop: 30}}>
                    <Text>{this.props.img_ups} UpVotes</Text>
                </Card.Actions>
            </Card>
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

export default Favorites
