import React, { Component } from 'react';
import { View,ActivityIndicator,FlatList,Text } from 'react-native';
import { Card } from 'react-native-elements';

export default class RecentResult extends Component {
    constructor(props){
        super(props);
        this.state = { 
          isLoading: true,
          response:[],
        }
      }
      componentDidMount(){
        return fetch('https://login.schoolapp.info/api/recentresult/1')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              response:responseJson,
            }, function(){}
          );
          console.error(responseJson);
          })
          .catch((error) =>{
            console.error(error);
          });
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
                    <View>
                      
                      <View style={{paddingVertical:"5%",paddingHorizontal:-5, flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontWeight:'bold',fontSize:18}}>{item.testName}</Text>
                        <Text style={{borderRadius:4,marginTop:'-1%',backgroundColor:'#c3c3c3',height:'65%',width:'20%',textAlign:'center',textAlignVertical:'center'}}>{item.result == 'P' ? (<Text style={{color:'#00ab66',fontWeight:'bold'}}>Pass</Text>) : (<Text style={{color:'red',fontWeight:'bold'}}>Fail</Text>)}</Text>
                      </View>
                    </View>
                  </Card>
                }
                keyExtractor={item => item.id.toString()}
              />
            </View>
        )
    }
}
