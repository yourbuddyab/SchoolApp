import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
export default class Gallery extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      response: [],
      count:'',
    }
  } 
  componentDidMount(){
    return fetch('https://aps.schoolapp.info/api/gallery')
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
    return (
     <View style={styles.stage}>
        <ScrollView>
        {
          this.state.response.map((y) => {
              return  (
                <View style={styles.card} key={Math.random()}>
                    <Image style={{height:'100%'}} source={{uri:y}} />
                </View>
                );
          })
        }
        </ScrollView>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#fff',
    fontSize : 15,
    paddingBottom: 20,
    height:'100%',
  },
  card:{
    borderRadius: 6,
    elevation: 3,
    backgroundColor:'#fff',
    shadowOffset:{width:1,height:1},
    shadowColor:'#333',
    shadowOpacity:0.3,
    shadowRadius:2,
    marginHorizontal: 4,
    marginVertical: 6,
    paddingHorizontal:'5%',
    paddingVertical:'8%',
    height:400
  }
});
