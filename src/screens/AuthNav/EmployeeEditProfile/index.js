import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Modal,
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
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-simple-toast';
import { withNavigation } from "react-navigation";
import { updateslug, updateUserDetails } from "../../../redux/actions/user-data";
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart, makeAuthGetRequest } from '../../../services/http-connectors';
import { connect } from 'react-redux';
import base64 from 'base-64';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';

class EmployeeEditProfileScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      designation: "",
      country: "",
      city: "",
      company_name: "",
      about: "",
      CityList: [],
      profileImageSource: "",
      coverImageSource: "",
      profileImageToUpload: {},
      coverImageToUpload: {},
      showLoader: false,
      showModal: false,
      errors: {},
    };
  }

  handleTextChange = async (text, targetState) => {
    if (targetState === "first_name") {
      await this.setState({ firstname: text.nativeEvent.text });
    } else if (targetState === "last_name") {
      await this.setState({ lastname: text.nativeEvent.text })
    } else if (targetState === "designation") {
      await this.setState({ designation: text.nativeEvent.text })
    } else if (targetState === "company_name") {
      await this.setState({ company_name: text.nativeEvent.text })
    } else if (targetState === "about") {
      await this.setState({ about: text.nativeEvent.text })
    }
    this.validateForm();
  }

  selectCountry = async (country) => {
    await this.setState({ country: country, city: "" });
    this.CitySearch();
    this.validateForm();
  };

  CitySearch = async () => {
    let response = await makeAuthGetRequest(ApiUrl.Location + this.state.country.trim(), false, '');
    if (response) {
      this.setState({ CityList: response });
    }
  };

  selectCity = async (city) => {
    await this.setState({ city: city });
    this.validateForm();
  };

  selectProfilePhoto = () => {
    const { userData } = this.props;

    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      mediaType: 'photo'
    }).then(images => {
      this.setState({ profileImageSource: "data:image/png;base64," + images.data });

      let body = new FormData();
      body.append("image", this.state.profileImageSource);
      body.append("id", userData.row_id);
      body.append("user_id", base64.decode(userData.user_id));
      body.append("flag", base64.decode(userData.Flag));

      let response = makePostRequestMultipart(ApiUrl.SaveProfileImage, false, body);
      response.then(res => {
        console.log('ress=====>', res)
      });
    })
  };

  selectCoverPhoto = () => {
    const { userData } = this.props;

    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      mediaType: 'photo'
    }).then(images => {
      this.setState({ coverImageSource: "data:image/png;base64," + images.data });

      let body = new FormData();
      body.append("image", this.state.coverImageSource);
      body.append("id", userData.row_id);
      body.append("user_id", base64.decode(userData.user_id));
      body.append("flag", base64.decode(userData.Flag));

      let response = makePostRequestMultipart(ApiUrl.SaveCoverImage, false, body);
      response.then(res => {
        console.log('ress=====>', res)
      });
    })
  };

  componentDidMount = async () => {
    const { userData } = this.props;
    this.setState({ showLoader: true })
    let body1 = new FormData();

    body1.append("id", userData.row_id);
    body1.append("user_id", base64.decode(userData.user_id));
    body1.append("first_name", "");
    body1.append("last_name", "");
    body1.append("company_name", "");
    body1.append("designation", "");
    body1.append("country", "");
    body1.append("city", "");
    body1.append("about", "");

    let response = await makePostRequestMultipart(ApiUrl.RecruiterProfile + base64.decode(userData.slug), false, body1);
    if (response) {
      this.setState({
        firstname: response[0].first_name.trim(),
        lastname: response[0].last_name.trim(),
        company_name: response[0].company_name,
        designation: response[0].designation,
        country: response[0].country,
        city: response[0].city,
        about: response[0].about,
        profileImageSource: response[0].user_image,
        coverImageSource: response[0].cover_image,
        showLoader: false,
      });
      this.CitySearch();
    }
  };

  aboutSubmit = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.handleSubmit();
    }
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.firstname) {
      formIsValid = false;
      errors["firstname"] = "*Please enter your first name";
    }
    if (!this.state.lastname) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your last name";
    }
    // if (!this.state.company_name) {
    //   formIsValid = false;
    //   errors["company_name"] = "*Please enter your company name";
    // }
    if (!this.state.designation) {
      formIsValid = false;
      errors["designation"] = "*Please enter your designation";
    }
    if (!this.state.country) {
      formIsValid = false;
      errors["country"] = "*Please select your country";
    }
    if (!this.state.city) {
      formIsValid = false;
      errors["city"] = "*Please select your city";
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  handleSubmit = async () => {
    const { userData } = this.props;
    this.setState({ showLoader: true })
    if (
      this.state.firstname.match(/^[a-zA-Z ]*$/) &&
      this.state.lastname.match(/^[a-zA-Z ]*$/)
    ) {
      let body = new FormData();

      body.append("id", userData.row_id);
      body.append("user_id", base64.decode(userData.user_id));
      body.append("first_name", this.state.firstname);
      body.append("last_name", this.state.lastname);
      body.append("company_name", this.state.company_name);
      body.append("designation", this.state.designation);
      body.append("country", this.state.country);
      body.append("city", this.state.city);
      body.append("about", this.state.about);

      let response = await makePostRequestMultipart(ApiUrl.RecruiterProfile + base64.decode(userData.slug), false, body);
      if (response) {
        this.props.updateslug(base64.encode(response[0].slug_name));
        this.setState({ showLoader: false });
        this.props.navigation.navigate('EmployeeProfileScreen')
      }
    } else {
      alert("The name field contains alphabet characters only.");
      this.setState({ showLoader: false });
    }
  };

  render() {
    return (
      <View style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>

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
                    style={styles.uploadImage}
                    source={{
                      uri: `${this.state.profileImageSource ? this.state.profileImageSource : '../../../assets/images/userPro.jpg'}`,
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

                <Text style={styles.inputHead}>*First Name</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="e.g. John"
                      style={styles.inputGroup}
                      keyboardType="default"
                      defaultValue={this.state.firstname}
                      onChange={(evt) => this.handleTextChange(evt, "first_name")}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="user" size={25} color="#d7d7d8" />
                  </View>
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.firstname}
                </Text>

                <Text style={styles.inputHead}>*Last Name</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="e.g. Doe"
                      style={styles.inputGroup}
                      keyboardType="default"
                      defaultValue={this.state.lastname}
                      onChange={(evt) => this.handleTextChange(evt, "last_name")}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="user" size={25} color="#d7d7d8" />
                  </View>
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.lastname}
                </Text>

                <Text style={styles.inputHead}>Company Name</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="e.g. ABC Company"
                      style={styles.inputGroup}
                      keyboardType="default"
                      value={this.state.company_name}
                      onChange={(evt) => this.handleTextChange(evt, "company_name")}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="building"
                      size={25}
                      color="#d7d7d8"
                    />
                  </View>
                </View>
                {/* <Text style={styles.errorText}>
                  {this.state.errors.company_name}
                </Text> */}

                <Text style={styles.inputHead}>*Designation</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="e.g. Hiring Manager"
                      style={styles.inputGroup}
                      keyboardType="default"
                      value={this.state.designation}
                      onChange={(evt) => this.handleTextChange(evt, "designation")}
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="briefcase"
                      size={25}
                      color="#d7d7d8"
                    />
                  </View>
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.designation}
                </Text>

                <Text style={styles.inputHead}>*Country</Text>

                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, { width: '100%' }]}>
                    <Picker
                      style={{ width: '100%', height: 45 }}
                      selectedValue={this.state.country}
                      onValueChange={(itemValue, itemIndex) =>
                        this.selectCountry(itemValue)
                      }>
                      <Picker.Item label="India" value="India" />
                      <Picker.Item label="USA" value="USA" />
                    </Picker>
                  </View>
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.country}
                </Text>

                <Text style={styles.inputHead}>*Current City</Text>

                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, { width: '100%' }]}>
                    <Picker
                      style={{ width: '100%', height: 45 }}
                      selectedValue={this.state.city}
                      enabled={this.state.country !== "" ? true : false}
                      onValueChange={(itemValue, itemIndex) =>
                        this.selectCity(itemValue)
                      }>
                      {this.state.CityList.map((value) => (
                        <Picker.Item label={value.label} value={value.label} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.city}
                </Text>

                <Text style={styles.inputHead}>About</Text>

                <View style={[styles.formGroup1, { height: 180, },]}>
                  <View
                    style={[
                      styles.formSubGroup2, {
                        height: 180,
                        width: '100%',
                      },
                    ]}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Write here..."
                      value={this.state.about}
                      onChange={(evt) => this.handleTextChange(evt, "about")}
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
                  activeOpacity={0.8}
                  onPress={this.aboutSubmit}
                  style={[styles.authBtn]}>
                  <Text style={styles.authBtnText}>Update</Text>
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
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDetails: (data) => dispatch(updateUserDetails(data)),
    updateslug: (data) => dispatch(updateslug(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps,)(withNavigation(EmployeeEditProfileScreen));
