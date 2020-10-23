import {Button, Text} from 'react-native-paper';
import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import {SafeAreaView, Image, StyleSheet, Platform, View, ScrollView} from "react-native";
import * as Permissions from 'expo-permissions';
import {connect} from "react-redux";
import {Video} from "expo-av";


class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picture: [],
            permissionCamera: false,
            permissionCameraRoll: false,
        }
    }


    async componentDidMount() {
        const permission = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (permission.permissions.camera.status !== "granted") {
            const {status, permissions} = await Permissions.askAsync(Permissions.CAMERA)
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
            const {status, permissions} = await Permissions.askAsync(Permissions.CAMERA)
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
                picture: [...this.state.picture, pickerResult]
            })
        }
    }

    async _handleLibrary() {
        if (this.state.permissionCameraRoll === false) {
            alert("Pas les permissions pour accéder a la caméraRoll")
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        });
        this.checkResultPicker(pickerResult)

        console.log("PICTURE[] = + { " + JSON.stringify(this.state.picture[0].type) + "}")
    }

    async _handleCamera() {
        if (this.state.permissionCameraRoll === false) {
            alert("Pas les permissions pour accéder a la caméra")
            return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
            videoMaxDuration: 0,
            videoQuality: 1
        });
        this.checkResultPicker(pickerResult)
        console.log("PICTURE[] = + { " + JSON.stringify(this.state.picture[0].type) + "}")
    }

    render() {
        let imageUri = this.state.picture[0] ? `data:image/jpg;base64,${this.state.picture[0].base64}` : null;
        return (
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={{ marginRight: 'auto', marginLeft: 'auto'}}>
                    <View>
                        <Text style={{ color: 'white', fontSize: 30 }}>Upload photos or videos</Text>
                    </View>
                    <Button onPress={() => this._handleLibrary()}>
                        <Text>OPEN LIBRARY</Text>
                    </Button>
                    <Button onPress={() => this._handleCamera()}>
                        <Text>OPEN CAMERA</Text>
                    </Button>
                    <ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>

                    </ScrollView>
                    {this.state.picture[0] && this.state.picture[0].type === "image"
                        ? <Image
                            source={{uri: imageUri}}
                            style={{ width: 200, height: 200 }}
                        />
                        : null}
                    {this.state.picture[0] && this.state.picture[0].type === "video"
                        ? <Video
                            ref={(ref) => {
                                this.player = ref
                            }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay={true}
                            isLooping
                            style={{ width: 200, height: 200 }}
                            source={{uri: imageUri}}
                        />
                        : null}
                    {this.state.picture[0]
                        ? <Text>
                            Keys on pickerResult:
                            {' '}
                            {JSON.stringify(Object.keys(this.state.picture[0]))}
                        </Text>
                        : null}
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

