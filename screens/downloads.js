import React, { Component } from 'react';
import { View, FlatList, Linking, ActivityIndicator, Text } from 'react-native';
import { Card } from 'react-native-elements';

export default class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          response: [],
          count:'',
        }
      }
      async componentDidMount(){
        try {
          const response = await fetch('http://schoolapp.jatinwardhan.com/api/downloads');
          const responseJson = await response.json();
          this.setState({
            isLoading: false,
            response: responseJson,
          }, function () {
          });
        }
        catch (error) {
          console.error(error);
        }
      }
    render() {
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }
        return (
            <View>
                <FlatList
                data={this.state.response}
                renderItem={
                ({ item }) => 
                <Card containerStyle={{backgroundColor:'#e3e3e3',borderRadius:6}}>
                      <View style={{paddingVertical:"5%",paddingHorizontal:-5, flexDirection:'row', justifyContent:'space-between'}}>
                      <Text>{item.title}</Text>
                        <Text onPress={ ()=> Linking.openURL(item.path) }>Download</Text>
                      </View>
                  </Card>
                }
                keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}
