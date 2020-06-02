import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './screens/splash';
import Home from './screens/home';
import Admin from './screens/admin';
import Login from './screens/login';
import Setting from './screens/setting';
import Attendance from './screens/attendance';
import Result from './screens/result';
import Holiday from './screens/holiday';
import Notice from './screens/notice';
import Diary from './screens/diary';
import Growth from './screens/growth';
import Exam from './screens/exam';
import Fees from './screens/fees';
import ChangePassword from './screens/ChangePassword';
import RecentResult from './screens/RecentResult';
import Downloads from './screens/downloads';
import Logout from './screens/Logout';
import Classes from './screens/Classes';
import Lecture from './screens/Lecture';
import Subject from './screens/Subject';
export default class App extends Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              title: '',
              headerStyle: {
                height: 0
              }
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerLeft: null,
              title: '',
              headerStyle: {
                height: 0
              }
            }}
          />
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
          <Stack.Screen
            name="Admin"
            component={Admin}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
          />
          <Stack.Screen
            name="Attendance"
            component={Attendance}
          />
          <Stack.Screen
            name="Result"
            component={Result}
          />
          <Stack.Screen
            name="Holiday"
            component={Holiday}
          />
          <Stack.Screen
            name="Notice"
            component={Notice}
          />
          <Stack.Screen
            name="Diary"
            component={Diary}
          />
          <Stack.Screen
            name="Growth"
            component={Growth}
          />
          <Stack.Screen
            name="Fees"
            component={Fees}
          />
          <Stack.Screen
            name="RecentResult"
            component={RecentResult}
          />
          <Stack.Screen
            name="Exam"
            component={Exam}
            options={{
              title: 'Exam Timetable',
            }}
          />
          <Stack.Screen
            name="Downloads"
            component={Downloads}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              title: 'Change Password',
            }}
          />
          <Stack.Screen
            name="Logout"
            component={Logout}
            options={{
              headerLeft: null,
              title: '',
              headerStyle: {
                height: 0
              }
            }}
          />
          <Stack.Screen
            name="Classes"
            component={Classes}
            options={{
              title: 'Video Classes',
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
            name="Subject"
            component={Subject}
            options={{
              title: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
