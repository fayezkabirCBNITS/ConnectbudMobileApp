import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequest, makeGetRequest } from '../../../services/http-connectors';


class AddskillScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: { isTrue: false, ind: [] },
      skillSet: [],
      keyGen: [],
      buttonstate: true,
      addSkill: "",
      addSkillBox: false
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
    //localStorage.setItem("tagId", this.state.keyGen);

    const body = {
      category_name: this.state.keyGen.toString(),
      user_id: this.props.navigation.state.params.userID,
      skill_name: this.state.addSkill
    };
    let response = await makePostRequest(ApiUrl.ChildSkillSubmit, false, body);
    if (response) {
      // localStorage.setItem("token", response.data[0].Token);
      // localStorage.setItem("slugname", response.data[0].slug);
      this.props.navigation.navigate('StudentInner');
    }
  };

  componentDidMount = async () => {
    const body = {
      category_id: this.props.navigation.state.params.tagID.toString(),
      page_type: "maintag"
    };
    let response = await makePostRequest(ApiUrl.CategorySubmit, false, body);
    this.setState({
      skillSet: response
    });
  }

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
                          <ScrollView showsVerticalScrollIndicator={false}>
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

export default AddskillScreen;
