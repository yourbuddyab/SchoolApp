import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Cell, Section, TableView, Separator } from 'react-native-tableview-simple';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      response: [],
    }
  }
  async componentDidMount() {
    try {
      const response = await fetch(`https://login.schoolapp.info/api/result/${this.props.route.params.id}`);
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        response: responseJson,
      })
    }
    catch (error) {
      console.error(error);
    }
  }

  render() {
    const { response } = this.state
    const { navigation } = this.props
    const recentResult = () => {
      navigation.navigate('RecentResult', { id: this.props.route.params.id })
    }
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.stage}>
        {
          response.length ?
            <ScrollView>
              <TableView>
                <Section header="Result" headerTextStyle={{ fontSize: 20, marginBottom: 10 }} footerTextStyle={{ fontSize: 20, marginTop: 5 }} footerTextColor='#fff'
                  headerTextColor='#fff' footer="Final Result" sectionTintColor='#004677'>
                  <Cell cellStyle="RightDetail" title="Student Name" detail={this.state.response.studentName} />
                  <Cell cellStyle="RightDetail" title="Father Name" detail={this.state.response.fName} />
                  <Cell cellStyle="RightDetail" title="Mother Name" detail={this.state.response.mName} />
                  <Cell cellStyle="RightDetail" detail={this.state.response.testName} title="Exam Name" />
                  <FlatList
                    data={this.state.response}
                    renderItem={(item) => <Cell cellStyle="RightDetail" title={item.name} detail={item.marks} key={Math.random()} />}
                  />
                  <Cell cellStyle="RightDetail" detail={this.state.response.total} title="Total Marks" />
                </Section>

                <Cell cellStyle="RightDetail" title="Result" detail={this.state.response.result} />
              </TableView>
              <TouchableOpacity style={styles.recentResult} onPress={recentResult}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Recent Result</Text>
              </TouchableOpacity>
            </ScrollView>
            : <Text style={{ textAlign: 'center', fontSize: 20, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: '10%' }}>No data found</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#fff',
    fontSize: 15,
    paddingBottom: 20,
    height: '100%',
  },
  cell: {
    borderColor: 'gray',
    borderWidth: 1
  },
  recentResult: {
    marginVertical: '2%',
    borderRadius: 50,
    paddingVertical: '2.5%',
    alignSelf: 'center',
    width: '60%',
    backgroundColor: '#A9A9A9'
  },
});
