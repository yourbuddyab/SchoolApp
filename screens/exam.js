import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  Text
} from 'react-native';
import { Card } from 'react-native-elements';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      response: [],
    }
  }
  async componentDidMount() {
    try {
      const response = await fetch('https://login.schoolapp.info/api/timetable/' + this.props.route.params.class_id);
      const responseJson = await response.json();
      // console.error(responseJson);
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
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.stage}>
        <Text style={{ textAlign: 'center', paddingTop: '5%', fontSize: 20 }}>{this.state.response.testname}</Text>
        <FlatList
          data={this.state.response.data}
          renderItem={
            ({ item }) =>
              <Card containerStyle={{ backgroundColor: '#e3e3e3', borderRadius: 6 }}>
                <View>
                  <View style={{ paddingVertical: "5%", paddingHorizontal: -5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{item.date}</Text>
                    <Text>{item.subname}</Text>
                  </View>
                </View>
              </Card>
          }
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#fff',
    fontSize: 15,
    paddingBottom: 20,
    height: '100%',
  },
});
