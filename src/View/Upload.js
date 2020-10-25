import {Button, Text, TextInput} from 'react-native-paper';
import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {SafeAreaView, Image, StyleSheet, Platform, View, Dimensions, ScrollView} from "react-native";
import * as Permissions from 'expo-permissions';
import {connect} from "react-redux";
import ApiRequest from '../Api/ApiRequest';

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picture: undefined,
            permissionCamera: false,
            permissionCameraRoll: false,
            title: '',
            name: '',
            description: '',
        }

        this.windowSize = Dimensions.get('window');
        this.widthMax = this.windowSize.width - 40;
        this.heightMax = this.windowSize.height - 40;
        this.ratio = this.heightMax / this.widthMax

    }


    async componentDidMount() {
        const permission = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (permission.permissions.camera.status !== "granted") {
            const {status} = await Permissions.askAsync(Permissions.CAMERA)
            if (status === "granted")
                this.setState({
                    permissionCamera: true,
                })
        } else {
            this.setState({
                permissionCamera: true,
            })
        }

        if (permission.permissions.cameraRoll.status !== "granted") {
            const {status} = await Permissions.askAsync(Permissions.CAMERA)
            if (status === "granted")
                this.setState({
                    permissionCameraRoll: true,
                })
        } else {
            this.setState({
                permissionCameraRoll: true,
            })
        }
    }

    checkResultPicker(pickerResult) {
        if (pickerResult.cancelled === true) {
            console.log("CANCELLED");
        } else {
            this.setState({
                picture: pickerResult
            })
        }
    }

    async _handleLibrary() {
        if (this.state.permissionCameraRoll === false) {
            alert("Please check your permission")
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        });
        this.checkResultPicker(pickerResult)

        console.log("PICTURE[] = + { " + JSON.stringify(this.state.picture.uri) + "}")
    }

    async _handleCamera() {
        if (this.state.permissionCameraRoll === false) {
            alert("Please check your CameraRoll Permission")
            return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
            videoMaxDuration: 0,
            videoQuality: 1
        });
        this.checkResultPicker(pickerResult)
    }

    _uploadPhotos() {
        const title = this.state.title
        const name = this.state.name
        const desc = this.state.description
        const access_token = this.props.apiInfo.params.access_token
        const uri = this.state.picture.base64;
        if (this.state.picture === undefined || title === '' || name === '' || desc === '') {
            alert("Please select an image or take one, or fill fields")
            return;
        }
        const auth = {
            image: uri,
            type: 'base64',
            name: name,
            title: title,
            description: desc,
        }
        ApiRequest.postImage("image.json", auth, access_token).then(r => {
            if (r.success === "true")
                alert("Your image or video has been upload")
            console.log(r)
        })
    }

    render() {
        let imageUri = this.state.picture ? `data:image/jpg;base64,${this.state.picture.base64}` : null;
        let height = this.state.picture ? parseInt(`${this.state.picture.height}`) / this.ratio: null;
        let width = this.state.picture ? parseInt(`${this.state.picture.width}`) / this.ratio : null;
        console.log(height)
        console.log(width)
        return (
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={{ marginRight: 'auto', marginLeft: 'auto'}}>
                    <View>
                        <Button onPress={() => this._handleLibrary()}>
                            <Text style={{ color: 'white'}}>Open Camera Roll</Text>
                        </Button>
                        <Button onPress={() => this._handleCamera()}>
                            <Text style={{ color: 'white'}}>Open Camera</Text>
                        </Button>
                    </View>
                    <View>
                        {this.state.picture
                            ?
                            <View>
                                <View>
                                    <TextInput
                                        label='Title of the image'
                                        value={this.state.title}
                                        onChangeText={text => this.setState({ title: text})}
                                    />
                                </View>
                                <View>
                                    <TextInput
                                        label='Name of the image'
                                        value={this.state.name}
                                        onChangeText={text => this.setState({ name: text})}
                                    />
                                </View>
                                <View>
                                    <TextInput
                                        label='Description of the image'
                                        value={this.state.description}
                                        onChangeText={text => this.setState({ description: text})}
                                    />
                                </View>
                                <View style={{ backgroundColor: '#4b4b4b', borderRadius: 10, marginBottom: 20}}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            source={{ uri: imageUri }}
                                            style={{ aspectRatio: 1, width: '100%', height: '100%'}}/>
                                    </View>
                                    <Button onPress={() => this._uploadPhotos()}>
                                        <Text>UPLOAD</Text>
                                    </Button>
                                </View>
                            </View>
                            : null}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        marginBottom: Platform.OS === 'android' ? 10 : 0,
        backgroundColor: '#2a2a2a',
    },
    scrollView: {
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        padding: 20,
        marginTop: 10
    },
});

const mapStateToProps = (state) => {
    return {apiInfo: state.apiInfo};
}

export default connect(mapStateToProps)(Upload);
