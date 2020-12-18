import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TutoringJobs from '../../../components/TutoringJobs';
import StudentProject from '../../../components/StudentProject';
import InternshipJobs from '../../../components/InternshipJobs';
import QuestionAnswer from '../../../components/QuestionAnswer';
import Header from '../../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import Filter from '../../../components/Filter';

class StudentInner extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Tutoring Jobs'},
        {key: 'second', title: 'Project'},
        {key: 'third', title: 'Interships / Jobs'},
        {key: 'forth', title: 'Questions & Answers'},
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  navigateToDetails = async() => {
    console.log("called props");
    this.props.navigation.navigate('ProjectDetailsFreelancer');
  }

  renderScene = ({ route }) => {
    switch (route.title) {
      case 'Tutoring Jobs':
        return <TutoringJobs navigateToDetails={this.navigateToDetails}/>; // passing data as data prop
      case 'Project':
        return <StudentProject />;
      case 'Interships / Jobs':
        return <InternshipJobs />;
      case 'Search for College Students':
        return <QuestionAnswer />;
      default:
        return null;
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <Header />
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.tabSec}>
              <TabView
                navigationState={this.state}
                // renderScene={SceneMap({
                //   first: TutoringJobs,
                //   second: StudentProject,
                //   third: InternshipJobs,
                //   forth: QuestionAnswer,
                // })}
                renderScene={this.renderScene}
                onIndexChange={(index) => this.setState({index})}
                style={{flex: 1, justifyContent: 'center'}}
                renderTabBar={(props) => {
                  return (
                    <TabBar
                      tabStyle={{width: 'auto'}}
                      scrollEnabled={true}
                      {...props}
                      renderLabel={({route, focused, color}) => (
                        <Text style={focused ? styles.label : styles.label2}>
                          {route.title}
                        </Text>
                      )}
                      indicatorStyle={styles.indicator}
                      style={styles.tab}
                      inactiveColor={'#a5a5b4'}
                      activeColor={'#6e83e3'}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => this.RBSheet.open()} style={styles.filterSec}>
            <MaterialIcons name="filter-list" color="#71b85f" size={40} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
              
          <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
          openDuration={600}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >

          <Filter />

        </RBSheet>
          
        </View>
      </SafeAreaView>
    );
  }
}

export default StudentInner;
