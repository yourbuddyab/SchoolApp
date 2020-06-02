import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class About extends Component {
  render(){return (
    <View style={styles.container}>
        <Text>School App About!</Text>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    color:'#000',
    justifyContent: 'flex-start',
    paddingTop:50
  }
});
