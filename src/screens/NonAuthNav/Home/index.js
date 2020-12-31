import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  BackHandler,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import QualityTalent from '../../../components/QualityTalent';
import PopularServies from '../../../components/PopularServies';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Picker} from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WhyHire from '../../../components/WhyHire';
import HowWorks from '../../../components/HowWorks';
import LatestProjects from '../../../components/LatestProjects';
import CustomerStories from '../../../components/CustomerStories';
import { Searchbar } from 'react-native-paper';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      showSearchBar: false,
      firstQuery: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };
  navigateToviewProfile = async () => {
    this.props.navigation.navigate('ViewUserProfileScreen');
  };

  navigateToProjectDetails = async () => {
    this.props.navigation.navigate('ProjectDetailsFreelancerNA')
  }

  updateUser = (user) => {
    this.setState({user: user});
  };

  showSearch = () => {
    this.setState({showSearchBar: true});
  };

  studentLogin = () => {
    this.RBSheet.close(),
      this.props.navigation.navigate('SignInScreen', {userType: 'student'});
  };
  hireStudent = () => {
    this.RBSheet.close(),
      this.props.navigation.navigate('SignInScreen', {userType: 'employee'});
  };

  render() {
    const { firstQuery } = this.state;
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          <View style={CommonStyles.header}>
            <TouchableOpacity style={CommonStyles.hambarIcon} onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            <TouchableOpacity  onPress={() => this.RBSheet.open()} style={CommonStyles.bellIcon}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity activeOpacity={1} style={styles.width100}>
              <Image
                source={require('../../../assets/images/homeBnr.jpg')}
                style={styles.coverImage}
              />
            </TouchableOpacity>

            <View style={CommonStyles.container}>
           
              <View style={[styles.searchDropSec, styles.marTop15,]}>
                <View style={styles.searchPicker}>
                  <Picker
                    style={{color: '#71b85f', marginTop: -84}}
                    selectedValue={this.state.user}
                    onValueChange={this.updateUser}>
                    <Picker.Item
                      label="College Students"
                      value="College Students"
                    />
                    <Picker.Item label="Projects" value="Projects" />
                  </Picker>
                </View>
                <TouchableOpacity
                  onPress={this.showSearch}
                  style={styles.dropSerachIcon}>
                  <FontAwesome name="search" color="#fff" size={22} />
                </TouchableOpacity>
              </View>
              {this.state.showSearchBar && (
                <View style={styles.searchBar}>
                  {/* <TextInput
                    placeholder='Search for "Name, Skills & Colleges"'
                    style={styles.searchInput}
                  />
                  <TouchableOpacity style={styles.searchIcon}>
                    <Fontisto name="search" color="#fff" size={20} />
                  </TouchableOpacity> */}
                  <Searchbar
                    placeholder="Search"
                    onChangeText={query => { this.setState({ firstQuery: query }); }}
                    value={firstQuery}
                    inputStyle={styles.searchInput}
                    style={styles.search}
                  />
                  <TouchableOpacity style={styles.searchPos}>
                    <AntDesign name="search1" size={25} color="#000" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.marVer15}>
              <View style={CommonStyles.container}>
                <Text style={styles.hdng}>
                  Recently Joined College Students
                </Text>
              </View>

              <QualityTalent
                navigateToviewProfile={this.navigateToviewProfile}
              />
            </View>

            <View style={styles.marVer15}>
              <View style={CommonStyles.container}>
                <Text style={styles.hdng}>Popular Professional Servies</Text>
              </View>

              <PopularServies />
            </View>

            <View style={[styles.marVer15, styles.lightGrey]}>
              <View style={CommonStyles.container}>
                <Text style={styles.hdng2}>Why hire a</Text>
                <Text style={styles.hdngLg}>
                  College Student{' '}
                  <Text style={styles.hdngLgGreen}>from ConnectBud?</Text>
                </Text>
              </View>
              <WhyHire />
            </View>

            <View style={styles.green}>
              <View style={CommonStyles.container}>
                <Text style={styles.hdng2}>How</Text>
                <Text style={styles.hdngWhite}>ConnectBud works?</Text>
              </View>
              <HowWorks />
            </View>

            <View style={styles.marVer15}>
              <View style={CommonStyles.container}>
                <Text style={styles.hdng}>Customer Stories</Text>
              </View>
              <CustomerStories />
            </View>

            <View style={styles.marVer15}>
              <View style={CommonStyles.container}>
                <Text style={styles.hdng}>Latest Projects</Text>
              </View>
              <LatestProjects navigateToProjectDetails={this.navigateToProjectDetails}/>
            </View>
          </ScrollView>

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={170}
            openDuration={600}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <View style={styles.btmSheet}>
              <TouchableOpacity
                onPress={this.studentLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginBtnText2}>College Student Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.hireStudent}
                style={styles.loginBtn2}>
                <Text style={styles.loginBtnText2}>Hire a College Student</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
