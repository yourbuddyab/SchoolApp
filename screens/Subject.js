import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
// const Data = [
//     { id: '1', folderName: 'By Gopi Kishan Sir ', imagePath: require( '../assets/997-200x200.jpg') },
//     { id: '2', folderName: 'By Gopi Kishan Sir ', imagePath: require('../assets/997-200x200.jpg') },
//     { id: '3', folderName: 'By Gopi Kishan Sir ', imagePath: require('../assets/997-200x200.jpg') },
// ]

const RenderFolder = ({ folderName, menuBtn, imageSize, navigation,imagePath }) => {
    return (
        <TouchableOpacity style={menuBtn} onPress={() => navigation.navigate('Lecture', {
            date: folderName
        })}>
            <Image source={imagePath} style={{ width: 150, height: 150 }}/>
            <Text>{folderName}</Text>
        </TouchableOpacity>
    );
}
export default class Lecture extends Component {
    state = {
        youtubeData: [],
    }
    componentDidMount() {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCPm6XRzV_XKlqd8zCWTUyIA&maxResults=3&key=AIzaSyCy8WxR0U15D13m6-UhQJs7npMmpODOAzQ`)
            .then(res => this.setState({
                youtubeData: res.data.items,
            }))
    }
    constructor(props) {
        super(props)
        props.navigation.setOptions({ title: props.route.params.date })
    }

    render() {
        const { navigation } = this.props;
        const { container, menuBtn, icon, } = styles
        const { youtubeData } = this.state;
        console.log(youtubeData);
        
        return (
            <SafeAreaView style={container}>
                <FlatList
                    data={youtubeData}
                    renderItem={({ item }) => <RenderFolder navigation={navigation}
                        folderName={item.folderName}
                        imagePath={item.imagePath}
                        menuBtn={menuBtn}
                        icon={icon}
                    />
                    }
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: '#fff',
    },
    menuBtn: {
        padding: '6%',
    },
    imageSize: {
        fontSize: 70,
        color: '#ffe9a2'
    }
});
