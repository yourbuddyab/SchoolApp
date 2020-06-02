import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
Image,
} from 'react-native';
import { NavigationActions,StackActions } from '@react-navigation/native';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            currentpassword:'',
            password:'',
            confirmpassword:'',
        }
    }
    
    submit = async()=> {
        const{currentpassword,password,confirmpassword} =this.state;
        const username = this.props.route.params.username;
        fetch('http://schoolapp.jatinwardhan.com/api/student/reset',{
        method:'POST',
        headers:{
        Accept : 'application/json',
        'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            "username" : username, 
            "currentpassword" : currentpassword, 
            "newpassword" : password,
            "confirmpassword": confirmpassword,
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson == 'Password changed successfully.'){
             alert(responseJson);
             this.props.navigation.dispatch(
                StackActions.popToTop());
            }else{
                alert(responseJson);    
            }
        })
        .catch((error) => {
            alert(error);
        });
        }
    
        render () {
       
        const pressHandler1 = () => {
             this.props.navigation.push('Admin')
        }
    
            return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <TextInput style={styles.inputBox} placeholderTextColor="#000" placeholder={'Current Password'} onChangeText={currentpassword => this.setState({currentpassword})}/>
                    <TextInput style={styles.inputBox} placeholderTextColor="#000" placeholder={'New Password'} secureTextEntry={true} onChangeText={password => this.setState({password})}/>
                    <TextInput style={styles.inputBox} placeholderTextColor="#000" placeholder={'Confirm Password'} secureTextEntry={true} onChangeText={confirmpassword => this.setState({confirmpassword})}/>
                    <TouchableOpacity>
                    <Text style={styles.signinButton} onPress={this.submit}>Login</Text>    
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#004677',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
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
    inputBox:{
        width:300,
        marginBottom:20,
        borderRadius: 50,
        backgroundColor:"#fff",
        borderWidth:1,
        padding:'5%',
        fontSize:16,
        paddingHorizontal:40
    },
    signinButton: {
        borderRadius: 50,
        backgroundColor:"#1c313a",
        color:'#fff',
        textAlign:'center',
        fontSize:15,
        paddingVertical:'5%',
        fontWeight:'bold',
        textTransform:'uppercase',
        
    },
});