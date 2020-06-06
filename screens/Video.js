import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import {request, PERMISSIONS} from 'react-native-permissions';
export default class Video extends Component {
    componentDidMount() {
        request(PERMISSIONS.ANDROID.STORAGE).then((result) => {
            console.log(result);
        });
    }
    render() {
        const { videoId } = this.props.route.params;
        return (
            <View style={styles.container}>
                <WebView
                    javaScriptEnabled={true}
                    source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                    style={styles.video}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        maxHeight: 200,
    }
})