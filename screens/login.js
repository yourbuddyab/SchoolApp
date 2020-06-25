import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Linking,
    Dimensions,
    Alert,
    ActivityIndicator
} from 'react-native';

import { StackActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            status: false,
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

    submit = async (username, password) => {
        this.setState({ status: true })
        fetch('https://login.schoolapp.info/api/student/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
        }).then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.msg == 'Logged') {
                    await AsyncStorage.setItem('isLoggedIn', '1');
                    await AsyncStorage.setItem('username', responseJson.studentDetails.username);
                    await AsyncStorage.setItem('id', responseJson.studentDetails.id.toString());
                    await AsyncStorage.setItem('class_id', responseJson.studentDetails.class_id.toString());
                    await AsyncStorage.setItem('name', responseJson.studentDetails.name);
                    this.props.navigation.dispatch(StackActions.replace('HomeScreen'))
                } else {
                    Alert.alert('Error', `${responseJson}`);
                }
            })
            .catch((error) => Alert.alert('Error', `${error}`)).finally(() => this.setState({ status: false }))

    }

    render() {
        const { username, password, status } = this.state
        const { container, inputBox, signinButton, forget, powerBy, center, hide } = styles
        return (
            <ScrollView>
                <View style={container}>
                    <Image style={{ marginVertical: '10%', alignSelf: 'center' }} source={require('../assets/splash.jpg')}></Image>
                    <View style={{ marginBottom: 40 }}>
                        <TextInput
                            style={inputBox}
                            placeholderTextColor="#000"
                            placeholder={'Username'}
                            onChangeText={username => this.setState({ username })}
                            value={username}
                        />
                        <TextInput
                            style={inputBox}
                            placeholderTextColor="#000"
                            placeholder={'Password'}
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                            value={password}
                        />
                        <TouchableOpacity onPress={() => this.submit(username, password)}>
                            <Text style={signinButton}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={forget}>
                        <Text style={{ fontSize: 15, color: '#fff' }}>Forget username or password?</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>For Further Enquiry</Text>
                            <Text onPress={this.dialCall} style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginLeft: 10 }}>+91 8619777098</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={powerBy}>Powerd by <Text style={{ fontWeight: 'bold' }} onPress={() => Linking.openURL('https://itplus.co.in')}>IT Plus</Text></Text>
                </View>
                <ActivityIndicator size="large" style={status ? center : hide} />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f99325',
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: 300,
        marginBottom: 10,
        borderRadius: 50,
        backgroundColor: "white",
        padding: '5%',
        fontSize: 16,
        paddingHorizontal: 30
    },
    signinButton: {
        borderRadius: 50,
        backgroundColor: "#51b7bb",
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        paddingVertical: '5%',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        elevation: 5,
    },
    powerBy: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignSelf: 'flex-end',
        color: 'white',
        fontSize: 16
    },
    forget: {
        top: '-3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: '50%',
    },
    hide: {
        display: 'none'
    },
});