import React from 'react';
import { Text, View, StyleSheet , ScrollView, ActivityIndicator, Image} from 'react-native';
import { Card } from 'react-native-elements';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

export default class Teacher extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      response: [],
      count:'',
    }
  } 
  componentDidMount(){
    return fetch('http://schoolapp.jatinwardhan.com/api/teacher')
      .then((response) => response.json())
      .then((responseJson) => {
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
    return (
      
      <ScrollView contentContainerStyle={styles.stage}>
          <View style={styles.container}>
            {
              this.state.response.map((y) => {
                  return  (
                    
                    <View style={styles.card} key={Math.random()}>
                       <Image style={{height:350}} source={{uri:'http://schoolapp.jatinwardhan.com/'+(y.images ? y.images : '/images/TeacherPic/notavb.jpg')+''}} />
                       <Cell cellStyle="RightDetail" title="Teacher Name" detail={y.name}/>
                       <Cell cellStyle="RightDetail" title="Teacher Email" detail={y.email}/>
                       <Cell cellStyle="RightDetail" title="Date of birth" detail={y.dob}/>
                       <Cell cellStyle="RightDetail" title="Teaches" detail={y.sub}/>
                    </View>
                   
                     
                    );
              })
            }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    stage: {
    backgroundColor: '#EFEFF4',
    fontSize : 15,
    paddingBottom: 20,
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

},
});
