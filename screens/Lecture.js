import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Icon } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
const Data = [
  { id: '1', folderName: '28-05-2020' },
  { id: '2', folderName: '29-05-2020' },
  { id: '3', folderName: '30-05-2020' },
]

const RenderFolder = ({ folderName, menuBtn, icon, navigation }) => {
  return (
    <TouchableOpacity style={menuBtn} onPress={() => navigation.navigate('Subject', {
      date: folderName
    })}>
      <Icon name='folder' style={icon} />
      <Text>{folderName}</Text>
    </TouchableOpacity>
  );
}

export default class Lecture extends Component {
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
