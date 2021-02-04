import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Header from '../../../components/Header';
import StatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart, makePutRequest, makeAuthGetRequest } from '../../../services/http-connectors';
import base64 from 'base-64';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { Picker } from '@react-native-community/picker';
import ReadMore from 'react-native-read-more-text';
import ErrorMsg from '../../../components/ErrorMsg';

class JobListingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobSet: [],
      //for Edit Job
      title: "",
      companyName: "",
      about: "",
      selectedSkills: [],
      skillValuePlaceHolder: [{ value: 'Select Skills', label: 'Select skills' }],
      skills: '',
      extraSkill: '',
      showAdditional: false,
      errSkills: false,
      country: "",
      city: "",
      cityList: [],
      isJobAutharize: "",
      jobtype: "",
      unit: "USD",
      ctc: "",
      isSponser: true,
      show: false,
      //for Close Job
      showJob: false,
      jobChat: [],
      selectJob: false,
      btnDisable: true,
      ID: [],
      btnStatus: false,
      freelancerbtnStatus: false,
      errors: "",
      showLoader: false,
      jobId: ""
    };
  }
  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    this.setState({ showLoader: true });
    this.AllPostedJobs();
  };

  AllPostedJobs = async () => {

    const { userData } = this.props;

    let body = new FormData();
    body.append("user_id", base64.decode(userData.user_id));
    body.append("search_type", "all");

    let response = await makePostRequestMultipart(ApiUrl.PostedJob, false, body);
    if (response) {
      this.setState({
        jobSet: response,
        showLoader: false
      });
    }
  };

  FindFreelancer = async (jobId, jobName) => {

    let body = new FormData();
    body.append("job_id", jobId);
    body.append("type", "recruiter");
    body.append("offset", "0");

    let response = await makePostRequestMultipart(ApiUrl.JobRelatedCandidates, false, body);
    if (response) {
      //localStorage.setItem("experts", response.data[0].user_id);
      if (response[0].message === "No Candidates Found") {
        Toast.show("Sorry! No College Students Found", Toast.SHORT);
      } else {
        this.props.navigation.navigate('SearchProjectStudents', { jobId: jobId, jobName: jobName, type: "recruiter" })
      }
    }
  };

  //Below code for Edit Job

  handleInputTitle = async (e) => {
    await this.setState({
      title: e,
    });
    this.validateJobForm();
  };

  handleInputCompany = async (e) => {
    await this.setState({
      companyName: e,
    });
    this.validateJobForm();
  };

  handleInputDes = async (e) => {
    await this.setState({
      about: e,
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

  selectCountry = async (country) => {
    let unit = "";
    await this.setState({
      country: country ? country : this.state.country,
    });
    if (country === "USA") {
      unit = "USD";
      this.state.isSponser = false;
      // this.setState({
      //   city: "*City",
      // });
    } else if (this.state.country === "USA") {
      unit = "USD";
      this.state.isSponser = false;
    } else if (country === "All" || this.state.country === "All") {
      unit = "USD";
      this.state.isSponser = false;
      // this.setState({
      //   city: "*City",
      // });
    } else if (country === "India") {
      unit = "USD";
      //unit = "INR";
      this.state.isSponser = true;
      // this.setState({
      //   city: "*City",
      // });
    } else {
      unit = "USD";
      //unit = "INR";
      this.state.isSponser = true;
    }
    this.handleUnit(unit);
    this.CitySearch();
    this.validateJobForm();
  };

  selectCity = async (city) => {
    await this.setState({ city: city });
    this.validateJobForm();
  };

  handleAutharize = async (value) => {
    if (value === "yes") {
      await this.setState({
        isJobAutharize: "Yes",
      });
    } else {
      await this.setState({
        isJobAutharize: "No",
      });
    }
  };

  selectType = async (type) => {
    await this.setState({ jobtype: type });
    this.validateJobForm();
  };

  handleUnit = async (unitValue) => {
    this.setState({
      unit: unitValue,
    });
  };

  handleCTC = async (e) => {
    const re = /^[0-9\b]+$/;
    if (e === "" || re.test(e)) {
      await this.setState({
        ctc: e,
      });
    }
    this.validateJobForm();
  };

  CitySearch = async () => {
    let response = await makeAuthGetRequest(ApiUrl.Location + this.state.country.trim(), false, '');
    if (response) {
      await this.setState({ cityList: response });
    }
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

    let response = await makeAuthGetRequest(ApiUrl.JobDetails + slug, false, "");
    if (response) {
      await this.setState({
        title: response[0].job_title,
        companyName: response[0].job_company,
        about: response[0].description,
        selectedSkills: response[0].key_skill.map(value => value.label),
        country: response[0].location.split(",")[1]
          ? response[0].location.split(",")[1].trim()
          : response[0].location,
        city: response[0].location.split(",")[0].trim(),
        isJobAutharize: response[0].authorisation_visa,
        jobtype: response[0].job_type,
        unit: response[0].job_amount.split(" ")[1].trim(),
        ctc: response[0].job_amount.split(" ")[0].trim(),
        extraSkill: "",
      });
      this.validateJobForm();
      this.selectCountry(this.state.country);
    };
    this.SkillSearch();
  };

  JobEditForm = () => {
    let dataSet = this.validateJobForm();
    if (dataSet === true) {
      this.editJob();
    }
  };

  validateJobForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.title) {
      formIsValid = false;
      errors["title"] = "*Please enter job title";
    }
    if (this.state.title.length > 0 && this.state.title.length < 5) {
      formIsValid = false;
      errors["titleChara"] = "*Type minimum 5 characters";
    }
    if (!this.state.about) {
      formIsValid = false;
      errors["about"] = "*Please enter job descriptions";
    }
    if (this.state.about.length > 0 && this.state.about.length < 50) {
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
    if (!this.state.country) {
      formIsValid = false;
      errors["country"] = "*Please select country";
    }
    if (this.state.country !== "All" && this.state.city === "*City") {
      formIsValid = false;
      errors["city"] = "*Please select city";
    }
    if (!this.state.jobtype) {
      formIsValid = false;
      errors["jobtype"] = "*Please select job type";
    }
    if (!this.state.ctc) {
      formIsValid = false;
      errors["ctc"] = "*Please enter amount";
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  editJob = async () => {
    const { userData } = this.props;

    let body = new FormData();
    body.append("user_id", base64.decode(userData.user_id));
    body.append("job_id", this.state.jobId);
    body.append("job_title", this.state.title);
    body.append("job_company", this.state.companyName);
    body.append("skill_set", JSON.stringify(this.state.selectedSkills).replace(/[\[\]']+/g, ''));
    body.append("job_description", this.state.about);
    body.append("country", this.state.country);
    body.append("city", this.state.city === "*City" ? "" : this.state.city);
    body.append("job_type", this.state.jobtype);
    body.append("unit", this.state.unit);
    body.append("job_amount", this.state.ctc);
    body.append("authorisation_visa", this.state.isJobAutharize);
    body.append("skill_name", this.state.extraSkill);

    let response = await makePutRequest(ApiUrl.PostJob, false, body);
    if (response) {
      Toast.show("Successfully edited the job", Toast.LONG);
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

  //Below code for Close Job

  JobHideModal = () => {
    this.setState({
      showJob: false,
      selectJob: false,
      btnDisable: true,
      ID: [],
      btnStatus: false,
      freelancerbtnStatus: false,
    });
  };

  JobShowModal = async (jobId) => {
    const { userData } = this.props;

    await this.setState({
      showJob: true,
      JobID: jobId,
    });
    let body = new FormData();
    body.append("user_id", base64.decode(userData.user_id));
    body.append("job_id", jobId);
    body.append("type", "close");

    let response = await makePostRequestMultipart(ApiUrl.JobChatting, false, body);
    if (response) {
      await this.setState({
        jobChat: response,
      });
    }
  };

  SelectModal = async (jobId) => {
    const { userData } = this.props;

    await this.setState({
      selectJob: true,
      JobID: jobId,
    });
    let body = new FormData();
    body.append("user_id", base64.decode(userData.user_id));
    body.append("job_id", this.state.JobID);
    body.append("type", "selected");

    let response = await makePostRequestMultipart(ApiUrl.JobChatting, false, body);
    if (response) {
      await this.setState({
        jobChat: response,
      });
    }
  };

  // CourseType = async (e, id, name) => {
  //   if (this.state.ID.includes(id) == false) {
  //     await this.setState({
  //       ID: this.state.ID.concat([id]),
  //     });
  //   } else {
  //     await this.setState({
  //       ID: this.state.ID.filter(function (val) {
  //         return val !== id;
  //       }),
  //       // btnStatus: false,
  //       // freelancerbtnStatus: true,
  //     });
  //   }
  //   if (this.state.ID.length !== 0) {
  //     this.setState({
  //       btnDisable: false,
  //     });
  //   } else {
  //     this.setState({
  //       btnDisable: true,
  //     });
  //   }
  //   if (this.state.ID.toString() !== "" && name !== "None") {
  //     this.setState({
  //       btnStatus: true,
  //     });
  //   } else if (this.state.ID.toString() === "" && this.state.ID.length > 0 && name === "None") {
  //     this.setState({
  //       freelancerbtnStatus: true,
  //     });
  //   } else if (this.state.ID.toString() === "" && name !== "None") {
  //     this.setState({
  //       freelancerbtnStatus: false,
  //       btnStatus: false
  //     });
  //   } else if (this.state.ID.toString() === "" && this.state.ID.length === 0 && name === "None") {
  //     this.setState({
  //       freelancerbtnStatus: false,
  //       btnStatus: false
  //     });
  //   }
  // };

  JobClose = async () => {
    const { userData } = this.props;

    this.setState({
      showJob: false,
    });
    let body = new FormData();
    body.append("user_id", base64.decode(userData.user_id));
    body.append("job_id", this.state.JobID);
    body.append("candidate_id", this.state.ID.toString());

    let response = await makePostRequestMultipart(ApiUrl.CloseJob, false, body);
    if (response) {
      Toast.show("Successfully closed the job", Toast.LONG);
      this.AllPostedJobs();
    }
  };

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read less
      </Text>
    );
  }

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <StatusBar />
          {/* header section */}
          <Header />
          {/* header section end */}
          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              {this.state.jobSet.map((value, index) => {
                if (value.message !== "No data found") {
                  return (
                    <View style={styles.card}>
                      <View style={styles.timeSec}>
                        <Entypo
                          name="back-in-time"
                          color="rgba(0,0,0,0.4)"
                          size={13}
                        />
                        <Text style={styles.time}>{value.posted_date}</Text>
                      </View>
                      <View style={styles.topSec}>
                        <Text style={styles.hdng}>
                          {value.job_title}
                        </Text>
                        <Text style={styles.price}>{value.job_amount}</Text>
                      </View>

                      <ReadMore
                        numberOfLines={3}
                        renderTruncatedFooter={this._renderTruncatedFooter}
                        renderRevealedFooter={this._renderRevealedFooter}
                      >
                        <Text style={styles.subtitle}>
                          {value.description ? value.description : ""}
                        </Text>
                      </ReadMore>

                      <View style={styles.wrap}>
                        {value.key_skill
                          ? value.key_skill.map((data, index) => {
                            return (
                              <Text key={index} style={styles.wrapContent}>
                                {data.label}
                              </Text>
                            );
                          })
                          : null}
                      </View>

                      {value.active_status === "true" ? (
                        <>
                          <View style={styles.btnSec}>
                            {/* <TouchableOpacity style={styles.btn50} onPress={() => this.JobShowModal(value.id)}>
                              <AntDesign name="delete" color="#fff" size={18} />
                              <Text style={styles.btn50Text}>Close Job</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.btn50} onPress={() => this.ShowModal(value.slug, value.id)}>
                              <FontAwesome name="edit" color="#fff" size={18} />
                              <Text style={styles.btn50Text}>Edit Job</Text>
                            </TouchableOpacity>
                          </View>
                          <View>
                            <TouchableOpacity style={styles.btn} onPress={() => this.FindFreelancer(value.id, value.job_title)}>
                              <AntDesign name="search1" color="#fff" size={20} />
                              <Text style={styles.btn50Text}>Find Candidates</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      ) : (
                          <>
                            <View>
                              <TouchableOpacity style={styles.btn} onPress={() => this.SelectModal(value.id)}>
                                <FontAwesome5 name="user-check" color="#fff" size={20} />
                                <Text style={styles.btn50Text}>Selected Candidates</Text>
                              </TouchableOpacity>
                            </View>
                          </>
                        )}
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.noDataImg}>
                      <Image source={require('../../../assets/images/noData.png')} />
                      <Text style={styles.noDataImgText}>No Data Found</Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>

          <Modal visible={this.state.show} transparent={true}>
          <View style={CommonStyles.modalBg}>
          <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
          <View style={{width: '100%', marginVertical: 20}}>
                <Text style={styles.title}>Edit Your Posted Job</Text>

                <Text style={styles.inputHead}>*Job Title</Text>
                <View>
                  <TextInput
                    returnKeyType="done"
                    placeholder="*Title [Max 100 Chars.]"
                    keyboardType="default"
                    style={styles.formGroup1}
                    value={this.state.title}
                    onChangeText={this.handleInputTitle}
                    maxLength={100}
                  />
                </View>
                <Text style={styles.errorText}>{this.state.errors.title} {this.state.errors.titleChara}</Text>

                <Text style={styles.inputHead}>Company Name</Text>
                <View style={{ marginVertical: 15 }}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="Company name [Max 40 Chars.]"
                    keyboardType="default"
                    style={styles.formGroup1}
                    value={this.state.companyName}
                    onChangeText={this.handleInputCompany}
                    maxLength={40}
                  />
                </View>

                <Text style={styles.inputHead}>*Job Description</Text>
                <View>
                  <TextInput
                    returnKeyType="done"
                    placeholder="*Descriptions [Max 5000 Chars.]"
                    keyboardType="default"
                    numberOfLines={6}
                    multiline={true}
                    style={styles.formGroup1}
                    value={this.state.about}
                    onChangeText={this.handleInputDes}
                    maxLength={5000}
                  />
                </View>
                <Text style={styles.errorText}>{this.state.errors.about} {this.state.errors.aboutChara}</Text>

                <Text style={styles.inputHead}>*Skills</Text>
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
                            <Text style={[styles.skillText, { color: '#fff', marginRight: 10 }]}>
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
                        style={{ width: '100%', height: 55, color: '#000', fontFamily: 'Poppins-Regular', }}
                        selectedValue={this.state.skills}
                        onValueChange={(itemValue, itemIndex) => this.handleInputSkills(itemValue, itemIndex)}>
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
                  <View style={[styles.formGroup, { height: 100 }]}>
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

                <Text style={styles.inputHead}>*Location</Text>
                <View style={styles.skillView1}>
                  <View style={[styles.formGroup1]}>
                    <Picker
                      style={{ width: '100%', height: 45, color: '#3B1D25' }}
                      selectedValue={this.state.country}
                      onValueChange={(itemValue, itemIndex) => this.selectCountry(itemValue)}>
                      <Picker.Item label="*Select Country" value="Select Country" />
                      <Picker.Item label="All" value="All" />
                      <Picker.Item label="India" value="India" />
                      <Picker.Item label="USA" value="USA" />
                    </Picker>
                  </View>
                </View>
                <Text style={styles.errorText}>{this.state.errors.country}</Text>

                {(this.state.country === "India" || this.state.country === "USA") && (
                  <>
                    <Text style={styles.inputHead}>*City</Text>
                    <View style={styles.skillView1}>
                      <View style={[styles.formGroup1]}>
                        <Picker
                          style={{ width: '100%', height: 45, color: '#3B1D25' }}
                          selectedValue={this.state.city}
                          onValueChange={(itemValue, itemIndex) => this.selectCity(itemValue)}>
                          {this.state.cityList?.length > 0 ? (
                            this.state?.cityList?.map((data) => {
                              return (
                                <Picker.Item label={data.label} value={data.label} />
                              );
                            })
                          ) : (
                              <></>
                            )
                          }
                        </Picker>
                      </View>
                    </View>
                    <Text style={styles.errorText}>{this.state.errors.city}</Text>
                  </>
                )}

                {this.state.isSponser === false && (
                  <>
                    <Text style={[styles.title]}>
                      Do you sponsor work authorization VISA
                    </Text>
                    <View style={[styles.formrow]}>
                      <CheckBox
                        center
                        title="YES"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-thin"
                        checkedColor="grey"
                        containerStyle={styles.radio}
                        textStyle={{ color: 'grey', fontSize: 13 }}
                        checked={this.state.isJobAutharize === "Yes"
                          ? true
                          : ""}
                        onPress={() => this.handleAutharize("yes")}
                      />
                      <CheckBox
                        center
                        title="NO"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-thin"
                        checkedColor="grey"
                        containerStyle={styles.radio}
                        textStyle={{ color: 'grey', fontSize: 13 }}
                        checked={
                          this.state.isJobAutharize === "No"
                            ? true
                            : ""
                        }
                        onPress={() => this.handleAutharize("no")}
                      />
                    </View>
                  </>
                )}

                <Text style={styles.inputHead}>*Job Type</Text>
                <View style={styles.skillView1}>
                  <View style={[styles.formGroup1]}>
                    <Picker
                      style={{ width: '100%', height: 45, color: '#3B1D25' }}
                      selectedValue={this.state.jobtype}
                      onValueChange={(itemValue, itemIndex) => this.selectType(itemValue)}>

                      <Picker.Item label="*Select Type of job" value="Select Job Type" />
                      <Picker.Item label="Internship" value="Internship" />
                      <Picker.Item label="Full Time" value="Full Time" />
                      <Picker.Item label="Part Time" value="Part Time" />
                    </Picker>
                  </View>
                </View>
                <Text style={styles.errorText}>{this.state.errors.jobtype}</Text>

                <View
                  style={{
                    // marginHorizontal: '5%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginVertical: 10,
                  }}>
                  <View style={styles.usd}>
                    <Text style={{ color: '#60a84e' }}>
                      {this.state.unit}
                    </Text>
                  </View>
                  <TextInput
                    returnKeyType="done"
                    placeholder={this.state.jobtype === "Internship"
                      ? "*Stipend"
                      : this.state.jobtype === "Part Time"
                        ? "Job Amount"
                        : "*CTC"}
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
                    value={this.state.ctc}
                    onChangeText={this.handleCTC}
                    returnKeyType="next"
                    maxLength={7}
                  />
                </View>
                <Text style={styles.errorText}>{this.state.errors.ctc}</Text>

                <TouchableOpacity style={styles.modalCross} onPress={() => this.setState({ show: false, showAdditional: false })}>
                  <Entypo name="circle-with-cross" color="#71b85f" size={35} />
                </TouchableOpacity>

                <View style={styles.actionEdtBtn}>
                  <TouchableOpacity activeOpacity={0.9} style={[styles.authBtnCancel]} onPress={() => this.setState({ show: false, showAdditional: false })}>
                    <Text style={styles.authBtnText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.9} onPress={this.JobEditForm} style={[styles.authBtn]}>
                    <Text style={styles.authBtnText}>Update</Text>
                  </TouchableOpacity>
                </View>

              </View>
              </ScrollView>
            </View>
            </View>
          </Modal>

          <Modal visible={this.state.showJob} transparent={true}>
            <View style={CommonStyles.modalBg}>
            <View style={styles.modalContent2}>
            <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
            <View style={{width: '100%', marginVertical: 20}}>
                <Text style={styles.title}>Close Your Posted Job</Text>
                {this.state.jobChat.map((value, index) => {
                  if (value.message !== "No data found" && index < 1) {
                    return (
                      <Text style={[styles.title]}>
                        Please select the candidate's names which you hired
                      </Text>
                    );
                  }
                })}
                {this.state.jobChat.map((value, index) => {
                  if (value.message !== "No data found") {
                    return (
                      <View style={{alignItems: 'flex-start'}}>
                        {this.state.btnStatus === true && value.name === "None" ? (
                            <>
                              <CheckBox
                                center
                                title={value.name}
                                // checkedIcon="dot-circle-o"
                                // uncheckedIcon="circle-thin"
                                checkedColor="grey"
                                containerStyle={styles.radio}
                                textStyle={{ color: 'grey', fontSize: 13 }}
                                onPress={(e) => this.CourseType(e, value.id, value.name)}
                                disabled={this.state.btnStatus}
                              />
                            </>
                          ) : (
                            <>
                              {this.state.freelancerbtnStatus === true && value.name !== "None" ? (
                                  <CheckBox
                                    center
                                    title={value.name}
                                    // checkedIcon="dot-circle-o"
                                    // uncheckedIcon="circle-thin"
                                    checkedColor="grey"
                                    containerStyle={styles.radio}
                                    textStyle={{ color: 'grey', fontSize: 13 }}
                                    onPress={(e) => this.CourseType(e, value.id, value.name)}
                                    disabled={this.state.freelancerbtnStatus}
                                  />
                                ) : (
                                  <CheckBox
                                    center
                                    title={value.name}
                                    // checkedIcon="dot-circle-o"
                                    // uncheckedIcon="circle-thin"
                                    checkedColor="grey"
                                    containerStyle={styles.radio}
                                    textStyle={{ color: 'grey', fontSize: 13 }}
                                    onPress={(e) => this.CourseType(e, value.id, value.name)}
                                    disabled={false}
                                  />
                                  )}
                              </>
                            )}
                            </View>
                          );
                            } else {
                                return (
                                <Text>You haven't chatted with any candidates.</Text>
                              );
                            }
                          })}

                        <TouchableOpacity style={styles.modalCross} onPress={this.JobHideModal}>
                          <Entypo name="circle-with-cross" color="#71b85f" size={35} />
                        </TouchableOpacity>

                        <View style={styles.actionEdtBtn}>
                          <TouchableOpacity activeOpacity={0.9} style={[styles.authBtnCancel]} onPress={this.JobHideModal}>
                            <Text style={styles.authBtnText}>Cancel</Text>
                          </TouchableOpacity>

                          <TouchableOpacity activeOpacity={0.9} onPress={this.JobClose} disabled={this.state.btnDisable} style={[styles.authBtn]}>
                            <Text style={styles.authBtnText}>Update</Text>
                          </TouchableOpacity>
                        </View>

                      </View>
                      </ScrollView>
            </View>
            </View>
          </Modal>
        
          <Modal visible={this.state.selectJob} transparent={true}>
            <View style={CommonStyles.modalBg}>
            <View style={styles.modalContent2}>
            <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
            <View style={{width: '100%', marginVertical: 20}}>
                <Text style={styles.title}>Selected College Students</Text>
                {this.state.jobChat.map((value, index) => {
                  if (value.message !== "No data found") {
                    return (
                      <Text style={[styles.title]}>
                        {index + 1}. {value.name}
                      </Text>
                    );
                  }
                })}
                <TouchableOpacity style={CommonStyles.modalCross} onPress={this.JobHideModal}>
                  <Entypo name="circle-with-cross" color="#71b85f" size={35} />
                </TouchableOpacity>

                <View style={styles.actionEdtBtn}>
                  <TouchableOpacity activeOpacity={0.9} style={[styles.authBtn]} onPress={this.JobHideModal}>
                    <Text style={styles.authBtnText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
export default connect(mapStateToProps, null)(JobListingScreen);
