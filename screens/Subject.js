import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Subject extends Component {
  render() {
    const { container, title } = styles
    return (
      <View style={container}>
        <Text style={title}> Comming Soon </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold'
  }
})
