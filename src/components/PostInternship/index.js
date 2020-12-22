import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import styles from './styles';
import {connect} from 'react-redux';
import Validator from '../../config/Validator';
import ApiUrl from '../../config/ApiUrl';
import {Icon, CheckBox} from 'react-native-elements';
import {
  makePostRequestMultipart,
  makeAuthGetRequest,
} from '../../services/http-connectors';
import ErrorMsg from '../../components/ErrorMsg';
import {withNavigation} from 'react-navigation';
class PostInternship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      jobTitle: '',
      jobDescription: '',
      companyName: '',
      price: '',
      locationName: '',
      jobType: '',
      currencyType: 'USD',
      passportType: false,
      selectedSkills: [],
      selectedSkillIndex: null,
      skills: [],
      filteredSkills: [],
      cityArray: [],
      cityValue: '',
      countryValue: '',
      //
      errJobTitle: false,
      errJobDesc: false,
      errCompanyname: false,
      errSkills: false,
      errLocationName: false,
      errPrice: false,
      errCurrencyType: false,
      errPassportType: false,
      errJobType: false,
      showCity: false,
      showVisa: true,
      visaYesChecked: false,
      VisaNoChecked: false,
      visaType: '',
      //
    };
  }

  static navigationOptions = {
    headerShown: false,
  };
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.fetchSkills();
    });
    this.fetchSkills();
  }
  async fetchSkills() {
    let response = await makeAuthGetRequest(ApiUrl.FetchSkills, false, '');
    //this.setState({isGetModalVisible: false});
    console.log('menuItemsResponse====>>>>>>', response);
    this.setState({skills: response});
  }

  setVisaYes = () => {
    this.setState({visaYesChecked: true, VisaNoChecked: false});
    //this.setState({visaType: ''});
  };

  setVisaNo = () => {
    this.setState({VisaNoChecked: true, visaYesChecked: false});
    //this.setState({visaType: ''});
  };
  handleClick = async (e, name) => {
    if (name === 'jobTitle') {
      this.setState({
        restaurantName: e.nativeEvent.text,
        errRestaurantName: false,
      });
    } else if (name === 'jobDescription') {
      this.setState({
        taxID: e.nativeEvent.text,
        errTaxID: false,
      });
    } else if (name === 'companyName') {
      this.setState({
        address: e.nativeEvent.text,
        errAddress: false,
      });
    } else if (name === 'price') {
      this.setState({
        zipCode: e.nativeEvent.text,
        errZipcode: false,
      });
    } else if (name === 'locationName') {
      this.setState({
        description: e.nativeEvent.text,
        errDescription: false,
      });
    } else if (name === 'jobType') {
      this.setState({
        phone: e.nativeEvent.text,
        errPhone: false,
        errPhoneNotNumber: false,
        errPhoneBlank: false,
      });
    } else if (name === 'currencyType') {
      this.setState({
        phone: e.nativeEvent.text,
        errPhone: false,
        errPhoneNotNumber: false,
        errPhoneBlank: false,
      });
    }
    // else if (name === 'jobType') {
    //   this.setState({
    //     phone: e.nativeEvent.text,
    //     errPhone: false,
    //     errPhoneNotNumber: false,
    //     errPhoneBlank: false,
    //   });
    // }
  };
  reverseAddSkills = async (index) => {
    // this.setState({})
    this.setState({
      selectedSkills: this.state.selectedSkills.filter((_, i) => i !== index),
    });
    let data = this.state.selectedSkills[index];
    await this.setState({
      skills: this.state.skills.concat({value: data, label: data}).sort(),
    });
    this.setState({skills: this.state.skills.sort()});
  };
  async fetchCountry(countryValue) {
    let response = await makeAuthGetRequest(
      ApiUrl.Location + countryValue,
      false,
      '',
    );
    console.log('countryResponse====>>>>>>', response);
    this.setState({countryValue: countryValue});
    this.setState({cityArray: response});
    if (countryValue === 'All') {
      this.setState({showCity: false, showVisa: true, currencyType: 'USD'});
    } else if (countryValue === 'India') {
      this.setState({showCity: true, showVisa: false, currencyType: 'INR'});
    } else if (countryValue === 'USA') {
      this.setState({showCity: true, showVisa: true, currencyType: 'USD'});
    }
  }
  handleSubmit = async () => {
    console.log(
      'selected Skills====>>>>>>',
      this.state.selectedSkills,
      this.state.selectedSkillIndex,
    );
    /*
Request URL: https://api.connectbud.com/recruiter_job_post

user_id: 2489
job_title: Animation Designer
job_company: cbnits
skill_set: Animation
job_description: test desc test desctest desctest desctest desctest desc test desctest desctest desctest desctest desctest desctest desctest desc
country: All
city: 
job_type: Full Time
unit: USD
job_amount: 250
authorisation_visa: Yes
skill_name: 
*/
/*
    let body = new FormData();
    body.append('username', this.state.email);
    body.append('password', this.state.fields.password);
    body.append('email', this.state.email);
    body.append('first_name', this.state.fields.first_name);
    body.append('last_name', this.state.fields.last_name);
    body.append('collegeName', this.state.college);
    body.append('major', this.state.fields.major);
    body.append('course_type', this.state.courseType);
    this.setState({errEmail: false});
    this.setState({errCollege: false});
    this.setState({errCourseType: false});
    console.log('handle formdata -----', body);

    let response = await makePostRequestMultipart(
      ApiUrl.PostJob,
      false,
      body,
    );
    console.log('handle freelancer Signup-----', response);
    if (response) {
      this.setState({userEmail: response?.email});
      this.setState({isModalVisible: true});
    } else {
      //alert('The email or password you have entered is invalid!');
      // Toast.show(response.msg, Toast.LONG);
    }
    */
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                padding: 20,
                marginBottom: -10,
              }}>
              Create Your Job Posting
            </Text>
            <View
              style={{
                borderBottomColor: 'rgba(59,29,37,0.5)',
                borderBottomWidth: 1,
                width: '90%',
                marginHorizontal: '5%',
              }}
            />

            <Text style={[styles.title, {marginTop: 20}]}>Job Details</Text>
            <View style={{marginHorizontal: '5%', marginVertical: '2%'}}>
              <TextInput
                returnKeyType="done"
                placeholder="* Title [max 100 Chars]"
                keyboardType="default"
                style={styles.formGroup1}
                value={this.state.jobTitle}
                onChange={(evt) => this.handleClick(evt, 'jobTitle')}
                blurOnSubmit={false}
              />
            </View>
            <View style={{marginHorizontal: '5%', marginVertical: '2%'}}>
              <TextInput
                returnKeyType="done"
                placeholder="* Company Name [max 40 Chars]"
                keyboardType="default"
                style={styles.formGroup1}
                value={this.state.companyName}
                onChange={(evt) => this.handleClick(evt, 'companyName')}
                blurOnSubmit={false}
              />
            </View>
            <View style={{marginHorizontal: '5%', marginVertical: '2%'}}>
              <TextInput
                returnKeyType="done"
                placeholder="* Description [max 500 Chars]"
                keyboardType="default"
                numberOfLines={5}
                multiline={true}
                style={styles.formGroup1}
                value={this.state.jobDescription}
                onChange={(evt) => this.handleClick(evt, 'jobDescription')}
                blurOnSubmit={false}
              />
            </View>

            <Text style={[styles.title]}>Skills </Text>

            {this.state.selectedSkills.length > 0 ? (
              this.state.selectedSkills?.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.reverseAddSkills(index)}>
                    <View
                      style={[
                        styles.formSubGroup22,
                        {flexWrap: 'wrap', flexDirection: 'row'},
                      ]}>
                      <View
                        style={[
                          styles.skillTab,
                          {backgroundColor: '#71b85f', flexDirection: 'row'},
                        ]}>
                        <Text style={[styles.skillText, {color: '#fff'}]}>
                          {data}
                        </Text>
                        <FontAwesome name="close" size={20} color="#fff" />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <></>
            )}

            <View style={styles.skillView}>
              <View style={[styles.formGroup1]}>
                <Picker
                  style={{width: '100%', height: 45, color: '#3B1D25'}}
                  selectedValue={this.state.skills}
                  onValueChange={(itemValue, itemIndex) =>
                    //this.setState({ selectedSkills:this.state.selectedSkills.push(itemValue) })
                    this.setState({
                      selectedSkills: [...this.state.selectedSkills, itemValue],
                      skills: this.state.skills.filter(
                        (_, i) => i !== itemIndex,
                      ),
                    })
                  }>
                  {this.state.skills.length > 0 ? (
                    this.state?.skills?.map((data) => {
                      return (
                        <Picker.Item label={data.label} value={data.value} />
                      );
                    })
                  ) : (
                    <></>
                  )}
                  {/* <Picker.Item label="Java" value="Java" />
                  <Picker.Item label="Python" value="Python" />
                  <Picker.Item label="React" value="React" /> */}
                </Picker>
                <View style={{justifyContent: 'center', marginBottom: 0}}>
                  <AntDesign
                    name="plussquare"
                    size={55}
                    color="#60a84e"
                    style={{marginLeft: 10}}
                  />
                </View>
              </View>
            </View>

            <Text style={styles.title}>Location</Text>
            <View style={styles.skillView1}>
              <View style={[styles.formGroup1]}>
                <Picker
                  style={{width: '100%', height: 45, color: '#3B1D25'}}
                  selectedValue={this.state.countryValue}
                  onValueChange={(itemValue, itemIndex) =>
                    //this.setState({countryValue: itemValue})
                    this.fetchCountry(itemValue)
                  }>
                  <Picker.Item label="All" value="All" />
                  <Picker.Item label="India" value="India" />
                  <Picker.Item label="USA" value="USA" />
                </Picker>
              </View>
            </View>
            {this.state.showCity === true ? (
              <>
                <Text style={[styles.title]}>City </Text>
                <View style={styles.skillView1}>
                  <View style={[styles.formGroup1]}>
                    <Picker
                      style={{width: '100%', height: 45, color: '#3B1D25'}}
                      selectedValue={this.state.cityValue}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({cityValue: itemValue})
                      }>
                      {this.state.cityArray?.length > 0 ? (
                        this.state?.cityArray?.map((data) => {
                          return (
                            <Picker.Item
                              label={data.label}
                              value={data.value}
                            />
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </Picker>
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}

            {this.state.showVisa === true ? (
              <>
                <Text style={[styles.title]}>
                  Do you sponsor work authorization VISA
                </Text>
                <View style={[styles.formrow]}>
                  <CheckBox
                    center
                    title="Yes"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-thin"
                    checkedColor="grey"
                    containerStyle={styles.radio}
                    textStyle={{color: 'grey', fontSize: 13}}
                    checked={this.state.visaYesChecked}
                    onPress={this.setVisaYes}
                  />
                  <CheckBox
                    center
                    title="No"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-thin"
                    checkedColor="grey"
                    containerStyle={styles.radio}
                    textStyle={{color: 'grey', fontSize: 13}}
                    checked={this.state.VisaNoChecked}
                    onPress={this.setVisaNo}
                  />
                </View>
              </>
            ) : (
              <></>
            )}

            <View style={styles.skillView1}>
              <View style={[styles.formGroup1]}>
                <Picker
                  style={{width: '100%', height: 45, color: '#3B1D25'}}
                  selectedValue={this.state.typeValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({typeValue: itemValue})
                  }>
                  <Picker.Item label="Internship" value="Internship" />
                  <Picker.Item label="Full Time" value="Full Time" />
                  <Picker.Item label="Part Time" value="Part Time" />
                </Picker>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: '5%',
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <View style={styles.usd}>
                <Text style={{color: '#60a84e'}}>
                  {this.state.currencyType}
                </Text>
              </View>
              <TextInput
                returnKeyType="done"
                placeholder="* CTC"
                keyboardType="default"
                style={{
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                  borderRadius: 4,
                  padding: 10,
                  borderColor: 'rgba(59,29,37,0.5)',
                  backgroundColor: '#f8f8f8',
                  color: '#3B1D25',
                  fontSize: 15,
                  width: '70%',
                }}
                value={this.state.price}
                onChange={(evt) => this.handleClick(evt, 'price')}
                returnKeyType="next"
                blurOnSubmit={false}
              />
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
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

// export default PostInternship;
const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
    userID: state.userData.user_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //fetchCartData: () => dispatch(fetchCartData()),
    //updateStoreId: (id) => dispatch(updateStoreId(id)),
    //showLoader: (text) => dispatch(showLoader(text)),
    // hideLoader: () => dispatch(hideLoader()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(PostInternship));
