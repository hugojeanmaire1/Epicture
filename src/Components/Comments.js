import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { connect } from "react-redux";
import env from '../../env.json'

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
        }
    }

    componentDidMount() {
        fetch("https://api.imgur.com/3/image/" + this.props.comment_img, {
            headers: {
                'Authorization': 'Client-ID ' + env.clientId
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({image: responseJson.data.link})
            })
    };

    render () {
        return (
            <Card style={{marginVertical: 20}}>
                <Card.Title/>
                <Card.Cover source={{uri:this.state.image}} />
                <Card.Content>
                    <Paragraph style={{fontWeight: 'bold', marginTop: 20, fontSize: 18}}>{this.props.comment}</Paragraph>
                </Card.Content>
                <Card.Actions style={{marginTop: 30}}>
                    <Text>{this.props.comment_upvotes} UpVotes</Text>
                </Card.Actions>
            </Card>
            /*<View style={{flexDirection: 'row', margin: 20 , flexWrap: 'wrap', backgroundColor: '#313631', borderRadius: 10}}>
                <Image
                    source={{uri:this.state.image}}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 10
                    }}
                />
                <Text
                    style={{
                        color: 'white',
                        paddingTop: 20,
                        paddingLeft: 20,
                    }}
                >
                    {this.props.comment}
                </Text>
                <Text
                    style={{
                        color: 'green',
                        fontSize: 10,
                        paddingTop: 20,
                        paddingLeft: 20,
                        position: 'absolute',
                        top: 60,
                        left: 100
                    }}
                >{this.props.comment_upvotes} UpVotes</Text>
            </View>*/
        );
    }
}

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(Comments);
