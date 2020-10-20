import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

class Favorites extends React.Component {

    render() {
        return (
            <View
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
            </View>
        );
    }

}

export default Favorites
