import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Icon } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
const Data = [
    { id: '1', folderName: 'Hindi' },
    { id: '2', folderName: 'English' },
    { id: '3', folderName: 'Maths' },
]

const RenderFolder = ({ folderName, menuBtn, icon, navigation }) => {
    return (
        <TouchableOpacity style={menuBtn} onPress={() => navigation.navigate('Lecture', {
            date: folderName
        })}>
            <Icon name='folder' style={icon} />
            <Text style={{ textAlign: 'center' }}>{folderName}</Text>
        </TouchableOpacity>
    );
}

export default class Classes extends Component {
    render() {
        const { navigation } = this.props;
        const { container, menuBtn, icon, } = styles

        return (
            <SafeAreaView style={container}>
                <FlatList
                    data={Data}
                    renderItem={({ item }) => <RenderFolder navigation={navigation} folderName={item.folderName} menuBtn={menuBtn} icon={icon} />
                    }
                    keyExtractor={item => item.id}
                    numColumns={3}
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
        alignItems: 'center',
    },
    menuBtn: {
        padding: '6%',
    },
    icon: {
        fontSize: 70,
        color: '#ffe9a2'
    }
});
