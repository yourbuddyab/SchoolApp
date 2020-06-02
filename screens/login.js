import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
Image,
Linking,
Dimensions
} from 'react-native';
import Colors from '../assets/color';

import { StackActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            status:false,
        }
    }
    dialCall = () => {

        let phoneNumber = '';
    
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:${8619777098}';
        }
        else {
          phoneNumber = 'telprompt:${8619777098}';
        }
    
        Linking.openURL(phoneNumber);
      };

    submit = async()=> {
        this.setState({
            status:true,
        });
        const{username ,password} =this.state;
        fetch('http://schoolapp.jatinwardhan.com/api/student/login',{
        method:'POST',
        headers:{
        Accept : 'application/json',
        'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            
            "username" : 8823908641, 
            "password" : 12345678,
        }),
        }).then((response) => response.json())
        .then(async(responseJson) => {
            this.setState({
                status:false,
            });
            console.log(responseJson);
            if(responseJson.msg == 'Logged'){
                 await AsyncStorage.setItem('isLoggedIn','1');
                 await AsyncStorage.setItem('username','8823908641');
                 await AsyncStorage.setItem('id',responseJson.studentDetails.id.toString());
                 await AsyncStorage.setItem('class_id',responseJson.studentDetails.class_id.toString());
                 await AsyncStorage.setItem('name',responseJson.studentDetails.name);
             this.props.navigation.dispatch(
                StackActions.replace('Home',{
                    username:'8823908641',
                    id:responseJson.studentDetails.id,
                    class_id:responseJson.studentDetails.class_id,
                    name:responseJson.studentDetails.name,
                 }));
            }else{
                alert(responseJson);    
            }
        })
        .catch((error) => {
            this.setState({
                status:false,
            });
            alert(error);
        });

        }
    
        render () { 
        const pressHandler1 = () => {
             this.props.navigation.push('Admin')
        }
    
        return(
            <ScrollView>
            <View style={styles.container}>
                <Image style={{marginVertical:'10%',alignSelf:'center'}} source={require('../assets/splash.jpg')}></Image>
                <View style={{marginBottom:40}}>
                    <TextInput style={styles.inputBox} placeholderTextColor="#000" placeholder={'Phonenumber'} onChangeText={username => this.setState({username})}/>
                    <TextInput style={styles.inputBox} placeholderTextColor="#000" placeholder={'Password'} secureTextEntry={true} onChangeText={password => this.setState({password})}/>
                    <TouchableOpacity onPress={this.submit}>
                    <Text style={styles.signinButton} >Login</Text>    
                    </TouchableOpacity>
                </View>
                <View style={styles.forget}>
                    <Text style={{fontSize:15, color:'#fff'}}>Forget username or password?</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize:15, color:'#fff',fontWeight:'bold'}}>For Further Enquiry</Text>
                        <Text onPress={this.dialCall} style={{color:'#fff',fontWeight:'bold',fontSize:15, marginLeft:10}}>+91 8619777098</Text>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.powerBy}>Powerd by <Text style={{fontWeight: 'bold'}} onPress={ ()=> Linking.openURL('https://itplus.co.in') }>IT Plus</Text></Text>
        </View>
        </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container:{

        backgroundColor:'#f99325',
        height:Dimensions.get("window").height,
        width:Dimensions.get("window").width,
        alignItems:'center',
        justifyContent:'center',
    },
    inputBox:{
        width:300,
        marginBottom:10,
        borderRadius: 50,
        backgroundColor:"white",
        padding:'5%',
        fontSize:16,
        paddingHorizontal:30
    },
    signinButton: {
        borderRadius: 50,
        backgroundColor:"#51b7bb",
        color:'#fff',
        textAlign:'center',
        fontSize:15,
        paddingVertical:'5%',
        fontWeight:'bold',
        textTransform:'uppercase',
        elevation: 5,
    },
    powerBy:{
        position:'absolute',
        right:0,
        bottom:0,
        alignSelf:'flex-end',
        color:'white',
        fontSize:16
    },
    about:{
        position:'absolute',
        left:0,
        bottom:0,
        alignSelf:'flex-end',
        color:'white',
        fontSize:16 
    },
    signinButtonPress:{
        borderRadius: 50,
        backgroundColor:"#1c313a",
        color:'#fff',
        textAlign:'center',
        fontSize:15,
        paddingVertical:'5%',
        fontWeight:'bold',
        textTransform:'uppercase',
        elevation: 5,
        opacity:0.5
    },
forget:{
    top:'-3%',
    alignItems:'center',
    justifyContent:'center',
}
});