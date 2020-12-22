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

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
              <View style={styles.imgSec}>
                <Image
                  style={CommonStyles.image}
                  source={require('../../assets/images/userPro.jpg')}
                />
              </View>

              <View style={styles.userDetails}>
                <Text style={styles.name}>Ashnoor Kaur</Text>
                <Text style={styles.slogan}>Lorem Lorem Lorem</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.menuOptn}
                onPress={() => this.props.navigation.navigate('HomeScreen')}>
                <FontAwesome name="home" color="#fff" size={27} />
                <Text style={styles.menuOptnText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuOptn}
                onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                <FontAwesome name="user" color="#fff" size={27} />
                <Text style={styles.menuOptnText}>Student Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuOptn}
                onPress={() =>
                  this.props.navigation.navigate('EmployeeProfileScreen')
                }>
                <FontAwesome name="user" color="#fff" size={27} />
                <Text style={styles.menuOptnText}>Employee Profile</Text>
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
                  this.props.navigation.navigate('MyQuestionScreen')
                }>
                <AntDesign name="questioncircle" color="#fff" size={27} />
                <Text style={styles.menuOptnText}>My Question</Text>
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
                onPress={() => this.props.navigation.navigate('ContactUs')}
                style={styles.menuOptn}>
                <AntDesign name="contacts" color="#fff" size={27} />
                <Text style={styles.menuOptnText}>Contact</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('BlogScreen')}
                style={styles.menuOptn}>
                <Zocial name="blogger" color="#fff" size={25} />
                <Text style={styles.menuOptnText}>Blog</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._logout} style={styles.menuOptn}>
                <AntDesign name="logout" color="#fff" size={27} />
                <Text style={styles.menuOptnText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>

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
