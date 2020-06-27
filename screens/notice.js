import React from 'react';
import { View,Text, StyleSheet , ScrollView,ActivityIndicator} from 'react-native';
import { Card } from 'react-native-elements';
import WebView from 'react-native-webview'

export default class App extends React.Component {
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
          const response = await fetch('https://aps.schoolapp.info/api/notice');
          const responseJson = await response.json();
          // console.error(responseJson);
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
    const state = this.state;
      return (
        <View style={styles.stage}>
          <ScrollView>
              <View>
              {
              this.state.response.notice.map((y) => {
                return(
                  <Card key={Math.random()} title={y.date}>
                    <View>
                      <Text>{y.title}</Text>
                      <View style={{height:100,marginTop:'5%'}}>
                        <WebView
                          source={{html:'<h6 style="font-size: 250%;">'+y.description+'</h6>'}}
                        />
                      </View>
                    </View>
                  </Card>
                  );
                })
              }
              </View>
          </ScrollView>
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
