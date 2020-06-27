import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'

import Splash from '../screens/splash';
import Home from '../screens/home';
import Admin from '../screens/admin';
import Login from '../screens/login';
import Setting from '../screens/setting';
import Attendance from '../screens/attendance';
import Result from '../screens/result';
import Holiday from '../screens/holiday';
import Notice from '../screens/notice';
import Diary from '../screens/diary';
import Growth from '../screens/growth';
import Exam from '../screens/exam';
import Fees from '../screens/fees';
import ChangePassword from '../screens/ChangePassword';
import RecentResult from '../screens/RecentResult';
import Downloads from '../screens/downloads';
import Logout from '../screens/Logout';
import Classes from '../screens/Classes';
import Lecture from '../screens/Lecture';
import Subject from '../screens/Subject';
import Online from '../screens/Online';
import Submit from '../screens/Submit';
import Video from '../screens/Video';

export default class StackNavigator extends Component {
    render() {
        const Stack = createStackNavigator();

        const AuthScreen = () => {
            return (
                <Stack.Navigator initialRouteName='Splash' headerMode="none">
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Admin" component={Admin} />
                </Stack.Navigator>
            )
        }

        const HomeScreen = () => {
            return (
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerLeft: null,
                            title: 'HOME',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                color: "#fff"
                            },
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: '#51b7bb'
                            }
                        }}
                    />

                    <Stack.Screen name="Setting" component={Setting} />
                    <Stack.Screen name="Attendance" component={Attendance} />
                    <Stack.Screen name="Result" component={Result} />
                    <Stack.Screen name="Holiday" component={Holiday} />
                    <Stack.Screen name="Notice" component={Notice} />
                    <Stack.Screen name="Diary" component={Diary} />
                    <Stack.Screen name="Growth" component={Growth} />
                    <Stack.Screen name="Fees" component={Fees} />
                    <Stack.Screen name="RecentResult" component={RecentResult} />
                    <Stack.Screen name="Downloads" component={Downloads} />

                    <Stack.Screen
                        name="Online"
                        component={Online}
                        options={{
                            title: 'Online Classes',
                        }}
                    />

                    <Stack.Screen
                        name="Exam"
                        component={Exam}
                        options={{
                            title: 'Exam Timetable',
                        }}
                    />
                    <Stack.Screen
                        name="ChangePassword"
                        component={ChangePassword}
                        options={{
                            title: 'Change Password',
                        }}
                    />
                    <Stack.Screen
                        name="Classes"
                        component={Classes}
                        options={{
                            headerLeft: null,
                            title: '',
                            headerStyle: {
                                height: 0
                            }
                        }}
                    />
                    <Stack.Screen
                        name="Video"
                        component={Video}
                        options={{
                            title: '',
                            headerStyle: {
                                height: 0
                            }
                        }}
                    />
                    
                    <Stack.Screen
                        name="Lecture"
                        component={Lecture}
                        options={{
                            title: 'Lecture',
                        }}
                    />

                    <Stack.Screen
                        name="Submit"
                        component={Submit}
                        options={{
                            title: 'Submmission',
                        }}
                    />

                    <Stack.Screen
                        name="Subject"
                        component={Subject}
                        options={{
                            title: '',
                        }}
                    />
                </Stack.Navigator>
            )
        }

        return (
            <NavigationContainer>
                <StatusBar translucent={true} barStyle="dark-content" backgroundColor="transparent" hidden={true} />
                <Stack.Navigator initialRouteName='AuthScreen' headerMode="none">
                    <Stack.Screen
                        name="AuthScreen"
                        component={AuthScreen}
                    />
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
