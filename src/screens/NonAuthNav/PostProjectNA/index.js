import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Pressable,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import StatusBar from '../../../components/StatusBar';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Picker} from '@react-native-community/picker';
import {updateTmpPostJob} from '../../../redux/actions/user-data';
import {connect} from 'react-redux';
import base64 from 'base-64';
import ApiUrl from '../../../config/ApiUrl';
import {
  makePostRequestMultipart,
  makeAuthGetRequest,
} from '../../../services/http-connectors';
import ErrorMsg from '../../../components/ErrorMsg';
import {withNavigation} from 'react-navigation';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

class PostProjectNA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      showSkills: false,
      skillValuePlaceHolder: [{value: 'Select Skill', label: 'Select skill'}],
      selectedSkills: [],
      selectedSkillIndex: null,
      title: '',
      des: '',
      budget: '',
      budgetINR: '',
      errors: {},
      monthSelect: '0 Month',
      daySelect: '0 Days',
      skills: [],
      SS: '',
      errSkills: false,
      JobID: '',
      Skill: '',
      showAdditional: false,
      xtraSkill: '',
      showLoader: false,
      isModalVisible: false,
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

  handleInputTitle = async (e) => {
    await this.setState({
      title: e,
    });
    this.validateJobForm();
  };

  handleInputDes = async (e) => {
    await this.setState({
      des: e,
    });
    this.validateJobForm();
  };

  handleInputAdditionalSkill = async (e) => {
    await this.setState({
      xtraSkill: e,
    });
  };
  handleInputBudget = async (e) => {
    await this.setState({
      budget: e,
    });
    this.validateJobForm();
    this.setState({budgetINR: this.state.budget * 75});
  };

  validateJobForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.title) {
      formIsValid = false;
      errors['title'] = '*Please enter project title';
    }

    if (this.state.title.length > 0 && this.state.title.length < 5) {
      formIsValid = false;
      errors['titleChara'] = '*enter minimum 5 characters';
    }

    if (!this.state.des) {
      formIsValid = false;
      errors['about'] = '*Please enter project descriptions';
    }

    if (this.state.des.length > 0 && this.state.des.length < 50) {
      formIsValid = false;
      errors['aboutChara'] = '*enter minimum 50 characters';
    }

    if (!this.state.budget) {
      formIsValid = false;
      errors['ctc'] = '*Please specify project amount';
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };
  onDismissModel = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.navigate('SignInScreen', {userType: 'employee'});
  };
  postProject = async () => {
    this.setState({
      showLoader: false,
    });

    let jobDescription = new FormData();
    jobDescription.append('posted_by', '');
    jobDescription.append('job_name', this.state.title);
    jobDescription.append('description', this.state.des);
    jobDescription.append(
      'expertise_skill',
      JSON.stringify(this.state.selectedSkills).replace(/[\[\]']+/g, ''),
    );
    jobDescription.append('additional_skill', this.state.xtraSkill);
    jobDescription.append('price_unit', 'usd');
    jobDescription.append('price_amount', this.state.budget);
    jobDescription.append(
      'duration',
      this.state.daySelect + this.state.monthSelect,
    );
    jobDescription.append('projects_for', 'All');
    jobDescription.append('page_type', 'landing');

    console.log('post freelancer job=============', jobDescription);

    let response = await makePostRequestMultipart(
      ApiUrl.FreelancerJob,
      false,
      jobDescription,
    );
    console.log('handle freelancer post a job-----', response);

    if (response) {
      /*
      
    {
        "message": "Job Posted",
        "skill_set": "PHP",
        "job_id": 914,
        "user_id": ""
    }
]
      */
      this.setState({
        JobID: response[0].job_id,
        Skill: response[0].skill_set,
        title: '',
        des: '',
        selectedSkills: '',
        xtraSkill: '',
        budget: '',
      });
      // this.fireMail();
      //alert('Successfully posted the Project!');
      if (response[0].message === 'Job Posted' && response[0]?.job_id) {
        let tmpJobObj = {
          tmpJobID: response[0].job_id,
          tmpSkillSet: response[0].skill_set,
          hire_by: null,
        };
        console.log('tmp post redux data========', tmpJobObj);
        this.props.updateTmpPostJob(tmpJobObj);
        //this.props.navigation.navigate('SignInScreen');

        //  modal dismiss navigate login
        this.setState({isModalVisible: true});
      }
    }
  };

  /*
  fireMail = async () => {
    let body = new FormData();
    body.append('job_id', this.state.JobID);
    body.append('skill_set', this.state.Skill);
    body.append('type', 'freelancer');

    let response = await makePostRequestMultipart(ApiUrl.JobMail, false, body);
    console.log('handle fire mail-----', response);
  };
  */
  onButtonSubmit = async () => {
    let dataSet = this.validateJobForm();
    if (this.state.selectedSkills.length === 0) {
      this.setState({errSkills: true});
    } else {
      if (dataSet === true) {
        this.setState({
          showLoader: true,
        });
        this.postProject();
      }
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

  handleAdditionalSkill = async () => {
    this.setState({showAdditional: !this.state.showAdditional});
  };
  render() {
    return (
      <SafeAreaView style={CommonStyles.main}>
        <StatusBar />

        <View style={CommonStyles.header}>
          <TouchableOpacity
            style={CommonStyles.hambarIcon}
            onPress={() => this.props.navigation.openDrawer()}>
            <Entypo name="menu" color="#71b85f" size={35} />
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={CommonStyles.imageHdr}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <View style={styles.form}>
            <Text style={styles.title}>Project Details</Text>

            <Text style={styles.inputHead}>Title *</Text>
            <View style={styles.formGroup}>
              <TextInput
                returnKeyType="done"
                placeholder="max 10 Chars"
                style={styles.inputGroup}
                keyboardType="default"
                value={this.state.title}
                onChangeText={this.handleInputTitle}
              />
            </View>
            <Text style={styles.errorText}>{this.state.errors.title}
            {this.state.errors.titleChara}
            </Text>


            <View style={[styles.formGroup, {height: 100}]}>
              <TextInput
                returnKeyType="done"
                placeholder="Describe your project..."
                style={[
                  styles.inputGroup,
                  {
                    height: 100,
                    justifyContent: 'flex-start',
                    textAlignVertical: 'top',
                  },
                ]}
                keyboardType="default"
                numberOfLines={5}
                multiline={true}
                onChangeText={this.handleInputDes}
              />
            </View>
            <Text style={styles.errorText}>{this.state.errors.about}
            {this.state.errors.aboutChara}
            </Text>


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
                <View style={styles.formPicker}>
                  <Picker
                    style={{
                      width: '100%',
                      height: 55,
                      color: '#000',
                      fontFamily: 'Poppins-Regular',
                    }}
                    selectedValue={this.state.skills}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        selectedSkills: [
                          ...this.state.selectedSkills,
                          itemValue,
                        ],
                        skills: this.state.skills.filter(
                          (_, i) => i !== itemIndex,
                        ),
                      })
                    }>
                    {this.state.skills.length > 0 ? (
                      this.state?.skills?.map((data) => {
                        return (
                          <Picker.Item label={data.label} value={data.label} />
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Picker>
                </View>
                <TouchableOpacity
                  onPress={this.handleAdditionalSkill}
                  style={{marginLeft: 'auto'}}>
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
              <View style={[styles.formGroup, {height: 100, marginTop: 10}]}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Add you additional Skills here e.g.- Java"
                  style={[
                    styles.inputGroup,
                    {
                      height: 100,
                      justifyContent: 'flex-start',
                      textAlignVertical: 'top',
                    },
                  ]}
                  keyboardType="default"
                  numberOfLines={5}
                  multiline={true}
                  onChangeText={this.handleInputAdditionalSkill}
                />
              </View>
            ) : (
              <></>
            )}
            <Text style={[styles.inputHead, {marginTop: 30}]}>
              Project Budget *
            </Text>
            <View style={styles.projectView}>
              <View
                style={[styles.formGroup, {width: '45%', flexWrap: 'wrap'}]}>
                <TextInput
                  returnKeyType="done"
                  style={[styles.inputGroup, {width: '70%'}]}
                  keyboardType="number-pad"
                  onChangeText={this.handleInputBudget}
                />
                <View style={[styles.formSubGroup1, {marginTop: 10}]}>
                  <FontAwesome name="dollar" size={20} color="#d7d7d8" />
                </View>
              </View>

              <View style={{width: '10%'}}>
                <Text style={{fontSize: 16, padding: 10, fontWeight: 'bold'}}>
                  =
                </Text>
              </View>
              <View
                style={[styles.formGroup, {width: '45%', flexWrap: 'wrap'}]}>
                <Text
                  style={[
                    styles.inputGroup,
                    {textAlignVertical: 'center', width: '70%'},
                  ]}>
                  {this.state.budgetINR}
                </Text>
                <View style={[styles.formSubGroup1, {marginTop: 10}]}>
                  <FontAwesome name="rupee" size={20} color="#d7d7d8" />
                </View>
              </View>
            </View>
            <Text style={styles.errorText}>{this.state.errors.ctc}</Text>

            <TouchableOpacity activeOpacity={0.9} style={[styles.authBtn]}>
              <Pressable style={styles.signinBtn} onPress={this.onButtonSubmit}>
                <Text style={styles.authBtnText}>Submit</Text>
              </Pressable>
              {/* {this.state.showLoader && (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  // style={CommonStyles.loader}
                />
              )} */}
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.state.isModalVisible === true ? (
          <Modal transparent={true} isVisible={this.state.isModalVisible}>
            <View style={CommonStyles.modalBg}>
              <View style={CommonStyles.modalContent}>
                <Image
                  source={require('../../../assets/images/messageSend.png')}
                  style={CommonStyles.modalImg}
                />
                <Text style={CommonStyles.modalText}>
                  Please login/register to continue this process
                </Text>
                <Text style={CommonStyles.modalEmail}>{''}</Text>

                <TouchableOpacity
                  style={CommonStyles.modalCross}
                  onPress={this.onDismissModel}>
                  <Entypo name="circle-with-cross" color="#71b85f" size={35} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          <></>
        )}
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
    updateTmpPostJob: (data) => dispatch(updateTmpPostJob(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(PostProjectNA));
