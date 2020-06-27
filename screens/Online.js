import React, { Component } from 'react'
import { Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';
import { Card, CardItem } from 'native-base';

export default class Online extends Component {
    state = {
        isLoading: false,
        response: [],
    }
    async componentDidMount() {
        try {
            this.setState({ isLoading: true })
            const class_id = await AsyncStorage.getItem('class_id');

            const response = await fetch(`https://login.schoolapp.info/api/videoclass/live/${class_id}`);
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                response: responseJson,
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    render() {
        const { container, center, hide, } = styles
        const { isLoading, response, } = this.state
        const { navigation } = this.props
        return (
            <SafeAreaView style={container}>
                <FlatList
                    data={response}
                    renderItem={
                        ({ item }) =>
                            <RenderItem navigation={navigation} videoID={item.videoID} />
                    }
                    keyExtractor={(item, index) => 'key' + index}
                />
                <ActivityIndicator size="large" style={isLoading ? center : hide} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "2%",
        backgroundColor: "#fff",
    },
    center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50, translateY: -50 }]
    },
    hide: {
        display: 'none',
    },
})

const RenderItem = ({ navigation, videoID }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Video', { videoID })}>
            <Card style={{ paddingVertical: '2%' }}>
                <CardItem>
                    <Text>Title</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}