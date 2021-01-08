import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TutoringJobs from '../../../components/TutoringJobs';
import StudentProject from '../../../components/StudentProject';
import InternshipJobs from '../../../components/InternshipJobs';
// import QuestionAnswer from '../../../components/QuestionAnswer';
import Header from '../../../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import Filter from '../../../components/Filter';



class StudentInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStatus: this.props.navigation.state.params
      ? this.props.navigation.state.params.page_status
      : '',
      projectType: this.props.navigation.state.params
        ? this.props.navigation.state.params.project_type
        : '',
      JobId: "",
      index: 0,
      routes: [
        { key: 'first', title: 'Tutoring Jobs' },
        { key: 'second', title: 'Project' },
        { key: 'third', title: 'Interships / Jobs' },
        // { key: 'forth', title: 'Questions & Answers' },
      ],
      tutorexpertset: [],
      projectexpertset: [],
      jobexpertset: [],
      skillOptions: [],
      filterdata: ""
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  navigateToDetails = async () => {
    this.props.navigation.navigate('ProjectDetailsFreelancer',{
      page_status : "feed"
    });
  };

  componentDidMount = () => {
    console.log(this.state.projectType);
    if(this.state.pageStatus === "project" && this.state.projectType === "normal"){
      this.props.navigation.navigate('ProjectDetailsFreelancer')
    }
    else{
      console.log("called");
      this.props.navigation.navigate('TutorDetailsFreelancer')
    }
  }

  navigateToDetailsTutor = async () => {
    this.props.navigation.navigate('TutorDetailsFreelancer',{
      page_status : "feed"
    });
  }

  navigateToDetailsJob = async () => {
    this.props.navigation.navigate('JobDetailsFreelancer',{
      page_status : "feed"
    });
  }


  TutorHideModal = (data) => {
    if(this.state.index === 0){
    this.setState({
      tutorexpertset: data,
    });
  }
  else if(this.state.index === 1){
    this.setState({
      projectexpertset: data,
    });
  }
  else{
    this.setState({
      jobexpertset: data,
    });
  }
  };

  ChildSkillset = (data) => {
    this.setState({
      skillOptions: data,
    });
  };

  Skills = (data) => {
    this.setState({
      skillOptions: data,
    });
  };

  filterData = (data) => {
    this.setState({
      filterdata: data,
    });
  };

  // ProjectId = async (data) => {
  //   console.log(data);
  //   this.setState({
  //     JobId: data,
  //   })
  // };

  renderScene = ({ route }) => {
    switch (route.title) {
      case 'Tutoring Jobs':
        return <TutoringJobs
          TutorShowData={this.state.tutorexpertset}
          ChildSkills={this.state.skillOptions}
          Child={this.state.skillOptions}
          tutorsetFilterData={this.state.filterdata}
          navigateToDetailsTutor={this.navigateToDetailsTutor}
        />; // passing data as data prop
      case 'Project':
        return (
          <StudentProject
            ProjectShowData={this.state.projectexpertset}
            ChildSkills={this.state.skillOptions}
            Child={this.state.skillOptions}
            tutorsetFilterData={this.state.filterdata}
            navigateToDetails={this.navigateToDetails}
          />
        );
      case 'Interships / Jobs':
        return <InternshipJobs
          JobShowData={this.state.jobexpertset}
          ChildSkills={this.state.skillOptions}
          Child={this.state.skillOptions}
          tutorsetFilterData={this.state.filterdata}
          navigateToDetailsJob={this.navigateToDetailsJob} />;
      // case 'Questions & Answers':
      //   return <QuestionAnswer />;
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
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
                onIndexChange={(index) => this.setState({ index })}
                style={{ flex: 1, justifyContent: 'center' }}
                renderTabBar={(props) => {
                  return (
                    <TabBar
                      tabStyle={{ width: 'auto',}}
                      scrollEnabled={true}
                      {...props}
                      renderLabel={({ route, focused, color }) => (
                        <Text style={focused ? styles.label : styles.label2}>
                          {route.title}
                        </Text>
                      )}
                      indicatorStyle={styles.indicator}
                      style={styles.tab}
                      // inactiveColor={'#a5a5b4'}
                      // activeColor={'#6e83e3'}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
          {this.state.index != 3 && (
            <View style={{width: '100%', paddingHorizontal: '5%', height: 90, alignItems: 'flex-end', justifyContent: 'center', position: 'absolute', bottom: 0}}>
            <TouchableOpacity
              onPress={() => this.RBSheet.open()}
              style={styles.filterSec}>
              <AntDesign name="filter" color="#fff" size={30} />
              {/* <Text style={styles.filterText}>Filter</Text> */}
            </TouchableOpacity>
            </View>
          )}

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={300}
            openDuration={600}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <Filter
              TutorHideModal={this.TutorHideModal}
              ChildSkillset={this.ChildSkillset}
              Skills={this.Skills}
              filterData={this.filterData}
              ActiveTab={this.state.index}
            />
          </RBSheet>
        </View>
      </SafeAreaView>
    );
  }
}

export default StudentInner;
