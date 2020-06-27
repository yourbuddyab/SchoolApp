import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'

export default class Video extends Component {
    render() {
        console.log(this.props)
        const { videoID } = this.props.route.params
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    pointerEvents={false}
                    style={{ marginTop: -100 }}
                    domStorageEnabled={true}
                    source={{ uri: `https://www.youtube.com/embed/${videoID}?modestbranding=1&rel=0` }}
                />
            </View>
        )
    }
}


