import React from 'react';
import { View,Text, StyleSheet , ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { Card } from 'react-native-elements';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          response: [],
          count:'',
        }
      } 

      componentDidMount(){
        return fetch('http://schoolapp.jatinwardhan.com/api/holiday')
          .then((response) => response.json())
          .then((responseJson) => {
            // console.error(responseJson);
            this.setState({
              isLoading: false,
              response: responseJson,
            }, function(){
    
            });
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
    // const state = this.state;
      return (
        <View style={styles.stage}>
              <FlatList 
                data={this.state.response.holiday}
                renderItem={
                ({ item }) => 
                <Card containerStyle={{backgroundColor:'#e3e3e3',borderRadius:6}}>
                    <View>
                      
                      <View style={{paddingVertical:"5%",paddingHorizontal:-5, flexDirection:'row', justifyContent:'space-between'}}>
                      <Text>{item.date}</Text>
                        <Text>{item.title}</Text>
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
    fontSize : 15,
    height:'100%',
  },
  head: { height: 40, backgroundColor: '#EFEFF4'},
  texthead: { margin: 5, textTransform:'uppercase', fontWeight:'bold' },
  text: { margin: 5,},
  name:{fontSize:28, backgroundColor: '#ecf0f1', textAlign:'center', marginBottom:20, padding:2,},
});
