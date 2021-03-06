import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { Icon, Button } from 'native-base';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Setting extends React.Component {

  username = this.props.route.params.username;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loggedIn: true,
      dataSource: ''
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(`https://login.schoolapp.info/api/student/${this.username}`);
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      });
    }
    catch (error) {
      console.error(error);
    }
  }
  render() {
    console.log(`${this.state.dataSource.Image}`)
    const home = () => {
      this.props.navigation.navigate('Home')
    }
    const changePassword = () => {
      this.props.navigation.navigate('ChangePassword', { username: this.username })
    }
    const setting = () => {
      this.props.navigation.navigate('Setting')
    }
    const Logout = async () => {
      await AsyncStorage.removeItem('isLoggedIn');
      this.props.navigation.dispatch(
        StackActions.replace('AuthScreen')
      )
    }
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.stage}>
          <TableView>
            <Section header="Student Detail" headerTextStyle={{ fontSize: 20, marginBottom: 10 }} footerTextStyle={{ fontSize: 20, marginTop: 5 }} footerTextColor='#fff'
              headerTextColor='#fff' footer="Change Password" sectionTintColor='#475670'>
              <View style={{ backgroundColor: '#fff', paddingVertical: '5%' }}>
                <Image
                  style={{ borderRadius: 200, alignSelf: 'center', width: 250, height: 250 }}
                  source={{ uri: `https://aps.schoolapp.info/${this.state.dataSource.Image}` }}
                />
              </View>
              <Cell cellStyle="RightDetail" title="Student Name" detail={this.state.dataSource.studentName} />
              <Cell cellStyle="RightDetail" title="Father Name" detail={this.state.dataSource.fatherName} />
              <Cell cellStyle="RightDetail" title="Mother Name" detail={this.state.dataSource.motherName} />
              <Cell cellStyle="RightDetail" title="Phone" detail={this.state.dataSource.Phone} />
              <Cell cellStyle="RightDetail" title="Class" detail={this.state.dataSource.Class} />
              <Cell cellStyle="RightDetail" title="Address" detail={this.state.dataSource.Address} />
            </Section>
            <TouchableOpacity style={styles.changeButton} onPress={changePassword}>
              <Text style={{ fontSize: 15, textAlign: 'center', color: '#fff', textTransform: 'uppercase' }}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changeButton} onPress={Logout}>
              <Text style={{ fontSize: 15, textAlign: 'center', color: '#fff', textTransform: 'uppercase' }}>Logout</Text>
            </TouchableOpacity>
          </TableView>
          <Text style={styles.powerBy}>Powerd by <Text style={{ fontWeight: 'bold' }} onPress={() => Linking.openURL('https://itplus.co.in')}>IT Plus</Text></Text>
        </ScrollView>


        {/* Footer */}
        <View style={styles.footer}>
          <Button onPress={home} transparent>
            <Icon name='home' style={styles.icon} />
          </Button>
          <Button onPress={setting} transparent>
            <Icon name='person' style={styles.icon} />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  stage: {
    backgroundColor: '#fff',
    fontSize: 15,
  },
  changeButton: {
    marginVertical: '2%',
    borderRadius: 50,
    paddingVertical: '2.5%',
    alignSelf: 'center',
    width: '60%',
    backgroundColor: '#A9A9A9'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#475670',
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
  powerBy: {
    color: '#111',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: '20%',
    width: '100%',
  },
});
