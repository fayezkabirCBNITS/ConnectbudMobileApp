import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Picker } from '@react-native-community/picker';
import { withNavigation } from "react-navigation";
// import { updateslug, updateUserDetails } from "../../../redux/actions/user-data";
import { connect } from "react-redux";
import base64 from "base-64"
// import API_URL from '../../../config/ApiUrl';
import API_URL, { BASE_URL } from "../../../config/ApiUrl";
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart } from '../../../services/http-connectors';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";

class AddPortfolioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImageSource: Image.resolveAssetSource(
        API_URL.PLACEHOLDER_SQUARE_IMAGE,
      ).uri,
      porfolioTitle: "",
      portfolioDescription: "",
      selectedCategory: "",
      liveUrl: "",
      portfolioId: ""
    }
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.FetchPortfolio();
    });
    this.FetchPortfolio();
  };

  FetchPortfolio = async () => {
    //this.CategorySearch();
    let body = new FormData();

    //mandatory for fetch
    body.append("id", this.props.userDeatailResponse.row_id);
    body.append("user_id", base64.decode(this.props.userDeatailResponse.user_id));

    //For Edit Intro
    body.append("first_name", "");
    body.append("last_name", "");
    body.append("category", "");
    body.append("skills", "");
    body.append("socialurls", "");

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
    body.append("portfolio_name", "");
    body.append("portfolio_des", "");
    body.append("portfolio_category", "");
    body.append("portfolio_link", "");
    body.append("image", "");
    {
      this.props.navigation.state.params.portfolioID !== "" ? (
        body.append("portfolio_id", this.props.navigation.state.params.portfolioID)
      ) : (body.append("portfolio_id", ""))
    }
    body.append("devices", "mobile");

    let response = await makePostRequestMultipart(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body);
    if (response) {
      if (this.props.navigation.state.params.portfolioID !== "") {
        this.setState({
          porfolioTitle: response[0].title, portfolioDescription: response[0].description, portfolioId: response[0].id,
          liveUrl: response[0].link, profileImageSource: response[0].image, selectedCategory: response[0].category
        });
      }
    }
  }
  static navigationOptions = {
    headerShown: false,
  };

  handleAddPortfolio = async data => {
    let body = new FormData();

    body.append("id", this.props.userDeatailResponse.row_id);
    body.append("user_id", base64.decode(this.props.userDeatailResponse.user_id));

    //For Edit Intro
    body.append("first_name", "");
    body.append("last_name", "");
    body.append("category", "");
    body.append("skills", "");
    body.append("socialurls", "");

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
    body.append("portfolio_name", this.state.porfolioTitle);
    body.append("portfolio_des", this.state.portfolioDescription);
    body.append("portfolio_category", this.state.selectedCategory);
    body.append("portfolio_link", this.state.liveUrl);
    body.append("image", this.state.profileImageSource);
    body.append("portfolio_id", this.state.portfolioId);
    body.append("devices", "mobile");

    let response = await makePostRequestMultipart(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body);
    if (response) {
      this.props.navigation.navigate('ProfileScreen')
    }
  }

  handleStateUpdate = (text, targetState) => {
    if (targetState === "title") {
      this.setState({ porfolioTitle: text.nativeEvent.text })
    } else if (targetState == "description") {
      this.setState({ portfolioDescription: text.nativeEvent.text })
    } else if (targetState == "liveUrl") {
      this.setState({ liveUrl: text.nativeEvent.text })
    }
  }

  handleImage = () => {
    let sendImage = []
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      mediaType: 'photo'
    }).then(images => {
      console.log("images---", images)
      this.setState({ profileImageSource: "data:image/png;base64," + images.data });
    })
  }

  render() {
    const renderCountryItems = ({ item }) => (
      <TouchableOpacity style={styles.headSec}>
        <View style={styles.details}>
          <Text style={styles.flastListHead}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )

    return (
      <SafeAreaView style={CommonStyles.safeAreaView} >
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
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.headText}>Add a portfolio item</Text>

            <View style={styles.formInput}>
              <TextInput
                returnKeyType="done"
                placeholder="Portfolio Title eg. Python Development"
                keyboardType="default"
                style={styles.formGroup}
                defaultValue={this.state.porfolioTitle}
                onChange={(evt) => this.handleStateUpdate(evt, "title")}
              />
            </View>

            <View style={styles.formInput}>
              <TextInput
                returnKeyType="done"
                placeholder="Portfolio Description eg. build ecommerce app using python"
                keyboardType="default"
                style={[styles.formGroup, { height: 120 }]}
                multiline={true}
                numberOfLines={5}
                defaultValue={this.state.portfolioDescription}
                onChange={(evt) => this.handleStateUpdate(evt, "description")}
              />
            </View>

            <View style={styles.skillView1}>
              <View style={[styles.formGroup1]}>
                <Picker
                  style={{ width: '100%', height: 45, color: '#3B1D25' }}
                  selectedValue={this.state.selectedCategory}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedCategory: itemValue })
                  }>
                  <Picker.Item label="HomeWork" value="HomeWork" />
                  <Picker.Item label="HomeWork" value="HomeWork" />
                  <Picker.Item label="Online Coding" value="Online Coding" />
                  <Picker.Item label="Design" value="Design" />
                  <Picker.Item label="Fitness" value="Fitness" />
                  <Picker.Item label="Music & Arts" value="Music & Arts" />
                </Picker>
              </View>
            </View>


            <View style={{ marginHorizontal: '5%', marginVertical: '2%', }}>
              <TextInput
                returnKeyType="done"
                placeholder="Live URL"
                keyboardType="default"
                style={styles.formGroup}
                defaultValue={this.state.liveUrl}
                onChange={(evt) => this.handleStateUpdate(evt, "liveUrl")}
              />
            </View>

            <View style={[styles.formGroup1, { marginHorizontal: '5%', marginVertical: '4%' }]}>
              <View style={styles.formSubGroup2Num}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Upload Image"
                  style={styles.inputGroup}
                  keyboardType="default"
                  value={this.state.number}
                />
              </View>
              <View style={[styles.formSubGroupNum]}>
                <TouchableOpacity
                  onPress={this.handleImage}
                  style={{ backgroundColor: '#595555', borderRadius: 40 }}>

                  <Text
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      color: '#fff',
                    }}>
                    Choose
                                    </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{
              width: 90,
              height: 90,
              marginTop: 10,
              marginBottom: 20,
              borderRadius: 15,
              backgroundColor: 'rgba(152,152,152,0.2)',
              marginLeft: 'auto',
              marginRight: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                style={styles.uploadImage}
                source={{
                  uri: `${this.state.profileImageSource}`,
                }}
              />

            </View>

            <View style={styles.btnGrp}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.handleSubmit()}
                style={[styles.authBtn]}>
                <Text style={styles.authBtnText}>Cancel</Text>
                {this.state.showLoader && (
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                  // style={CommonStyles.loader}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.handleAddPortfolio()}
                style={[styles.authBtn]}>
                <Text style={styles.authBtnText}>Update</Text>
                {this.state.showLoader && (
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                  // style={CommonStyles.loader}
                  />
                )}
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null)(withNavigation(AddPortfolioScreen));