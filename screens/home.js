import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Icon, Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const data = [
  { id: '1', imagePath: require('../assets/icon/ic_menu_02.jpg'), screenName: 'Attendance' },
  { id: '2', imagePath: require('../assets/icon/ic_menu_09.jpg'), screenName: 'Diary' },
  { id: '3', imagePath: require('../assets/icon/ic_menu_10.jpg'), screenName: 'Notice' },
  { id: '4', imagePath: require('../assets/icon/ic_menu_04.jpg'), screenName: 'Result' },
  { id: '5', imagePath: require('../assets/icon/ic_menu_06.jpg'), screenName: 'Growth' },
  { id: '6', imagePath: require('../assets/icon/ic_menu_03.jpg'), screenName: 'Exam' },
  { id: '7', imagePath: require('../assets/icon/ic_menu_07.jpg'), screenName: 'Holiday' },
  { id: '8', imagePath: require('../assets/icon/ic_menu_01.jpg'), screenName: 'Fees' },
  { id: '9', imagePath: require('../assets/icon/ic_menu_08.jpg'), screenName: 'Downloads' },
  { id: '10', imagePath: require('../assets/icon/ic_menu_11.jpg'), screenName: 'Lecture' },
];



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id: '',
      class_id: '',
      name: '',
    }
  }

  componentDidMount = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const id = await AsyncStorage.getItem('id');
      const class_id = await AsyncStorage.getItem('class_id');
      const name = await AsyncStorage.getItem('name');
      if (username !== null && id !== null && class_id !== null && name !== null) {
        this.setState({
          username: username,
          id: id,
          class_id: class_id,
          name: name,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigation } = this.props
    const { username, name, id, class_id } = this.state
    const { container, title, menu, menuBtn, footer, icon, } = styles
    const Menu = ({ imagePath, screenName }) => {
      return (
        <TouchableOpacity style={menuBtn} onPress={() => navigation.navigate(screenName, {
          username, id, class_id
        })}>
          <Image style={{ paddingHorizontal: '5%', width:75, height:75}} source={imagePath} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={container}>
        <Text style={title}>{name}</Text>
        <SafeAreaView style={menu}>
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <Menu screenName={item.screenName} imagePath={item.imagePath} />}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        </SafeAreaView>
        <View style={footer}>
          <Button onPress={() => navigation.navigate('Home')} transparent>
            <Icon name='home' style={icon} />
          </Button>
          <Button onPress={() => navigation.navigate('Setting', { username })} transparent>
            <Icon name='person' style={icon} />
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    color: '#000',
    justifyContent: 'flex-start',
    paddingTop: '10%'
  },
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  menuBtn: {
    borderColor: '#d6d7da',
    padding: '5%',
  },
  row: {
    alignItems: 'center'
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: "8%",
    fontWeight: 'bold',
    paddingBottom: '2%',
    borderBottomWidth: 2,
    borderColor: '#d6d7da',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#51b7bb',
    padding: 5,
    paddingHorizontal: 80,
    position: "absolute",
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between'
  },
  icon: {
    color: '#fff',
    fontSize: 30
  },
  center: {
    textAlign: 'center'
  }
});
