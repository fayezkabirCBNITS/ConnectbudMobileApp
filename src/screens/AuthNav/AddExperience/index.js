import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  UIManager,
  Animated,
  Image,
  LayoutAnimation,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import base64 from 'base-64';
import { BASE_URL } from "../../../config/ApiUrl"
import axios from "axios";

const width = Dimensions.get('window').width;
class Animated_Item extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0.5,
      duration: 510,
      useNativeDriver: true,
    }).start(() => {
      this.props.afterAnimationComplete();
    });
  }

  deleteItem = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 510,
      useNativeDriver: true,
    }).start(() => {
      this.props.deleteItem(this.props.item.id);
    });
  };

  render() {
    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width],
    });

    const opacity_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Animated.View
        style={[
          //styles.singleItemView,
          styles.formGroup1,
          {
            transform: [{ translateX: translate_Animation_Object }],
            opacity: opacity_Animation_Object,
            marginBottom: 35
          },
        ]}>
        {/* <Text style={styles.singleItemText}>Item {this.props.item.text}</Text> */}

        <View style={styles.formSubGroup2}>
          <TextInput
            returnKeyType="done"
            placeholder="http://facebook.com/..."
            style={styles.inputGroup}
            keyboardType="default"
            onChange={(evt) => this.props.handleAdditionUrls(evt , "addition" , this.props.index)}//
          />
        </View>
        {/* <View style={styles.formSubGroup1}>
          <TouchableOpacity onPress={this.deleteItem}>
            <FontAwesome name="minus" size={25} color="#d7d7d8" />
          </TouchableOpacity>
        </View> */}
      </Animated.View>
    );
  }
}

class AddExperienceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueArray: [],
      disabled: false,
      id: "",
      userID: "",
      projectTitle: "",
      projectDecription: "",
      projectUrl: "",
      additionalurls: [{id : 0 , text : ""}],
    };
    this.addNewElement = false;
    this.index = 0;
  }
  componentDidMount = () => {
    this.setState({ id: this.props.userDeatailResponse.row_id, userID: base64.decode(this.props.userDeatailResponse.user_id) })

  }

  static navigationOptions = {
    headerShown: false,
  };

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  };
  add_New_View = (text) => {
    this.addNewElement = true;
    const newlyAddedValue = { id: this.index+1, text: this.index + 1 };

    this.setState({
      disabled: true,
      valueArray: [...this.state.valueArray, newlyAddedValue],
    });
  };

  remove_Selected_Item(id) {
    this.addNewElement = false;
    const newArray = [...this.state.valueArray];
    newArray.splice(
      newArray.findIndex((ele) => ele.id === id),
      1,
    );

    this.setState(
      () => {
        return {
          valueArray: newArray,
        };
      },
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    );
  }
  handleSubmit = async () => {
    let addtionUrl = this.state.additionalurls.concat(this.state.valueArray);
    let combinedArr = addtionUrl.map((data) => data.text).join(",")
    let body = new FormData();

    body.append("id", this.state.id);
    body.append("user_id", this.state.userID);

    //For Edit Intro
    body.append("first_name", "");
    body.append("last_name", "");
    body.append("category", "");
    body.append("skills", "");
    body.append("socialurls", "");
    body.append("about", "");

    //for Job
    body.append("experience_id", "")
    body.append("experience", this.state.projectTitle);
    body.append("description", this.state.projectDecription);
    body.append("projecturl", this.state.projectUrl);
    body.append("professionalurls", combinedArr);
    body.append("employment_type", "");
    body.append("willing_to_relocate", "");
    body.append("country", "");
    body.append("city", "");
    body.append("resumefile", "");
    body.append("videoresume", "");

    // For Education
    body.append("department", "");
    body.append("title", "");
    body.append("type", "");
    body.append("location", "");
    body.append("startDate", "");
    body.append("endDate", "");
    body.append("community", "");

    //For Portfolio
    body.append("portfolio_id", "")
    body.append("portfolio_name", "");
    body.append("portfolio_des", "");
    body.append("portfolio_category", "");
    body.append("portfolio_link", "");
    body.append("image", "");

    //For Availability
    body.append("date", "");

    await axios
      .post(
        BASE_URL +
        "expertProfile/" +
        base64.decode(this.props.userDeatailResponse.slug),
        body
      )
      .then((res) => {
        if(res.status === 200) this.props.navigation.navigate('ProfileScreen')
        // this.setState({});

        // this.props.history.push(
        //   "/profile/" + this.props.match.params.name.split(" ").join("-")
        // );
      });
  };

  handleTextChange = (text, targetState) => {
    if (targetState === "projectTitle") {

      this.setState({ projectTitle: text.nativeEvent.text });
    } else if (targetState === "projectDecription") {

      this.setState({ projectDecription: text.nativeEvent.text });
    } else if (targetState === "projectUrl") {

      this.setState({ projectUrl: text.nativeEvent.text });
    }
  }

  handleAdditionUrls = (text ,targetState ,  targetIndex) => {
    if(targetState === "initial") {
      this.state.additionalurls[0].text = text.nativeEvent.text;
    }
    else if(targetState === "addition") {
      this.state.valueArray[targetIndex].text = text.nativeEvent.text;
    }
  }

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color="#71b85f"
              />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.image}
            />
            <View style={{ width: 35 }}></View>
          </View>
          <View style={CommonStyles.container}>
            <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.portfolioHead}>Add Your Project Details</Text>
              <Text style={styles.inputHead}>* Project Title: </Text>

              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { width: '100%' }]}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="Project Title: Java Tutorial"
                    style={styles.inputGroup}
                    keyboardType="default"
                    onChange={(evt) => this.handleTextChange(evt, "projectTitle")}
                  />
                </View>
              </View>

              <Text style={styles.inputHead}>* Project Description: </Text>

              <View
                style={[
                  styles.formGroup1,
                  {
                    height: 180,
                  },
                ]}>
                <View
                  style={[
                    styles.formSubGroup2,
                    {
                      height: 180,
                      width: '100%',
                    },
                  ]}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="Project Description e.g. - Introduction to Java,
                    Basic Oops Concept..."
                    style={[
                      styles.inputGroup,
                      {
                        height: 180,
                        justifyContent: 'flex-start',
                        textAlignVertical: 'top',
                      },
                    ]}
                    onChange={(evt) => this.handleTextChange(evt, "projectDecription")}
                    keyboardType="default"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>
              </View>

              <Text style={styles.inputHead}>* Project Url: </Text>

              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, { width: '100%' }]}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="e.g.http://github.com/"
                    style={styles.inputGroup}
                    keyboardType="default"
                    onChange={(evt) => this.handleTextChange(evt, "projectUrl")}
                  />
                </View>
              </View>

              <Text style={styles.inputHead}>* Additional Url(s):</Text>

              <View style={styles.formGroup11}>
                <View style={[styles.formGroup1, { width: '85%' }]}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="http://facebook.com/..."
                      style={styles.inputGroup}
                      keyboardType="default"
                      onChange={(evt) => this.handleAdditionUrls(evt , "initial" , 0)}//addition
                    />
                  </View>
                </View>

                <View style={[styles.formSubGroup11]}>
                  <TouchableOpacity onPress={() => this.add_New_View()}>
                    <FontAwesome name="plus" size={25} color="#d7d7d8" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ width: '100%' }}>
                <ScrollView
                  ref={(scrollView) => (this.scrollView = scrollView)}
                  onContentSizeChange={() => {
                    this.addNewElement && this.scrollView.scrollToEnd();
                  }}>
                  <View style={{ flex: 1, padding: 4 }}>
                    {this.state.valueArray.map((ele , index) => {
                      return (
                        <Animated_Item
                          key={ele.id}
                          item={ele}
                          deleteItem={(id) => this.remove_Selected_Item(id)}
                          afterAnimationComplete={this.afterAnimationComplete}
                          handleAdditionUrls={this.handleAdditionUrls}
                          index={index}
                          
                        />
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              <TouchableOpacity
              onPress={this.handleSubmit}
                activeOpacity={0.9}
                style={[styles.authBtn, { marginTop: 10, marginBottom: 100, }]}>
                <Text style={styles.authBtnText}>Add</Text>
                {this.state.showLoader && (
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                    style={CommonStyles.loader}
                  />
                )}
              </TouchableOpacity>
            </ScrollView>
            
            </KeyboardAvoidingView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    userDeatailResponse: state.userData,
  };
};

// export default AddExperienceScreen;
export default connect(mapStateToProps, null,)(withNavigation(AddExperienceScreen));
