/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Picker,
} from 'react-native';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import moment from 'moment';
export default class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      response: [],
      language: moment().format('MMM'),
    };
  }

  async componentDidMount() {
    const id = this.props.route.params.id;
    try {
      const response = await fetch('http://schoolapp.jatinwardhan.com/api/attendance/' + id+ '/' + moment().format('MMM'));
      const responseJson = await response.json();
      // console.error(responseJson);
      this.setState({
        isLoading: false,
        response: responseJson,
      }, function () { });
    }
    catch (error) {
      console.error(error);
    }
  }

  async valueChange(itemValue) {
    this.setState({language: itemValue,isLoading: true,});
    const id = this.props.route.params.id;
    try {
      const response = await fetch('http://schoolapp.jatinwardhan.com/api/attendance/' + id + '/' + itemValue);

      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        response: responseJson,
      }, function () { });
    }
    catch (error) {
      console.error(error);
    }
  }

  LitstItem = [
    {label: 'Select a month', value: moment().format('MMM'), id: 0},
    {label: 'January', value: 'Jan', id: 1},
    {label: 'February', value: 'Feb', id: 2},
    {label: 'March', value: 'Mar', id: 3},
    {label: 'April', value: 'Apr', id: 4},
    {label: 'May', value: 'May', id: 5},
    {label: 'June', value: 'Jun', id: 6},
    {label: 'July', value: 'Jul', id: 7},
    {label: 'August', value: 'Aug', id: 8},
    {label: 'September', value: 'Sept', id: 9},
    {label: 'October', value: 'Oct', id: 10},
    {label: 'November', value: 'Nov', id: 11},
    {label: 'December', value: 'Dec', id: 12},
  ];
  render() {
    var date = moment().format('MM/DD/YYYY');
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View contentContainerStyle={styles.stage}>
        <View style={styles.picker}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) =>
                this.valueChange(itemValue)
              }
              style={{width: '100%'}}>
              {this.LitstItem.map(y => (
                <Picker.Item label={y.label} value={y.value} key={y.id} />
              ))}
            </Picker>
          </View>
          <TableView>
            <Section
              header="Today's Attendance"
              headerTextStyle={{fontSize: 20, marginBottom: 10}}
              footerTextStyle={{fontSize: 20, marginTop: 5}}
              footerTextColor="#fff"
              headerTextColor="#fff"
              footer="Last 30 Days"
              sectionTintColor="#51b7bb"
              style={{borderWidth: 0, borderColor: '#51b7bb'}}>
              <FlatList
                data={this.state.response.currentDayAttendance}
                renderItem={({item}) => {
                  if (item.date == date) {
                    if (item.attendance == 'P') {
                      return (
                        <Cell
                          cellStyle="RightDetail"
                          key={Math.random()}
                          title={item.date}
                          detail="Present"
                          rightDetailColor="green"
                        />
                      );
                    } else {
                      return (
                        <Cell
                          cellStyle="RightDetail"
                          key={Math.random()}
                          title={item.date}
                          detail="Absent"
                          rightDetailColor="red"
                        />
                      );
                    }
                  } else {
                    return (
                      <Cell
                        cellStyle="RightDetail"
                        key={Math.random()}
                        title={date}
                        detail="Pending"
                        rightDetailColor="red"
                      />
                    );
                  }
                }}
                keyExtractor={item => item.id.toString()}
              />
            </Section>
            <FlatList
              data={this.state.response.remainingAttendance}
              renderItem={({item}) => {
                if (item.attendance == 'P') {
                  return (
                    <Cell
                      cellStyle="RightDetail"
                      key={Math.random()}
                      title={item.date}
                      detail="Present"
                      rightDetailColor="green"
                    />
                  );
                } else {
                  return (
                    <Cell
                      cellStyle="RightDetail"
                      key={Math.random()}
                      title={item.date}
                      detail="Absent"
                      rightDetailColor="red"
                    />
                  );
                }
              }}
              keyExtractor={item => item.id.toString()}
            />
          </TableView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#fff',
    fontSize: 15,
    paddingBottom: 20,
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth:1,
    marginBottom:2
  },
});
