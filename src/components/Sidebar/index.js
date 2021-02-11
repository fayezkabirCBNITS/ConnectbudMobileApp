import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Linking,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  logoutUser,
} from '../../services/helper-methods';
import {NavigationActions, StackActions} from 'react-navigation';
import {updateUserDetails} from '../../redux/actions/user-data';
import {connect} from 'react-redux';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import base64 from 'base-64';
import axios from 'axios';
import {API_URL} from '../../config/url';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileSet: [],
      FlagStatus: '',
      pressed: false,
    };
  }

  componentDidMount = () => {
    this.UpdateSidebar();
  };

  UpdateSidebar = async () => {
    const {userData} = this.props;
    await this.setState({
      FlagStatus: userData.Flag,
    });
    let body = new FormData();

    body.append('user_id', base64.decode(userData.user_id));
    body.append('job_id', '');
    body.append('token', base64.decode(userData.Token));
    body.append('device_type', 'mobile');

    await axios({
      url: API_URL + 'imageGet',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        if (response.data[0].message !== 'token doesnot match') {
          this.setState({
            profileSet: response.data,
          });
          this.props.updateUserDetails(response.data);
        } else {}
      })
      .catch((error) => {});
  };
  _logout = async (_) => {
    await logoutUser();
    this.props.navigation.navigate('HomeScreen');
    //this.resetStack();
  };
  resetStack = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'NonAuthStackNav',
            action: NavigationActions.navigate({
              routeName: 'HomeScreen',
            }),
          }),
        ],
      }),
    );
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <ImageBackground
            style={CommonStyles.image}
            source={require('../../assets/images/sideBarBg.jpg')}>
            <View style={styles.topSec}>
              {this.state.profileSet.map((data, i) => (
                <>
                  <View style={styles.imgSec}>
                    <Image
                      style={CommonStyles.image}
                      source={{uri: data.user_image}}
                    />
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.name}>{data.name}</Text>
                    {/* <Text style={styles.slogan}>Lorem Lorem Lorem</Text> */}
                  </View>
                </>
              ))}
            </View>
            {this.state.FlagStatus === 'WQ==' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() =>
                    this.props.navigation.navigate('StudentInner')
                  }>
                  <FontAwesome name="home" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() =>
                    this.props.navigation.navigate('ProfileScreen')
                  }>
                  <FontAwesome name="user" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Profile</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() =>
                    this.props.navigation.navigate('EmployeeProfileScreen')
                  }>
                  <FontAwesome name="user" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Employee Profile</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() => this.props.navigation.navigate('ChatScreen')}>
                  <Entypo name="message" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('BankDetailScreen')
                  }
                  style={styles.menuOptn}>
                  <FontAwesome name="bank" color="#fff" size={25} />
                  <Text style={styles.menuOptnText}>Bank Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('TransactionScreen')
                  }
                  style={styles.menuOptn}>
                  <MaterialIcons name="payment" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('FreeContactScreen')
                  }
                  style={styles.menuOptn}>
                  <FontAwesome5
                    name="file-contract"
                    color="#fff"
                    size={27}
                    style={{paddingLeft: 3}}
                  />
                  <Text style={styles.menuOptnText}>Contracts</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() =>
                    this.props.navigation.navigate('MyQuestionsScreen')
                  }
                >
                  <AntDesign name="questioncircle" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>My Question</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() => this.props.navigation.navigate('ContactUs')}>
                  <AntDesign name="contacts" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Contact Us</Text>
                </TouchableOpacity>

                <Collapse
                  onToggle={() =>
                    this.setState({pressed: !this.state.pressed})
                  }>
                  <CollapseHeader>
                    <View
                      style={
                        this.state.pressed ? styles.menuOptn2 : styles.menuOptn
                      }>
                      {this.state.pressed ? (
                        <FontAwesome5
                          name="building"
                          color="#71b85f"
                          size={27}
                        />
                      ) : (
                        <FontAwesome5 name="building" color="#fff" size={27} />
                      )}
                      <Text
                        style={
                          this.state.pressed
                            ? styles.menuOptnText2
                            : styles.menuOptnText
                        }>
                        Company
                      </Text>
                      <View style={styles.collapsePos}>
                        {this.state.pressed ? (
                          <Entypo name="chevron-up" color="#71b85f" size={25} />
                        ) : (
                          <Entypo name="chevron-right" color="#fff" size={25} />
                        )}
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() => this.props.navigation.navigate('AboutUs')}>
                      <Text style={styles.menuOptnText}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('FAQsScreen')
                      }>
                      <Text style={styles.menuOptnText}>FAQ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('TermsOfServices')
                      }>
                      <Text style={styles.menuOptnText}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('PrivacyPolicy')
                      }>
                      <Text style={styles.menuOptnText}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </CollapseBody>
                </Collapse>

                <TouchableOpacity
                  onPress={this._logout}
                  style={styles.menuOptn}>
                  <AntDesign name="logout" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Logout</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : this.state.FlagStatus === 'Rg==' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() =>
                    this.props.navigation.navigate('EmployeeInner')
                  }>
                  <FontAwesome name="home" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() =>
                    this.props.navigation.navigate('EmployeeProfileScreen')
                  }>
                  <FontAwesome name="user" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() => this.props.navigation.navigate('ChatScreen')}>
                  <Entypo name="message" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() =>
                    this.props.navigation.navigate('PostedProjectByEmployee')
                  }>
                  <AntDesign name="questioncircle" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Posted Projects</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('JobListingScreen')
                  }
                  style={styles.menuOptn}>
                  <FontAwesome name="bank" color="#fff" size={25} />
                  <Text style={styles.menuOptnText}>Posted Jobs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EmpContactScreen')
                  }
                  style={styles.menuOptn}>
                  <MaterialIcons name="payment" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Contracts</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('MyQuestionScreen')
                  }
                  style={styles.menuOptn}>
                  <AntDesign name="contacts" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>My Question</Text>
                </TouchableOpacity> */}
                <Collapse
                  onToggle={() =>
                    this.setState({pressed: !this.state.pressed})
                  }>
                  <CollapseHeader>
                    <View
                      style={
                        this.state.pressed ? styles.menuOptn2 : styles.menuOptn
                      }>
                      {this.state.pressed ? (
                        <FontAwesome5
                          name="building"
                          color="#71b85f"
                          size={27}
                        />
                      ) : (
                        <FontAwesome5 name="building" color="#fff" size={27} />
                      )}
                      <Text
                        style={
                          this.state.pressed
                            ? styles.menuOptnText2
                            : styles.menuOptnText
                        }>
                        Company
                      </Text>
                      <View style={styles.collapsePos}>
                        {this.state.pressed ? (
                          <Entypo name="chevron-up" color="#71b85f" size={25} />
                        ) : (
                          <Entypo name="chevron-right" color="#fff" size={25} />
                        )}
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() => this.props.navigation.navigate('AboutUs')}>
                      <Text style={styles.menuOptnText}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('FAQsScreen')
                      }>
                      <Text style={styles.menuOptnText}>FAQ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('TermsOfServices')
                      }>
                      <Text style={styles.menuOptnText}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('PrivacyPolicy')
                      }>
                      <Text style={styles.menuOptnText}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </CollapseBody>
                </Collapse>

                <TouchableOpacity
                  onPress={this._logout}
                  style={styles.menuOptn}>
                  <AntDesign name="logout" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Logout</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <>
              <Image style={styles.sideLogo} source={require('../../assets/images/logoWhite.png')} />
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                <TouchableOpacity
                    style={styles.menuOptn3}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'HomeScreen',
                      )
                    }>
                    <Text style={styles.menuOptnText}>
                      Home
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuOptn3}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'PostProjectNA',
                      )
                    }>
                    <Text style={styles.menuOptnText}>
                      Software Development
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuOptn3} onPress={()=>this.props.navigation.navigate('HomeWorkHelpNA')}>
                    <Text style={styles.menuOptnText}>
                      Tutoring & Homework help
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuOptn3} onPress={()=>this.props.navigation.navigate('OnlineClassesNA')}>
                    <Text style={styles.menuOptnText}>Coding classes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuOptn3}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'PostProjectNA',
                      )
                    }>
                    <Text style={styles.menuOptnText}>Design</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuOptn3}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'PostProjectNA',
                      )
                    }>
                    <Text style={styles.menuOptnText}>Language</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuOptn3}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'PostProjectNA',
                      )
                    }>
                    <Text style={styles.menuOptnText}>Music & Arts</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuOptn3}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'PostProjectNA',
                      )
                    }>
                    <Text style={styles.menuOptnText}>Fitness</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.menuOptn3}
                  onPress={() => this.props.navigation.navigate('ContactScreen')}>
                  <Text style={styles.menuOptnText}>Write to us</Text>
                </TouchableOpacity>
                  <Collapse
                  onToggle={() =>
                    this.setState({pressed: !this.state.pressed})
                  }>
                  <CollapseHeader>
                    <View
                      style={
                        this.state.pressed ? styles.menuOptn2 : styles.menuOptn3
                      }>
                      {/* {this.state.pressed ? (
                        <FontAwesome5
                          name="building"
                          color="#71b85f"
                          size={27}
                        />
                      ) : (
                        <FontAwesome5 name="building" color="#fff" size={27} />
                      )} */}
                      <Text
                        style={
                          this.state.pressed
                            ? styles.menuOptnText2
                            : styles.menuOptnText
                        }>
                        Company
                      </Text>
                      <View style={styles.collapsePos}>
                        {this.state.pressed ? (
                          <Entypo name="chevron-up" color="#71b85f" size={25} />
                        ) : (
                          <Entypo name="chevron-right" color="#fff" size={25} />
                        )}
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() => this.props.navigation.navigate('AboutScreen')}>
                      <Text style={styles.menuOptnText}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('FaqNA')
                      }>
                      <Text style={styles.menuOptnText}>FAQ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('TermsScreen')
                      }>
                      <Text style={styles.menuOptnText}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuOptn}
                      onPress={() =>
                        this.props.navigation.navigate('PrivacyScreen')
                      }>
                      <Text style={styles.menuOptnText}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </CollapseBody>
                </Collapse>
                </View>
              </ScrollView>
              </>
            )}
            <View style={styles.socialSec}>
              <Text style={styles.socialText}>Connect with us</Text>
              <View style={styles.socialIcon}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.facebook.com/ConnectBud/')
                  }>
                  <Entypo name="facebook-with-circle" color="#fff" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://twitter.com/ConnectBud')
                  }>
                  <Entypo name="twitter-with-circle" color="#fff" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://www.linkedin.com/company/connectbud/',
                    )
                  }>
                  <Entypo name="linkedin-with-circle" color="#fff" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.instagram.com/connectbud_edu/')
                  }>
                  <Entypo name="instagram-with-circle" color="#fff" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.youtube.com/c/connectbud')
                  }>
                  <Entypo name="youtube-with-circle" color="#fff" size={40} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDetails: (data) => dispatch(updateUserDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
