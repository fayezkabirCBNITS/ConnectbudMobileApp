import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';

class EmployeeProfileScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={require('../../../assets/images/bnr.jpg')}
              style={styles.coverImage}>
              <TouchableOpacity style={CommonStyles.hanPosition}>
                <Entypo name="menu" color="#71b85f" size={35} />
              </TouchableOpacity>
              <View style={styles.userImg}>
                <Image
                  source={require('../../../assets/images/userPro.jpg')}
                  style={CommonStyles.usrImage}
                />
                <TouchableOpacity style={CommonStyles.userPhoto}>
                  <FontAwesome name="camera" color="#71b85f" size={22} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.camPosition}>
                <FontAwesome name="camera" color="#71b85f" size={22} />
              </TouchableOpacity>
            </ImageBackground>

            <ScrollView
              style={{flexDirection: 'row', marginTop: -70}}
              showsHorizontalScrollIndicator={false}
              horizontal>
              <View style={styles.details}>
                <Text style={styles.userInfoHead}>Name</Text>
                <Text style={styles.userInfoDetails}>John Eheeler</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.userInfoHead}>Designation</Text>
                <Text style={styles.userInfoDetails}>Hiring Manager</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.userInfoHead}>Company Name</Text>
                <Text style={styles.userInfoDetails}>CBNITS</Text>
              </View>
            </ScrollView>

            <View style={[CommonStyles.container, styles.marTop30]}>
              <View style={styles.hdngSec}>
                <Text style={styles.hdngText}>Your Details</Text>
                <TouchableOpacity style={styles.editBtn}>
                  <MaterialIcons name="mode-edit" color="#fff" size={18} />
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: 10}}>
                <View style={styles.fieldHead}>
                  <Text style={styles.name}>Company Name</Text>
                  <Text style={styles.details2}>CBNITS</Text>
                </View>
                <View style={styles.fieldHead}>
                  <Text style={styles.name}>Designation</Text>
                  <Text style={styles.details2}>Hiring Manager</Text>
                </View>
                <View style={styles.fieldHead}>
                  <Text style={styles.name}>Phone No.</Text>
                  <Text style={styles.details2}>+919126881918</Text>
                </View>
                <View style={styles.fieldHead}>
                  <Text style={styles.name}>Open Jobs</Text>
                  <Text style={styles.details2}>5</Text>
                </View>
                <View style={styles.fieldHead}>
                  <Text style={styles.name}>Location</Text>
                  <Text style={styles.details2}>USA, New York</Text>
                </View>
                <View style={styles.fieldHead}>
                  <Text style={styles.name}>Connection</Text>
                  <Text style={styles.details2}>2</Text>
                </View>
              </View>

              <View style={[styles.hdngSec2, styles.marTop30]}>
                <Text style={styles.hdngTextBlk}>Project posted by</Text>
                <Text style={styles.hdngTextGrey}>John Eheeler</Text>
              </View>

              <View style={styles.project}>
                <Text style={styles.projTitle}>1. Introduction to Java</Text>
                <Text style={styles.projDetails}>
                  Topics Comments Warning Massage Begining of the program
                  Introduction to Flow Chart Examples of FlowChart Expression
                  ...
                </Text>
                <TouchableOpacity style={{marginLeft: 'auto'}}>
                  <Text style={styles.readMore}>Read more</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default EmployeeProfileScreen;
