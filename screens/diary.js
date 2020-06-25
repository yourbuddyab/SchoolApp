import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Card } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      response: [],
      count: '',
    };
  }

  componentDidMount() {
    const id = this.props.route.params.id;
    return fetch('https://login.schoolapp.info/api/diary/' + id)
      .then(response => response.json())
      .then(responseJson => {
        // console.error(responseJson);
        this.setState(
          {
            isLoading: false,
            response: responseJson,
          },
          function () { },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    const state = this.state;
    return (
      <View style={styles.stage}>
        <ScrollView>
          <View>
            {
              this.state.response.diary.map(y => {
                return (
                  <View key={Math.random()}>
                    <Card title={y.date}>
                      <View>
                        <Text>{y.homework}</Text>
                      </View>
                    </Card>
                    <View style={styless.container}>
                      <Text>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>
                          TEST :
                      </Text>{' '}
                        <Text style={{ textTransform: 'lowercase' }}>{y.test}</Text>
                      </Text>
                    </View>
                  </View>
                )
              })
              }
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styless = {
  container: {
    backgroundColor: 'white',
    borderWidth: 0.19,
    padding: 15,
    margin: 15.5,
    marginVertical: 0,
    borderColor: 'grey',
    elevation: 1,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  stage: {
    backgroundColor: '#EFEFF4',
    fontSize: 15,
    height: '100%',
  },
  head: { height: 40, backgroundColor: '#EFEFF4' },
  texthead: { margin: 5, textTransform: 'uppercase', fontWeight: 'bold' },
  text: { margin: 5 },
  name: {
    fontSize: 28,
    backgroundColor: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 20,
    padding: 2,
  },
});
