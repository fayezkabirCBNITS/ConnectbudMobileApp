import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

import axios from 'axios';
import {API_URL} from '../../config/url';
import DropDownPicker from 'react-native-custom-dropdown';
import Icon from 'react-native-vector-icons/Feather';

class PostProject extends Component {
  constructor() {
    super();
    this.state = {
      showLoader: false,
      showSkills: false,
      skillsData: [
        {title: 'C'},
        {title: 'JAVA'},
        {title: 'C++'},
        {title: 'C#'},
      ],
      title: '',
      des: '',
      budget: '',
      errors: {},
      skillOptions: [],
      monthSelect: '0 Month',
      daySelect: '0 Days',
      skills:[],
      SS : ""
    };
  }
  handleSkills = async () => {
    this.setState({showSkills: !this.state.showSkills});
  };

  static navigationOptions = {
    headerShown: false,
  };

  SkillSearch = async () => {
    await axios.get(API_URL + 'keyskill/recruiter').then((response) => {
      this.setState({
        skillOptions: response.data,
      });
      console.log(this.state.skillOptions);
    });
  };

  componentDidMount = () => {
    this.SkillSearch();
  };

  handleInputTitle = async (e) => {
    console.log('callled');
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

  handleInputBudget = async (e) => {
    console.log('called');
    await this.setState({
      budget: e,
    });
    this.validateJobForm();
    console.log(this.state.budget);
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

    // if (!this.state.SS.length) {
    //   formIsValid = false;
    //   errors['skill'] = '*Please select Skill(s)';
    // }

    if (!this.state.des) {
      formIsValid = false;
      errors['about'] = '*Please enter project descriptions';
    }

    // if (this.state.des.length > 0 && this.state.des.length < 50) {
    //   formIsValid = false;
    //   errors['aboutChara'] = '*enter minimum 50 characters';
    // }

    if (!this.state.budget) {
      formIsValid = false;
      errors['ctc'] = '*Please specify project amount';
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  postProject = async () => {
    let jobDescription = new FormData();
    jobDescription.append('posted_by', '2489');
    jobDescription.append('job_name', this.state.title);
    jobDescription.append('description', this.state.des);
    jobDescription.append('expertise_skill', this.state.skills);
    // jobDescription.append("category", this.getSSLabel(this.state.SS));
    jobDescription.append('additional_skill', '');
    jobDescription.append('price_unit', 'usd');
    jobDescription.append('price_amount', this.state.budget);
    jobDescription.append(
      'duration',
      this.state.daySelect + this.state.monthSelect,
    );
    jobDescription.append('projects_for', 'All');

    await axios({
      url: API_URL + 'freelancerJob',
      method: 'POST',
      data: jobDescription,
    })
      .then((response) => {
        // localStorage.setItem('jobID', this.state.JobID);
        this.setState({
          JobID: response.data[0].job_id,
          Skill: response.data[0].skill_set,
          // SS: '',
          // SC: '',
          // des: '',
          // title: '',
          // budget: '',
          // monthShow: 'Months',
          // dayShow: 'Days',
          // countrySelect: 'Country',
        });
        this.fireMail();
        alert('Successfully posted the Project!');
        this.props.NavtoPostedpage();
      })
      .catch((error) => {
        swal({
          title: 'Something went wrong!',
          icon: 'error',
        });
        // this.setState({
        //   btnStatus: false,
        // });
      });
  };

  fireMail = async () => {
    let body = new FormData();
    body.append('job_id', this.state.JobID);
    body.append('skill_set', this.state.Skill);
    body.append('type', 'freelancer');

    await axios({
      url: API_URL + 'jobmail',
      method: 'POST',
      data: body,
    });
  };

  onButtonSubmit = async () => {
    let dataSet = this.validateJobForm();
    if (dataSet === true) {
      this.postProject();
      this.setState({showLoader: true});
      Toast.show('submit action', Toast.LONG);
    }
  };


  render() {
    // const [selectedTeams, setSelectedTeams] = useState([])
    const renderSkillItems = ({item}) => (
      <TouchableOpacity style={styles.headSec}>
        <View style={styles.details}>
          <Text style={styles.flastListHead}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <SafeAreaView style={CommonStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={styles.errorText}>{this.state.errors.title}</Text>

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
            <Text style={styles.errorText}>{this.state.errors.about}</Text>

            <Text style={styles.inputHead}>Skills *</Text>

            <View style={styles.skillView}>
              <DropDownPicker
                  items={[
                    {label: 'React JS', value: 'React'},
                    {label: 'JavaScript', value: 'JavaScript'},
                    {label: 'Angular JS', value: 'Angular JS'},
                    {label: 'C language', value: 'C language'},
                    {label: 'React Native', value: 'React Native'},
                    {label: 'JAVA', value: 'JAVA'},
                ]}
                controller={instance => this.controller = instance}
                multiple={true}
                // multipleText=
                min={0}
                max={10}
                defaultValue={this.state.skills}
                containerStyle={{height: 40, width: 350}}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                onChangeItem={(item) => 
                  this.setState({
                    skills: item, // an array of the selected items
                  })
                  // console.log(item)
                }
                // onChangeItem={this.handleChangeSkills()}
                value={this.state.skills}
              />
            </View>
            {this.state.showSkills === true ? (
              <View style={[styles.flatList, {marginTop: -15}]}>
                <FlatList
                  data={this.state.skillsData}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={renderSkillItems}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            ) : (
              <></>
            )}
            <Text style={styles.inputHead}>Project Budget *</Text>
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
                <TextInput
                  returnKeyType="done"
                  style={[styles.inputGroup, {width: '70%'}]}
                  // keyboardType="number-pad"
                  // value={this.state.budget* 70}
                  value={this.state.budget * 70}
                />
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
      </SafeAreaView>
    );
  }
}

export default PostProject;
