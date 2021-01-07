import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import styles from './styles';
import {connect} from 'react-redux';
import base64 from 'base-64';
import Validator from '../../config/Validator';
import ApiUrl from '../../config/ApiUrl';
import {Icon, CheckBox} from 'react-native-elements';
import {
  makePostRequestMultipart,
  makeAuthGetRequest,
} from '../../services/http-connectors';
import ErrorMsg from '../../components/ErrorMsg';
import {withNavigation} from 'react-navigation';
import Toast from 'react-native-simple-toast';
import {Header} from 'react-navigation-stack'
import Spinner from 'react-native-loading-spinner-overlay';



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
      jobType: 'Select Job Type',
      currencyType: 'USD',
      passportType: false,
      selectedSkills: [],
      selectedSkillIndex: null,
      skills: [],
      filteredSkills: [],
      cityArray: [],
      cityValue: 'Select City',
      countryValue: 'Select Country',
      cityValuePlaceHolder: [{value: 'Select City', label: 'Select City'}],
      skillValuePlaceHolder: [{value: 'Select Skill', label: 'Select skill'}],
      showAdditional: false,

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
      showVisa: false,
      visaYesChecked: false,
      VisaNoChecked: false,
      errCityName: false,
      visaType: 'no',
      additionalName: '',
      showLoader: false,

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
    this.setState({skills: this.state.skillValuePlaceHolder.concat(response)});
  }

  setVisaYes = () => {
    this.setState({
      visaYesChecked: true,
      VisaNoChecked: false,
      visaType: 'yes',
    });
  };

  setVisaNo = () => {
    this.setState({VisaNoChecked: true, visaYesChecked: false, visaType: 'no'});
  };
  handleChange = async (e, name) => {
    if (name === 'jobTitle') {
      this.setState({
        jobTitle: e.nativeEvent.text,
        errJobTitle: false,
      });
    } else if (name === 'jobDescription') {
      this.setState({
        jobDescription: e.nativeEvent.text,
        errJobDesc: false,
      });
    } else if (name === 'companyName') {
      this.setState({
        companyName: e.nativeEvent.text,
        errCompanyname: false,
      });
    } else if (name === 'price') {
      this.setState({
        price: e.nativeEvent.text,
        errPrice: false,
      });
    } else if (name === 'additionalSkill') {
      this.setState({
        additionalName: e.nativeEvent.text,
      });
    }
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
    if (countryValue === 'Select Country') {
      Toast.show('Please Select Country', Toast.LONG);
    } else {
      let response = await makeAuthGetRequest(
        ApiUrl.Location + countryValue,
        false,
        '',
      );
      this.setState({countryValue: countryValue});
      //this.setState({cityArray: response});
      this.setState({
        cityArray: this.state.cityValuePlaceHolder.concat(response),
      });

      if (countryValue === 'All') {
        this.setState({showCity: false, showVisa: true, currencyType: 'USD'});
      } else if (countryValue === 'India') {
        this.setState({showCity: true, showVisa: false, currencyType: 'USD'});
        //this.setState({showCity: true, showVisa: false, currencyType: 'INR'});
      } else if (countryValue === 'USA') {
        this.setState({showCity: true, showVisa: true, currencyType: 'USD'});
      }
    }
  }
  handleSubmit = async () => {
    if (this.state.jobTitle === '') {
      this.setState({errJobTitle: true});
    }
    if (this.state.companyName === '') {
      this.setState({errCompanyname: true});
    }
    if (this.state.jobDescription === '') {
      this.setState({errJobDesc: true});
    }
    if (this.state.selectedSkills.length === 0) {
      this.setState({errSkills: true});
    }
    if (this.state.countryValue === 'Select Country') {
      this.setState({errLocationName: true});
    }
    if (this.state.selectedSkills === 'Select skill') {
      this.setState({errSkills: true});
    }
    if (
      this.state.countryValue === 'India' &&
      this.state.countryValue === 'USA' &&
      this.state.cityValue === 'Select City'
    ) {
      this.setState({errCityName: true});
    }
    if (this.state.jobType === 'Select Job Type') {
      this.setState({errJobType: true});
    }
    if (this.state.price === '') {
      this.setState({errPrice: true});
    } else {
      this.setState({
        errJobTitle: false,
        errCompanyname: false,
        errJobDesc: false,
        errSkills: false,
        errLocationName: false,
        errJobType: false,
        errPrice: false,
      });
      this.setState({
        showLoader : true,
      })

      let body = new FormData();
      body.append('user_id', base64.decode(this.props.userID));
      body.append('job_title', this.state.jobTitle);
      body.append('job_company', this.state.companyName);
      body.append(
        'skill_set',
        JSON.stringify(this.state.selectedSkills).replace(/[\[\]']+/g, ''),
      );
      body.append('job_description', this.state.jobDescription);
      body.append('country', this.state.countryValue);
      body.append('city', this.state.cityValue);
      body.append('job_type', this.state.jobType);
      body.append('unit', this.state.currencyType);
      body.append('job_amount', this.state.price);
      body.append('authorisation_visa', this.state.visaType);
      body.append('skill_name', this.state.additionalName);

      console.log('handle formdata -----', body);

      let response = await makePostRequestMultipart(
        ApiUrl.PostJob,
        false,
        body,
      );
      console.log('handle post a job-----', response);
      if (response) {
        this.setState({
        showLoader : false,
        selectedSkills: '',
        cityValue:'',
        countryValue:'',
        price: '',
        jobType: '',
        jobTitle: '',
        jobDescription: '',
        companyName:'',
        })
        if (response && response[0].message) {
          Toast.show(response[0].message, Toast.LONG);
          this.props.navigation.navigate('JobListingScreen');
        }
      } else {
        //alert('The email or password you have entered is invalid!');
        // Toast.show(response.msg, Toast.LONG);
      }
    }
  };
  handleAdditionalSkill = async () => {
    this.setState({showAdditional: !this.state.showAdditional});
  };
  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
        <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}>
              <KeyboardAvoidingView
                keyboardVerticalOffset = {Header.HEIGHT + 0}
                style = {{ flex: 1 }}
                behavior = "padding" >
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 18,
                padding: 20,
                marginBottom: -10,
              }}>
              Create Your Job Posting
            </Text>
            {/* <View
              style={{
                borderBottomColor: 'rgba(59,29,37,0.5)',
                borderBottomWidth: 1,
                width: '90%',
                marginHorizontal: '5%',
              }}
            /> */}

            <Text style={styles.title}>Job Details</Text>
            <View style={{marginHorizontal: '5%'}}>
              <TextInput
                returnKeyType="done"
                placeholder="* Title [max 100 Chars]"
                keyboardType="default"
                style={styles.formGroup1}
                value={this.state.jobTitle}
                onChange={(text) => this.handleChange(text, 'jobTitle')}
              />
            </View>
            {this.state.errJobTitle === true ? (
              <ErrorMsg errorMsg="Enter Project Title" />
            ) : (
              <></>
            )}

            <View style={{marginHorizontal: '5%', marginVertical: 15}}>
              <TextInput
                returnKeyType="done"
                placeholder="* Company Name [max 40 Chars]"
                keyboardType="default"
                style={styles.formGroup1}
                value={this.state.companyName}
                onChange={(text) => this.handleChange(text, 'companyName')}
              />
            </View>
            {this.state.errCompanyname === true ? (
              <ErrorMsg errorMsg="Enter Company Name" />
            ) : (
              <></>
            )}
            <View style={{marginHorizontal: '5%',}}>
              <TextInput
                returnKeyType="done"
                placeholder="* Description [max 500 Chars]"
                keyboardType="default"
                numberOfLines={5}
                multiline={true}
                style={styles.formGroup1}
                value={this.state.jobDescription}
                onChange={(text) => this.handleChange(text, 'jobDescription')}
              />
            </View>
            {this.state.errJobDesc === true ? (
              <ErrorMsg errorMsg="Enter Project Description" />
            ) : (
              <></>
            )}
            <Text style={[styles.title, {marginTop: 15}]}>Skills </Text>

            {this.state.selectedSkills.length > 0 ? (
              this.state.selectedSkills?.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.reverseAddSkills(index)}>
                    <View
                      style={[
                        styles.formSubGroup22,
                        {flexWrap: 'wrap', flexDirection: 'row', paddingHorizontal: 15},
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
              <View style={[styles.formGroup01]}>
              <View style={styles.formPicker}>
                <Picker
                  style={{width: '100%', height: 55, color: '#000', fontFamily: 'Poppins-Regular', marginTop: -81}}
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
                </Picker>
                </View>
                <TouchableOpacity
                   onPress={this.handleAdditionalSkill}
                  style={{marginLeft: 'auto'}}
                   >
                    <AntDesign
                      name="plussquare"
                      size={55}
                      color="#60a84e"
                      style={{marginLeft: 10}}
                    />
                    </TouchableOpacity>
              </View>
            </View>

            {this.state.errSkills === true ? (
              <ErrorMsg errorMsg="Select Skills" />
            ) : (
              <></>
            )}

            {this.state.showAdditional === true ? (
              <View style={[styles.formGroup, {height: 100}]}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Add you additional Skills here e.g.- Java"
                  style={[
                    styles.inputGroup,
                    {
                      height: 100,
                      justifyContent: 'flex-start',
                      textAlignVertical: 'top',
                      padding: 15,
                    },
                  ]}
                  keyboardType="default"
                  numberOfLines={5}
                  multiline={true}
                  value={this.state.additionalName}
                  onChange={(text) =>
                    this.handleChange(text, 'additionalSkill')
                  }
                />
              </View>
            ) : (
              <></>
            )}

            <Text style={[styles.title, {marginTop: 15, marginBottom: -5}]}>Location</Text>
            <View style={styles.skillView1}>
              <View style={[styles.formGroup1]}>
                <Picker
                  style={{width: '100%', height: 45, color: '#3B1D25', marginTop: -82}}
                  selectedValue={this.state.countryValue}
                  onValueChange={(itemValue, itemIndex) =>
                    //this.setState({countryValue: itemValue})
                    this.fetchCountry(itemValue)
                  }>
                  <Picker.Item label="Select Country" value="Select Country" />
                  <Picker.Item label="All" value="All" />
                  <Picker.Item label="India" value="India" />
                  <Picker.Item label="USA" value="USA" />
                </Picker>
              </View>
            </View>
            {this.state.errLocationName === true ? (
              <ErrorMsg errorMsg="Select Country" />
            ) : (
              <></>
            )}
            {this.state.showCity === true ? (
              <>
                <Text style={[styles.title]}>City </Text>
                <View style={styles.skillView1}>
                  <View style={[styles.formGroup1]}>
                    <Picker
                      style={{width: '100%', height: 45, color: '#3B1D25', marginTop: -82}}
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

            {this.state.errCityName === true ? (
              <ErrorMsg errorMsg="Select City" />
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
                  style={{width: '100%', height: 45, color: '#3B1D25', marginTop: -84}}
                  selectedValue={this.state.jobType}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({jobType: itemValue})
                  }>
                  <Picker.Item
                    label="Select Job Type"
                    value="Select Job Type"
                  />
                  <Picker.Item label="Internship" value="Internship" />
                  <Picker.Item label="Full Time" value="Full Time" />
                  <Picker.Item label="Part Time" value="Part Time" />
                </Picker>
              </View>
            </View>

            {this.state.errSkills === true ? (
              <ErrorMsg errorMsg="Select Job Type" />
            ) : (
              <></>
            )}
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
                keyboardType="number-pad"
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
                onChange={(text) => this.handleChange(text, 'price')}
                returnKeyType="next"
              />
            </View>

            {this.state.errPrice === true ? (
              <ErrorMsg errorMsg="Enter Price Value" />
            ) : (
              <></>
            )}
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
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

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
