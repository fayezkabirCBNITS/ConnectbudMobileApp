import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderTop from '../../../components/Header';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart, makePutRequest, makeAuthGetRequest } from '../../../services/http-connectors';
import base64 from 'base-64';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { Picker } from '@react-native-community/picker';
import ErrorMsg from '../../../components/ErrorMsg';
import {Header} from 'react-navigation-stack'

class PostedProjectByEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobSet: [],
      //for Edit Project
      selectedSkills: [],
      skillValuePlaceHolder: [{ value: 'Select Skills', label: 'Select skills' }],
      title: '',
      des: '',
      skills: '',
      extraSkill: '',
      country: '',
      budget: '',
      unit: '',
      show: false,
      errors: '',
      errSkills: false,
      showAdditional: false,
      user_id: '',
      showLoader: false,
      jobId: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    this.setState({
      showLoader: true,
    });
    const { userData } = this.props;

    let body = new FormData();
    body.append('hirer_id', base64.decode(userData.user_id));
    body.append('search_type', 'all');

    let response = await makePostRequestMultipart(ApiUrl.FreelancerJobList, false, body);
    if (response) {
      this.setState({
        jobSet: response,
        showLoader: false,
      });
    }
  };

  FindFreelancer = async (jobId, jobName) => {

    let body = new FormData();
    body.append("job_id", jobId);
    body.append("type", "freelancer");
    body.append("offset", "0");

    let response = await makePostRequestMultipart(ApiUrl.JobRelatedCandidates, false, body);
    if (response) {
      //localStorage.setItem("experts", response.data[0].user_id);
      if (response[0].message === "No Candidates Found") {
        Toast.show("Sorry! No College Students Found", Toast.SHORT);
      } else {
        this.props.navigation.navigate('SearchProjectStudents', { jobId: jobId, jobName: jobName, type: "freelancer" })
      }
    }
  };

  //Below code for Edit Project

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

  handleInputSkills = async (itemValue, itemIndex) => {
    await this.setState({
      selectedSkills: [...this.state.selectedSkills, itemValue],
      skills: this.state.skills.filter(
        (_, i) => i !== itemIndex,
      ),
    });
    this.validateJobForm();
  };

  handleInputAdditionalSkill = async (e) => {
    await this.setState({
      extraSkill: e,
    });
  };

  handleInputBudget = async (e) => {
    await this.setState({
      budget: e,
    });
    this.validateJobForm();
    this.setState({ budgetINR: this.state.budget * 75 });
  };

  validateJobForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.title) {
      formIsValid = false;
      errors["title"] = "*Please enter project title";
    }

    if (this.state.title.length > 0 && this.state.title.length < 5) {
      formIsValid = false;
      errors['titleChara'] = '*Type minimum 5 characters';
    }

    if (!this.state.des) {
      formIsValid = false;
      errors['about'] = '*Please enter project descriptions';
    }

    if (this.state.des.length > 0 && this.state.des.length < 50) {
      formIsValid = false;
      errors["aboutChara"] = "*Type minimum 50 characters";
    }

    if (this.state.selectedSkills.length === 0) {
      formIsValid = false;
      this.setState({ errSkills: true });
    } else {
      formIsValid = true;
      this.setState({ errSkills: false });
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

  reverseAddSkills = async (index) => {
    await this.setState({
      selectedSkills: this.state.selectedSkills.filter((_, i) => i !== index),
    });
    let data = this.state.selectedSkills[index];
    await this.setState({
      skills: this.state.skills.concat({ value: data, label: data }).sort(),
    });
    this.setState({ skills: this.state.skills.sort() });
    this.validateJobForm();
  };

  handleAdditionalSkill = async () => {
    this.setState({ showAdditional: !this.state.showAdditional });
  };

  skillAdd = async () => {
    let body = new FormData();
    body.append("skill_name", this.state.extraSkill);
    await makePostRequestMultipart(ApiUrl.AddSkill, false, body);
  };

  SkillSearch = async () => {
    let response = await makeAuthGetRequest(ApiUrl.FetchSkills, false, '');
    this.setState({ skills: this.state.skillValuePlaceHolder.concat(response) });
  };

  ShowModal = async (slug, jobId) => {
    await this.setState({ show: true, jobId: jobId });

    let body = new FormData();
    body.append("user_id", "");
    body.append("type", "");

    let response = await makePostRequestMultipart(ApiUrl.JobDetails + slug, false, body);
    if (response) {
      await this.setState({
        selectedSkills: response[0].key_skill.map(value => value.label),
        des: response[0].description,
        title: response[0].job_name,
        unit: response[0].price_unit,
        budget: response[0].price_amount,
        country: response[0].projects_for,
        extraSkill: "",
        budgetINR: response[0].price_amount * 75
      });
      this.validateJobForm();
      this.SkillSearch();
    }
  };

  JobEditForm = () => {
    let dataSet = this.validateJobForm();
    if (dataSet === true) {
      this.editJob();
    }
  };

  editJob = async () => {
    const { userData } = this.props;

    let jobDescription = new FormData();
    jobDescription.append("job_id", this.state.jobId);
    jobDescription.append("posted_by", base64.decode(userData.user_id));
    jobDescription.append("job_name", this.state.title);
    jobDescription.append("description", this.state.des);
    jobDescription.append("expertise_skill", JSON.stringify(this.state.selectedSkills).replace(/[\[\]']+/g, ''));
    jobDescription.append("additional_skill", this.state.extraSkill);
    jobDescription.append("price_unit", this.state.unit);
    jobDescription.append("price_amount", this.state.budget);
    jobDescription.append("projects_for", this.state.country);

    let response = await makePutRequest(ApiUrl.FreelancerJob, false, jobDescription);
    if (response) {
      Toast.show("Successfully edited the project", Toast.LONG);
      this.setState({
        show: false,
        showAdditional: false,
      });
      this.componentDidMount();
      this.skillAdd();
    } else {
      this.setState({
        show: false,
        showAdditional: false,
      });
      Toast.show("Sorry you can't edit the project at the moment", Toast.LONG);
    }
  };

  render() {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaView]}>
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
          <HeaderTop />
          <View style={[CommonStyles.container, styles.bgColorWhite]}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
              {this.state.jobSet.map((value, index) => (
                <View style={styles.boxWrapper}>
                  <View>
                        <Text>{value.posted_date}</Text>
                      </View>
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
                      
                    </View>
                  </View>
                  <View style={styles.inrUsd}>
                    <Text style={styles.usdText}>{value.price_amount} USD</Text>
                    <Text style={styles.inrtxt}>
                      {value.price_amount * 75} INR
                    </Text>
                  </View>
                  <View style={styles.buttonWrapper}>
                    {value.complete_status === "false" &&
                      value.freelancer_visibility === "true" ? (
                        <View style={styles.findBtn}>
                          <TouchableOpacity style={styles.actionBtn} onPress={() => this.FindFreelancer(value.job_id, value.job_name)}>
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
                      ) : (
                        <>
                          {value.freelancer_visibility === "false" ? (
                            <></>
                          ) : (
                              <View style={styles.findBtn}>
                                <TouchableOpacity style={styles.actionBtn} disabled>
                                  <Text style={styles.findBtnText}>
                                    Hired
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )}
                        </>
                      )}
                    {value.complete_status === "false" &&
                      value.detail_type === "normal" ? (
                        <View style={styles.edit}>
                          <TouchableOpacity style={styles.editBtn}
                            onPress={() => this.ShowModal(value.slug, value.job_id)}
                          >
                            <FontAwesome5
                              name="edit"
                              color="#71b85f"
                              size={28}
                              style={styles.findIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <></>
                      )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <Modal visible={this.state.show} transparent={true}>
            <View style={CommonStyles.modalBg}>
            <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
            <KeyboardAvoidingView
              // keyboardVerticalOffset = {Header.HEIGHT + 0}
              style = {{ flex: 1 }}
              behavior = "padding" >
              <View style={{width: '100%', marginVertical: 20}}>
                <Text style={styles.title}>Edit Your Posted Project</Text>

                <Text style={styles.inputHead}>*Project Title</Text>
                <View style={styles.formGroup}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="Title [Max 100 Chars.]"
                    style={styles.inputGroup}
                    keyboardType="default"
                    value={this.state.title}
                    onChangeText={this.handleInputTitle}
                    maxLength={100}
                  />
                </View>
                <Text style={styles.errorText}>{this.state.errors.title} {this.state.errors.titleChara}</Text>

                <Text style={styles.inputHead}>*Project Description</Text>
                <View style={[styles.formGroup, { height: 100 }]}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="Description [Max 5000 Chars.]"
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
                    value={this.state.des}
                    onChangeText={this.handleInputDes}
                    maxLength={5000}
                  />
                </View>
                <Text style={styles.errorText}>{this.state.errors.about} {this.state.errors.aboutChara}</Text>

                <Text style={[styles.title]}>*Skills</Text>
                {this.state.selectedSkills.length > 0 ? (
                  this.state.selectedSkills?.map((data, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.reverseAddSkills(index)}>
                        <View
                          style={[
                            styles.formSubGroup22,
                            { flexWrap: 'wrap', flexDirection: 'row' },
                          ]}>
                          <View
                            style={[
                              styles.skillTab,
                              { backgroundColor: '#71b85f', flexDirection: 'row' },
                            ]}>
                            <Text style={[styles.skillText, { color: '#fff', marginRight: 10, fontSize: 14 }]}>
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
                        style={{ width: '100%', height: 55, color: '#000', fontFamily: 'Poppins-Regular', marginTop: -80 }}
                        selectedValue={this.state.skills}
                        onValueChange={(itemValue, itemIndex) => this.handleInputSkills(itemValue, itemIndex)}
                      >
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
                      style={{ marginLeft: 'auto' }}
                    >
                      <AntDesign
                        name="plussquare"
                        size={55}
                        color="#60a84e"
                        style={{ marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {this.state.errSkills === true ? (
                  <ErrorMsg errorMsg="*Please select Skill(s)" />
                ) : (
                    <></>
                  )}

                {this.state.showAdditional === true ? (
                  <View style={[styles.formGroup, { height: 100, marginTop: 10 }]}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Add new skills here (Ex:- Java, AI)"
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
                <Text style={[styles.inputHead, { marginTop: 30 }]}>*Project Budget</Text>
                <View style={styles.projectView}>
                  <View
                    style={[styles.formGroup, { width: '45%', flexWrap: 'wrap' }]}>
                    <TextInput
                      returnKeyType="done"
                      style={[styles.inputGroup, { width: '70%' }]}
                      keyboardType="number-pad"
                      //value={this.state.budget}
                      onChangeText={this.handleInputBudget}
                    >
                      {this.state.budget}
                    </TextInput>
                    <View style={[styles.formSubGroup1, { marginTop: 10 }]}>
                      <FontAwesome name="dollar" size={20} color="#d7d7d8" />
                    </View>
                  </View>

                  <View style={{ width: '10%' }}>
                    <Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold' }}>
                      =
                    </Text>
                  </View>
                  <View
                    style={[styles.formGroup, { width: '45%', flexWrap: 'wrap' }]}>
                    <Text
                      style={[
                        styles.inputGroup,
                        { textAlignVertical: 'center', width: '70%' },
                      ]}>
                      {this.state.budgetINR}
                    </Text>
                    <View style={[styles.formSubGroup1, { marginTop: 10 }]}>
                      <FontAwesome name="rupee" size={20} color="#d7d7d8" />
                    </View>
                  </View>
                </View>
                <Text style={styles.errorText}>{this.state.errors.ctc}</Text>

                <TouchableOpacity style={styles.modalCross} onPress={() => this.setState({ show: false, showAdditional: false })}>
                  <Entypo name="circle-with-cross" color="#71b85f" size={35} />
                </TouchableOpacity>

                <View style={styles.actionEdtBtn}>
                  <TouchableOpacity activeOpacity={0.9} style={[styles.authBtn]} onPress={() => this.setState({ show: false, showAdditional: false })}>
                    <Text style={styles.authBtnText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.9} style={[styles.authBtn]} onPress={this.JobEditForm}>
                    <Text style={styles.authBtnText}>Update</Text>
                  </TouchableOpacity>
                </View>

              </View>
              </KeyboardAvoidingView>
            </ScrollView>
            </View>
            </View>
          </Modal>

        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps, null)(PostedProjectByEmployee);
