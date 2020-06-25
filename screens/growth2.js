import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const data = {
  labels: [
  "Total",
  "Unit Test 1",
  "Unit Test 2",
  "Unit Test 3",
  "Halfyearly",
  "Annual"
],
  datasets: [
    {
      data: [100,0,0,0,0,0]
    }
  ]
}

export default class Growth extends Component {
  constructor(props){
    super(props);
    this.state = { 
      isLoading: true,
      response: [],
    }
  } 
  componentDidMount(){
    return fetch('https://login.schoolapp.info/api/resultshow/'+this.props.route.params.id+','+this.props.route.params.class_id)
      .then((response) => response.json())
      .then((responseJson) => {
        data.labels = responseJson.testName,
        data.datasets[0].data = responseJson.data,
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
    <View style={styles.container}>
  <Text style={styles.powerBy}>Student Growth Chart</Text>
  <LineChart
    data={data}
    width={Dimensions.get("window").width} // from react-native
    height={400}
    yAxisSuffix="%"
    yAxisInterval={1} // optional, defaults to 1
    verticalLabelRotation={90}
    fromZero={true}
    withInnerLines={false}
    chartConfig={{
      backgroundColor: "#f99325",
      backgroundGradientFrom: "#f99325",
      backgroundGradientTo: "#f99325",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      borderRadius: 16
    }}
    
  />
</View>
  );
  }
};
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004677',
    alignItems: 'center',
    color:'#000',
    justifyContent: 'flex-start',
    paddingTop:50
  },
  powerBy:{
    color:'white',
    fontSize:24,
    paddingBottom:50
}
});
