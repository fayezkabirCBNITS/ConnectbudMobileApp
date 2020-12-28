import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';
import {API_URL} from '../../../config/url';
import base64 from 'base-64';

import {connect} from 'react-redux';

class PostedProjectByEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobSet: [],
      //for Edit Project
      skillOptions: [],
      title: '',
      about: '',
      SS: '',
      addSkill: '',
      country: '',
      ctc: '',
      unit: '',
      show: false,
      errors: '',
      addSkillBox: false,
      user_id: '',
      showLoader: false,
    };
  }
  static navigationOptions = {
    headerShown: false,
  };
  componentDidMount = async () => {
    this.setState({
      showLoader: true,
    });
    const {userData} = this.props;
    let body = new FormData();
    body.append('hirer_id', base64.decode(userData.user_id));
    body.append('search_type', 'all');

    await axios({
      url: API_URL + 'freelancerJobList',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({
          jobSet: response.data,
          showLoader: false,
        });
      })
      .catch((error) => {});
  };

  nav = () => {
    console.log("Clicked");
    this.props.navigation.navigate('SearchProjectStudents')
  }

  render() {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaView, styles.bgColorWhite]}>
        <View style={[CommonStyles.main, styles.bgColorWhite]}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <StatusBar
            backgroundColor="#60a84e"
            barStyle="light-content"
            hidden={false}
            translucent={false}
          />
          <Header />
          <View style={[CommonStyles.container, styles.bgColorWhite]}>
            <ScrollView>
              {this.state.jobSet.map((value, index) => (
                <View style={styles.boxWrapper}>
                  <View>
                    <Text style={styles.boxtitle}>{value.job_name}</Text>
                    <Text style={styles.boxtext}>{value.description}</Text>
                  </View>
                  <View style={styles.subjectPriceCombo}>
                    <View style={styles.subJectDaysCombo}>
                      {value.key_skill.map((item, i) => (
                        <View style={styles.subject}>
                          <Text>{item.label}</Text>
                        </View>
                      ))}
                      <View>
                        <Text>{value.posted_date}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.inrUsd}>
                    <Text style={styles.usd}>{value.price_amount} USD</Text>
                    <Text style={styles.inr}>
                      {value.price_amount * 75} INR
                    </Text>
                  </View>
                  <View style={styles.buttonWrapper}>
                    <View style={styles.findBtn}>
                      <TouchableOpacity style={styles.actionBtn} onPress={this.nav}>
                        <FontAwesome
                          name="search"
                          color="#fff"
                          size={15}
                          style={styles.findIcon}
                        />
                        <Text style={styles.findBtnText}>
                          Find College Students
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.edit}>
                      <TouchableOpacity style={styles.editBtn}>
                        <FontAwesome5
                          name="edit"
                          color="#000"
                          size={28}
                          style={styles.findIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}

              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.hozScroll}>
                  <View style={styles.bgImg}>
                    <ImageBackground
                      source={require('./../../../assets/images/bnr.jpg')}
                      style={CommonStyles.image}>
                      <View style={styles.bgContainer}>
                        <Text style={styles.catTextHead}>Design Portfolio</Text>
                        <Text style={styles.catBodyTxt}>
                          there is some dummy text for now , You can use this
                          example for create overlay. You can change state for
                          visible and invisible for overlay. Maybe better use
                          ImageBackground
                        </Text>
                      </View>
                      <View style={styles.category}>
                        <Text style={styles.categoryText}>Wordpress</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              </ScrollView> */}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default PostedProjectByEmployee;

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps, null)(PostedProjectByEmployee);
