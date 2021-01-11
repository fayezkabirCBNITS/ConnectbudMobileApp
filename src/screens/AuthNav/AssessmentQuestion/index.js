import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider, ProgressBar, Colors} from 'react-native-paper';
import HeaderTop from '../../../components/Header';
import {Header} from 'react-navigation-stack';

import axios from 'axios';
import {API_URL} from '../../../config/url';

import {connect} from 'react-redux';
import base64 from 'base-64';
import Spinner from 'react-native-loading-spinner-overlay';

class AssessmentQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_status: this.props.navigation.state.params
        ? this.props.navigation.state.params.pageStatus
        : '',
      jobDetails: [],
      skillSet: [],
      priceAmount: '',
      firstAnswer: '',
      secondAnswer: '',
      thirdAnswer: '',
      ctc: '',
      errors: {},
      user_id: '',
      showLoader: false,
    };
  }

  handleFirstAns = async (e) => {
    await this.setState({
      firstAnswer: e,
    });
    this.validateJobForm();
  };

  handleSecondAns = async (e) => {
    await this.setState({
      secondAnswer: e,
    });
    this.validateJobForm();
  };

  handleThirdAns = async (e) => {
    await this.setState({
      thirdAnswer: e,
    });
  };

  handleCTC = async (e) => {
    await this.setState({
      ctc: e,
      priceAmount: e,
    });
  };

  static navigationOptions = {
    headerShown: false,
  };

  validateJobForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.firstAnswer) {
      formIsValid = false;
      errors['firstAnswer'] = '*Please enter the answer';
    }

    if (
      this.state.firstAnswer.length > 0 &&
      this.state.firstAnswer.length < 50
    ) {
      formIsValid = false;
      errors['firstAnswerChara'] = '*Type minimum 50 characters';
    }

    if (!this.state.secondAnswer) {
      formIsValid = false;
      errors['secondAnswer'] = '*Please enter the answer';
    }

    if (
      this.state.secondAnswer.length > 0 &&
      this.state.secondAnswer.length < 50
    ) {
      formIsValid = false;
      errors['secondAnswerChara'] = '*Type minimum 50 characters';
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;
    this.setState({
      user_id: base64.decode(userDeatailResponse.userData.user_id),
    });

    let taglistbody = new FormData();

    taglistbody.append('job_id', userDeatailResponse.userData.JOBID);
    taglistbody.append(
      'user_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );
    if (this.state.page_status === 'job') {
      taglistbody.append('type', 'recruiter');
    } else {
      taglistbody.append('type', 'freelancer');
    }

    console.log(taglistbody);

    await axios({
      url: API_URL + 'expert_jobdetails',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        console.log(response);
        if (response.data[0].message === 'No data found') {
          this.setState({
            jobDetails: response.data,
            skillSet: response.data[0].key_skill,
          });
        } else if (this.state.page_status === 'job') {
          this.setState({
            jobDetails: response.data,
            priceAmount: response.data[0].job_amount.toString(),
            skillSet: response.data[0].key_skill,
          });
        } else {
          this.setState({
            jobDetails: response.data,
            priceAmount: response.data[0].price_amount.toString(),
            skillSet: response.data[0].key_skill,
          });
        }

        this.setState({isLoading: true});
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };

  onSubmit = async (jobId, hirerId, Token) => {
    let dataSet = this.validateJobForm();
    if (dataSet === true) {
      this.setState({
        showLoader: true,
      });
      let body = new FormData();
      body.append('method', 'Post');
      if (this.state.page_status === 'job') {
        body.append('type', 'recruiter');
      } else {
        body.append('type', 'freelancer');
      }
      body.append('job_id', jobId);
      body.append('freelancer_id', this.state.user_id);
      body.append('hirer_id', hirerId);
      body.append('answer1', this.state.firstAnswer);
      body.append('answer2', this.state.secondAnswer);
      body.append('answer3', this.state.thirdAnswer);
      {
        this.state.ctc === ''
          ? body.append('proposed_amount', this.state.priceAmount)
          : body.append('proposed_amount', this.state.ctc);
      }
      body.append('resumefile', '');
      body.append('videolink', '');
      console.log(body);
      await axios({
        url: API_URL + 'freelancerproposal',
        method: 'POST',
        data: body,
      })
        .then((response) => {
          //   localStorage.setItem("page_status", "chat");
          this.setState({
            showLoader: false,
            firstAnswer: '',
            thirdAnswer: '',
            secondAnswer: '',
          });
          alert('Proposal sent successfully !');
          this.props.navigation.navigate('ChatScreen');
        })
        .catch((error) => {
          this.setState({
            showLoader: false,
          })
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Header.HEIGHT + 0}
          behavior="padding"
          style={{flex: 1}}
        >
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
           <HeaderTop />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
           
            <View>
              <Text style={styles.Heading}>Assessment Questions</Text>
              {/* <Divider style={styles.divider} /> */}

              <Text style={styles.quesHead}>
                Q : *Why should you be hired for this tutoring job?
              </Text>
              <View>
                <TextInput
                  returnKeyType="done"
                  placeholder="Mention in detail what skills you have for this tutoring job"
                  keyboardType="default"
                  style={styles.inputBox}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(e) => this.handleFirstAns(e)}
                />
              </View>
              <Text style={styles.errorText}>
                {this.state.errors.firstAnswer}
                {this.state.errors.firstAnswerChara}
              </Text>

              <Text style={styles.quesHead}>
                Q : *Do you have any past experience?
              </Text>
              <View>
                <TextInput
                  returnKeyType="done"
                  placeholder="Mention in details what past experience you have"
                  keyboardType="default"
                  style={styles.inputBox}
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(e) => this.handleSecondAns(e)}
                />
              </View>
            </View>
            <Text style={styles.errorText}>
              {this.state.errors.secondAnswer}
              {this.state.errors.secondAnswerChara}
            </Text>

            <Text style={styles.quesHead}>
              Q : Do you have any queries about this tutoring job?
            </Text>
            <View>
              <TextInput
                returnKeyType="done"
                placeholder="Mention about any queries"
                keyboardType="default"
                style={styles.inputBox}
                multiline={true}
                numberOfLines={5}
                onChangeText={(e) => this.handleThirdAns(e)}
              />
            </View>

            <Text style={styles.quesHead}>Proposed Amount(in USD)</Text>
            <View>
              <TextInput
                returnKeyType="done"
                placeholder="Please enter your amount"
                keyboardType="default"
                style={styles.inputBox}
                numberOfLines={1}
                value={this.state.priceAmount}
                onChangeText={(e) => this.handleCTC(e)}
              />
            </View>

            {/* <Text style={styles.quesHead}>Upload Resume (Doxs, pdf - 2MB max)</Text>
                        <View>
                            <TouchableOpacity
                                style={[styles.uploadBtn]}>
                                <Text style={styles.uploadBtnText}>Choose file</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.quesHead}>Video Resume Link :</Text>
                        <View>
                            <TextInput
                                returnKeyType="done"
                                placeholder="Portfolio Description eg. build ecommerce app using python"
                                keyboardType="default"
                                style={styles.inputBox}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View> */}

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={[styles.authBtn]}>
                <Text
                  style={styles.authBtnText}
                  onPress={() =>
                    this.props.navigation.navigate('StudentInner')
                  }>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.authBtn]}>
                {this.state.jobDetails.map((value, index) => {
                  return (
                    <Text
                      style={[styles.authBtnText, {color: '#fff'}]}
                      onPress={() =>
                        this.onSubmit(value.id, value.user_id, value.token)
                      }>
                      SUBMIT
                    </Text>
                  );
                })}
              </TouchableOpacity>
            </View>
          </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }
}

// export default AssessmentQuestion;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(mapStateToProps, mapDispatch)(AssessmentQuestion);
