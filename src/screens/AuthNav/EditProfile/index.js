import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
//import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { withNavigation } from "react-navigation";
import Connect, { connect } from "react-redux";
import axios from "axios";

import base64 from 'base-64';
import { BASE_URL } from "../../../config/ApiUrl"

class EditProfileScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      firtName: '',
      lastName: '',
      college: '',
      major: '',
      currentEnrollment: '',
      typeValue: '',
      location: '',
      startDate: '',
      endDate: '',
      community: '',
      socialUrl: [],
      profileImageSource: '',
      coverImageSource: '../../../assets/images/bnr.jpg',
      profileImageToUpload: {},
      coverImageToUpload: {},
      showStartDatePicker: false,
      showEndDatePicker: false,
      showLoader: false,
      showSkills: false,
      showCategories: false,
      info: "",
      skillsData: [
        { title: 'C' },
        { title: 'JAVA' },
        { title: 'C++' },
        { title: 'C#' },
      ],
      categoriesData: [
        { title: 'Data Entry' },
        { title: 'Software Development' },
        { title: 'Sales and Marketing' },
        { title: 'Music and Arts' },
      ],
      skill: [
        { name: 'Concentration' },
        { name: 'Fast Typing Speed' },
        { name: 'Microsoft Word' },
        { name: 'Microsoft Excel' },
        { name: 'Blockchain' },
        { name: 'Data Science' },
        { name: 'Mathematics' },
      ],
      categories: [
        { name: 'Data Entry' },
        { name: 'Software Development' },
        { name: 'Sales and Marketing' },
        { name: 'Music and Arts' },
      ],
    };
  }
  componentDidMount = () => {
    // console.log("--------------", this.props.userDeatailResponse.row_id, base64.decode(this.props.userDeatailResponse.user_id))
    // getInitialData();
    let body = new FormData();
    body.append("id", this.props.userDeatailResponse.row_id);
    body.append("user_id", base64.decode(this.props.userDeatailResponse.user_id));
    body.append("first_name", "");
    body.append("last_name", "");
    body.append("category", "");
    body.append("skills", "");
    body.append("socialurls", "");
    body.append("about", "");

    //for Job
    body.append("experience_id", "");
    body.append("experience", "");
    body.append("description", "");
    body.append("projecturl", "");
    body.append("professionalurls", "");
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

    const res = axios.post(`${BASE_URL}expertProfile/${base64.decode(this.props.userDeatailResponse.slug)}`, body);
    res.then((res) => {
      console.log(res, "response -------------------")
      const responseObj = res.data[0];
      this.setState({
        firtName: responseObj.first_name, lastName: responseObj.last_name, college: responseObj.college,
        major: responseObj.department, currentEnrollment: responseObj.title, typeValue: responseObj.type,
        location: responseObj.location, categoriesData: responseObj.category, skillsData: responseObj.skills,
        startDate: responseObj.startDate, endDate: responseObj.endDate, community: responseObj.community,
        socialUrl: responseObj.socialurls, info: responseObj.about, coverImageSource: responseObj.cover_image,
        profileImageSource: responseObj.user_image

      })
    })
  }

  selectProfilePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };

  };

  selectCoverPhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker.showImagePicker(options, (showImage) => {
    //   if (showImage.didCancel) {
    //   } else if (showImage.error) {
    //   } else if (showImage.customButton) {
    //   } else {
    //     this.setState({
    //       coverImageToUpload: {
    //         name: showImage.fileName,
    //         type: showImage.type,
    //         // path: showImage.path,
    //         uri: showImage.uri,
    //       },
    //       coverImageSource: showImage.uri,
    //     });
    //   }
    // });
  };

  handleSkills = async () => {
    this.setState({ showSkills: !this.state.showSkills });
  };
  handleCategories = async () => {
    this.setState({ showCategories: !this.state.showCategories });
  };
  handleSubmit = async () => {
    this.setState({ showLoader: true });
    Toast.show('submit action', Toast.LONG);
  };
  FlatListItemSeparator = () => (
    <View
      style={{
        height: 1.5,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
      }}
    />
  );

  handleTextChange = (text, targetState) => {
    if(targetState === "firtName") {
       this.setState({firtName : text.nativeEvent.text});
    }
    // else if()

  }
  render() {
    // console.log(this.props.navigation.state.params.slugname);
    console.log(this.state, "66666666666666666666")

    console.log(this.props.userDeatailResponse)
    // const renderSkillItems = ({ item }) => (
    //   <TouchableOpacity style={styles.headSec}>
    //     <View style={styles.details}>
    //       <Text style={styles.inputHead}>{item.label}</Text>
    //     </View>
    //   </TouchableOpacity>
    // );
    return (
      <View style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar
            backgroundColor="#60a84e"
            barStyle="light-content"
            hidden={false}
            translucent={false}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.uploadSec}>
                <View style={styles.cover}>
                  <Image
                    style={[CommonStyles.image]}
                    // source={require('../../../assets/images/bnr.jpg')}
                    source={{
                      uri: `${this.state.coverImageSource ? this.state.coverImageSource : "../../../assets/images/bnr.jpg"}`,
                    }}
                  />
                  <Image
                    style={styles.uploadcoverImage}
                    source={{
                      uri: `${this.state.coverImageSource ? this.state.coverImageSource : "../../../assets/images/bnr.jpg"}`,
                    }}
                  />
                  <TouchableOpacity
                    onPress={this.selectCoverPhoto}
                    style={styles.coverUpload}>
                    <FontAwesome name="camera" size={20} color="#71b85f" />
                  </TouchableOpacity>
                </View>

                <View style={styles.logo}>
                  <Image
                    style={[styles.image, { borderRadius: 55 }]}
                    // source={require('../../../assets/images/userPro.jpg')}
                    source={{
                      uri: `${this.state.profileImageSource ? this.state.profileImageSource : '../../../assets/images/userPro.jpg' }`,
                    }}

                  />
                  <Image
                    style={styles.uploadImage}
                    source={{
                      uri: `${this.state.profileImageSource ? this.state.profileImageSource : '../../../assets/images/userPro.jpg' }`,
                    }}
                  />
                  <TouchableOpacity
                    onPress={this.selectProfilePhoto}
                    style={styles.logoUpload}>
                    <FontAwesome name="camera" size={20} color="#71b85f" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.form}>

                <Text style={styles.inputHead}>First Name *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="John"
                      style={styles.inputGroup}
                      keyboardType="default"
                      defaultValue={this.state.firtName}
                      // value={this.state.firtName}
                      onChange={(evt) => this.handleTextChange(evt, "firtName")}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="user" size={25} color="#d7d7d8" />
                  </View>
                </View>

                <Text style={styles.inputHead}>Last Name *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Doe"
                      style={styles.inputGroup}
                      keyboardType="default"
                      defaultValue={this.state.lastName}
                      onChange={(evt) => this.handleTextChange(evt, "lastName")}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="user" size={25} color="#d7d7d8" />
                  </View>
                </View>

                <Text style={styles.inputHead}>College *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="MIT"
                      defaultValue={this.state.college}
                      style={styles.inputGroup}
                      onChange={(evt) => this.handleTextChange(evt, "college")}

                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="graduation-cap"
                      size={25}
                      color="#d7d7d8"
                    />
                  </View>
                </View>

                <Text style={styles.inputHead}>Major *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Java"
                      style={styles.inputGroup}
                      keyboardType="default"
                      onChange={(evt) => this.handleTextChange(evt, "major")}
                      defaultValue={this.state.major}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="graduation-cap"
                      size={25}
                      color="#d7d7d8"
                    />
                  </View>
                </View>

                <Text style={styles.inputHead}>Current Enrollment *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Java"
                      style={styles.inputGroup}
                      keyboardType="default"
                      onChange={(evt) => this.handleTextChange(evt, "currentEnrollment")}
                      defaultValue={this.state.currentEnrollment}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="graduation-cap"
                      size={25}
                      color="#d7d7d8"
                    />
                  </View>
                </View>
                <Text style={styles.inputHead}>Type *</Text>

                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, { width: '100%' }]}>
                    <Picker
                      style={{ width: '100%', height: 45 }}
                      selectedValue={this.state.typeValue}
                      onValueChange={(itemValue, itemIndex) =>
                        // this.setState({ itemValue: itemValue })
                        this.handleTextChange(itemValue, "type")
                      }>
                      <Picker.Item label="Full Timer" value="FT" />
                      <Picker.Item label="Part Timer" value="PT" />
                    </Picker>
                  </View>
                </View>

                <Text style={styles.inputHead}>Location *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="USA"
                      style={styles.inputGroup}
                      keyboardType="default"
                      onChange={(evt) => this.handleTextChange(evt, "location")}
                      defaultValue={this.state.location}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="map-marker" size={25} color="#d7d7d8" />
                  </View>
                </View>

                <Text style={styles.inputHead}>Categories *</Text>

                <View style={[styles.formGroup1]}>
                  <View
                    style={[
                      styles.formSubGroup2,
                      { flexWrap: 'wrap', flexDirection: 'row' },
                    ]}>
                    {this.state.categoriesData.map((item, i) => (
                      <View key={i} style={styles.skillTab}>
                        <Text style={styles.skillText}>{item.label}</Text>
                        <FontAwesome
                          name="times-circle"
                          size={20}
                          color="black"
                          style={styles.marginRight3}
                        />
                      </View>
                    ))}
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="angle-down"
                      size={28}
                      color="#d7d7d8"
                      onPress={() => this.handleCategories()}
                    />
                  </View>
                </View>
                {this.state.showCategories === true ? (
                  <View style={[styles.formGroup1, { marginTop: -15 }]}>
                    {
                      this.state.categoriesData.length > 0 ? this.state.categoriesData.map((item , index) => (
                        <TouchableOpacity style={styles.headSec} key={index}>
                          <View style={styles.details}>
                            <Text style={styles.inputHead}>{item.label}</Text>
                          </View>
                        </TouchableOpacity>

                      )) : null
                    }
                    
                  </View>
                ) : (
                    <></>
                  )}
                <Text style={styles.inputHead}>Skills *</Text>

                <View style={[styles.formGroup1]}>
                  <View
                    style={[
                      styles.formSubGroup2,
                      { flexWrap: 'wrap', flexDirection: 'row' },
                    ]}>
                    {this.state.skillsData.map((item, i) => (
                      <View key={i} style={styles.skillTab}>
                        <Text style={styles.skillText}>{item.label}</Text>
                        <FontAwesome
                          name="times-circle"
                          size={20}
                          color="black"
                          style={styles.marginRight3}
                        />
                      </View>
                    ))}
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="angle-down"
                      size={28}
                      color="#d7d7d8"
                      onPress={() => this.handleSkills()}
                    />
                  </View>
                </View>
                {this.state.showSkills === true ? (
                  <View style={[styles.formGroup1, { marginTop: -15 }]}>
                    {
                      this.state.skillsData.length > 0 ? this.state.skillsData.map((item , index) => (
                        <TouchableOpacity style={styles.headSec} key={index}>
                          <View style={styles.details}>
                            <Text style={styles.inputHead}>{item.label}</Text>
                          </View>
                        </TouchableOpacity>

                      )) : null
                    }
                  </View>
                ) : (
                    <></>
                  )}

                <Text style={styles.inputHead}>Start Date *</Text>
                {this.state.showStartDatePicker === true ? (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(1598051730000)}
                    placeholder="Select Start Date"
                    mode={'date'}
                    onChange={(data) => this.handleTextChange((moment(data.timeStamp).format("MM/DD/YYYY"), "startDate"))}
                    is24Hour={true}
                    display="default"
                  />
                ) : (
                    <></>
                  )}
                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, { height: 45 }]}>
                    <Text style={styles.inputHead2}>
                      {this.state.startDate}
                    </Text>
                  </View>
                  <View style={styles.formSubGroup1}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          showStartDatePicker: !this.state.showStartDatePicker,
                        })
                      }>
                      <FontAwesome name="calendar" size={25} color="#d7d7d8" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.inputHead}>End Date *</Text>
                {this.state.showEndDatePicker === true ? (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(1598051730000)}
                    dateFormat="day month year"
                    // value={new Date()}
                    placeholder="Select End Date"
                    mode={'date'}
                    is24Hour={true}
                    onChange={(data) => this.handleTextChange((moment(data.timeStamp).format("MM/DD/YYYY"), "endDate"))}
                    display="default"
                  />
                ) : (
                    <></>
                  )}
                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, { height: 45 }]}>
                    <Text style={styles.inputHead2}>{this.state.endDate}</Text>
                  </View>
                  <View style={styles.formSubGroup1}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          showEndDatePicker: !this.state.showEndDatePicker,
                        })
                      }>
                      <FontAwesome name="calendar" size={25} color="#d7d7d8" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.inputHead}>Community *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="community"
                      defaultValue={this.state.community}
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                </View>

                <Text style={styles.inputHead}>Social Url(s) *</Text>

                {this.state.socialUrl.length> 0 ? 
                  this.state.socialUrl.map((data, index) => (
                    <View style={styles.formGroup11} key={index}>
                      <View style={[styles.formGroup1, this.state.socialUrl.length-1 === index ?{ width: '85%' } : { width: '100%' }]}>
                        <View style={styles.formSubGroup2}>
                          <TextInput
                            returnKeyType="done"
                            placeholder="http://facebook.com/..."
                            defaultValue={data.socialurl}
                            style={styles.inputGroup}
                            keyboardType="default"
                          />
                        </View>
                      </View>
                      {

                      this.state.socialUrl.length-1 === index ?
                      <View style={[styles.formSubGroup1, { marginLeft: 3, borderRadius: 5, height: 55, backgroundColor: '#71b85f', width: '15%', elevation: 4 }]}>
                        <FontAwesome name="plus" size={25} color="#fff" />
                      </View> : null
                      }
                    </View>

                  )) : 
                  <View style={styles.formGroup11}>
                    <View style={[styles.formGroup1, { width: '85%' }]}>
                      <View style={styles.formSubGroup2}>
                        <TextInput
                          returnKeyType="done"
                          placeholder="http://facebook.com/..."
                          style={styles.inputGroup}
                          keyboardType="default"
                        />
                      </View>
                    </View>

                    <View style={[styles.formSubGroup1, { marginLeft: 3, borderRadius: 5, height: 55, backgroundColor: '#71b85f', width: '15%', elevation: 4 }]}>
                      <FontAwesome name="plus" size={25} color="#fff" />
                    </View>
                  </View>
                }
                <Text style={styles.inputHead}>Info *</Text>

                <View
                  style={[
                    styles.formGroup1,{
                      height: 180,
                    },
                  ]}>
                  <View
                    style={[
                      styles.formSubGroup2,{
                        height: 180,
                        width: '100%',
                      },
                    ]}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Write something..."
                      defaultValue={this.state.info}
                      style={[
                        styles.inputGroup,
                        {
                          height: 180,
                          justifyContent: 'flex-start',
                          textAlignVertical: 'top',
                        },
                      ]}
                      keyboardType="default"
                      numberOfLines={10}
                      multiline={true}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => this.handleSubmit()}
                  style={[styles.authBtn]}>
                  <Text style={styles.authBtnText}>Submit</Text>
                  {this.state.showLoader && (
                    <ActivityIndicator
                      size="large"
                      color="#fff"
                      style={CommonStyles.loader}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    userDeatailResponse: state.userData,
  };
};

export default connect(mapStateToProps, null,)(withNavigation(EditProfileScreen));
