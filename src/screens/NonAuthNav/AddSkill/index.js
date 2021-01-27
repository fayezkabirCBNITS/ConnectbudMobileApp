import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  BackHandler
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Header from '../../../components/Header';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Feather from 'react-native-vector-icons/Feather';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequest } from '../../../services/http-connectors';
import {updateUserDetails} from '../../../redux/actions/user-data';
import {connect} from 'react-redux';
import base64 from 'base-64';


class AddskillScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: { isTrue: false, ind: [] },
      skillSet: [],
      keyGen: [],
      buttonstate: true,
      addSkill: "",
      addSkillBox: false,
      userID: this.props.navigation.state.params.userID,
      Flag: 'Y'
    };
  }

  async ChildTagList(e, value) {
    if (this.state.keyGen.includes(value) == false) {
      await this.setState({
        keyGen: this.state.keyGen.concat([value]),
      });
    } else {
      await this.setState({
        keyGen: this.state.keyGen.filter(function (val) {
          return val !== value;
        }),
      });
    }
    if (this.state.keyGen.length > 0) {
      this.setState({
        buttonstate: false,
      });
    } else {
      this.setState({
        buttonstate: true,
      });
    }
  }


  handleSubmit = async () => {
    const body = {
      category_name: this.state.keyGen.toString(),
      user_id: this.props.navigation.state.params.userID,
      skill_name: this.state.addSkill,
      type: 'mobile'
    };
    let response = await makePostRequest(ApiUrl.ChildSkillSubmit, false, body);
    if (response) {
      this.props.updateUserDetails(response, base64.encode(this.state.userID), base64.encode(this.state.Flag));
      this.props.navigation.navigate('StudentInner');
    }
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this._handleAppStateChange);
    const body = {
      category_id: this.props.navigation.state.params.tagID.toString(),
      page_type: "maintag"
    };
    let response = await makePostRequest(ApiUrl.CategorySubmit, false, body);
    this.setState({
      skillSet: response
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleAppStateChange);
  }

  _handleAppStateChange = () => {
    BackHandler.exitApp()
  };

  // handleChange = async (e) => {
  //   await this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // addNewSkill = () => {
  //   this.setState({
  //     addSkillBox: true
  //   })
  // }

  static navigationOptions = {
    headerShown: false,
  };

  handleCollapse = (cl, id) => {
    const arr = this.state.collapsed.ind;
    arr.push(id);
    this.setState({ collapsed: { ...this.state.collapsed, isTrue: cl, ind: arr } });
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <View style={CommonStyles.header}>
            {/* <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Entypo name="menu" color="#71b85f" size={35} />
        </TouchableOpacity> */}
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.image}
            />
            {/* <TouchableOpacity>
          <Feather name="bell" color="#71b85f" size={30} />
        </TouchableOpacity> */}
          </View>
          <View style={CommonStyles.container}>
            <View style={styles.selectSkill}>
              <Text style={styles.selectSkillText}>Select the skills:</Text>
              {/* <Ionicons name="ios-add-circle" color="#000" size={45} /> */}
            </View>
            <ScrollView
              style={styles.scroll}
              showsVerticalScrollIndicator={false}>
              <View>
                {this.state.skillSet.map((item, index) => {
                  return (
                    <Collapse
                      key={index}
                      onToggle={(isCollapsed) =>
                        this.handleCollapse(isCollapsed, index)
                      }
                    >
                      <CollapseHeader>
                        <Separator style={styles.accordianhead} bordered>
                          <View style={styles.separator}>
                            <View style={styles.accordianHeader}>
                              {/* <View style={styles.accordianHeadIcon}></View> */}
                              <Image source={{ uri: item.description }} style={styles.accordianHeadIcon} />
                              <Text style={styles.accordianHeadTitle}>
                                {item.parentskills}
                              </Text>
                            </View>
                            <View style={styles.angle}>
                              {this.state.collapsed.isTrue &&
                                this.state.collapsed.ind.includes(index) ? (
                                  <FontAwesome
                                    name="angle-up"
                                    color="#fff"
                                    size={25}
                                  />
                                ) : (
                                  <FontAwesome
                                    name="angle-down"
                                    color="#fff"
                                    size={25}
                                  />
                                )}
                            </View>
                          </View>
                        </Separator>
                      </CollapseHeader>
                      <CollapseBody>
                        <View style={styles.itemswrapper}>
                          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                            {item.childskills.map((value, index) => {
                              return (
                                <TouchableOpacity key={value.label} onPress={(e) => this.ChildTagList(e, value.label)}>
                                  <View
                                    style={[
                                      styles.skillItems, 
                                      this.state.keyGen.includes(value.label)
                                      ? styles.skillSelected
                                      : '',
                                      ]} 
                                      key={index}>
                                    <Text>{value.label}</Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </ScrollView>
                        </View>
                      </CollapseBody>
                    </Collapse>
                  );
                })}
              </View>
            </ScrollView>
            <View>
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={this.handleSubmit}
                disabled={this.state.buttonstate}>
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDetails: (data, user_id, Flag) => dispatch(updateUserDetails(data, user_id, Flag)),
  };
};
export default connect(null, mapDispatchToProps)(AddskillScreen);
