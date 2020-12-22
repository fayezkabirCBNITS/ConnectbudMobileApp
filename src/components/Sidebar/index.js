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
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  decodeToken,
  deepClone,
  logoutUser,
} from '../../services/helper-methods';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
import base64 from "base-64";

import base64 from 'base-64';

import axios from 'axios';
import {API_URL} from '../../config/url';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileSet: [],
      FlagStatus: '',
    };
  }
  componentDidMount = async () => {
    const {userData} = this.props;
    await this.setState({
      FlagStatus: userData.Flag,
    });
    let body = new FormData();

    body.append('user_id', base64.decode(userData.user_id));
    body.append('job_id', '');
    body.append('token', base64.decode(userData.Token));

    await axios({
      url: API_URL + 'imageGet',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        console.log(response);
        if (response.data[0].message !== 'token doesnot match') {
          this.setState({
            profileSet: response.data,
            // profileStatus: response.data[0].complete_status,
            // profileMeter: response.data[0].percentage,
          });
        } else {
        }
        this.setState({isLoading: false});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
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
                  onPress={() => this.props.navigation.navigate('HomeScreen')}>
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

                {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('StudentInner')}
                style={styles.menuOptn}>
                <FontAwesome name="home" color="#fff" size={27} />
                <Text style={styles.menuOptnText}>Student Inner</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuOptn}
                onPress={() => this.props.navigation.navigate('EmployeeInner')}>
                <FontAwesome name="home" color="#fff" size={27} />
                <Text style={styles.menuOptnText}>Employee Inner</Text>
              </TouchableOpacity> */}

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
                    this.props.navigation.navigate('EditProfileScreen')
                  }
                  style={styles.menuOptn}>
                  <AntDesign name="contacts" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Contracts</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() =>
                    this.props.navigation.navigate('MyQuestionsScreen')
                  }>
                  <AntDesign name="questioncircle" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>My Question</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this._logout}
                  style={styles.menuOptn}>
                  <AntDesign name="logout" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Logout</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={styles.menuOptn}
                  onPress={() => this.props.navigation.navigate('HomeScreen')}>
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
                    this.props.navigation.navigate('MyQuestionsScreen')
                  }>
                  <AntDesign name="questioncircle" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Posted Projects</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('BankDetailScreen')
                  }
                  style={styles.menuOptn}>
                  <FontAwesome name="bank" color="#fff" size={25} />
                  <Text style={styles.menuOptnText}>Posted Jobs</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('StudentInner')}
              style={styles.menuOptn}>
              <FontAwesome name="home" color="#fff" size={27} />
              <Text style={styles.menuOptnText}>Student Inner</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOptn}
              onPress={() => this.props.navigation.navigate('EmployeeInner')}>
              <FontAwesome name="home" color="#fff" size={27} />
              <Text style={styles.menuOptnText}>Employee Inner</Text>
            </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('TransactionScreen')
                  }
                  style={styles.menuOptn}>
                  <MaterialIcons name="payment" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Contracts</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EditProfileScreen')
                  }
                  style={styles.menuOptn}>
                  <AntDesign name="contacts" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>My Question</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this._logout}
                  style={styles.menuOptn}>
                  <AntDesign name="logout" color="#fff" size={27} />
                  <Text style={styles.menuOptnText}>Logout</Text>
                </TouchableOpacity>
              </ScrollView>
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

export default connect(mapStateToProps, null)(Sidebar);
