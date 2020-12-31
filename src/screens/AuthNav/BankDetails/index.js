import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {API_URL} from '../../../config/url';
import {connect} from 'react-redux';
import {Header} from 'react-navigation-stack';

import Spinner from 'react-native-loading-spinner-overlay';

import base64 from 'base-64';

class BankDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      typeValue: '',
      name: '',
      account: '',
      route: '',
      user_id: '',
      errors: [],
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  handelName = (e) => {
    this.setState({
      name: e,
    });
    this.validateJobForm();
  };

  handelRoute = (e) => {
    this.setState({
      route: e,
    });
    this.validateJobForm();
  };

  handelAccountNumber = (e) => {
    this.setState({
      account: e,
    });
    this.validateJobForm();
  };

  componentDidMount = async () => {
    const {userDeatailResponse} = this.props;

    let taglistbody = new FormData();
    this.setState({
      user_id: base64.decode(userDeatailResponse.userData.user_id)
    })

    taglistbody.append(
      'user_id',
      base64.decode(userDeatailResponse.userData.user_id),
    );
    taglistbody.append('method', 'get');

    await axios({
      url: API_URL + 'info',
      method: 'POST',
      data: taglistbody,
    }).then((response) => {
      console.log(response);
      if (response.data[0].message !== 'No data found') {
        console.log('ssssssssssss');
        this.setState({
          route: response.data[0].routing.trim(),
          name: response.data[0].name.trim(),
          country: response.data[0].country,
          accountType: response.data[0].type,
          account: response.data[0].account,
        });
      } else {
        <></>;
      }
    });
  };

  onButtonSubmit = async () => {
    this.setState({
      showLoader: true,
    });
    let dataSet = this.validateJobForm();
    if (dataSet === true) {
      this.bankDetails();
    }
  };

  validateJobForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.name) {
      formIsValid = false;
      errors['name'] = '*Please enter your name';
    }

    if (!this.state.route) {
      formIsValid = false;
      errors['route'] = '*Please enter code';
    }

    if (!this.state.country || this.state.country === 'Select Country') {
      formIsValid = false;
      errors['country'] = '*Please select your country';
    }

    if (!this.state.accountType || this.state.accountType === 'Please Select') {
      formIsValid = false;
      errors['accountType'] = '*Please select account type';
    }

    if (!this.state.account) {
      formIsValid = false;
      errors['account'] = '*Please enter account number';
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  bankDetails = async () => {
    this.setState({
      showLoader: false,
    });
    let taglistbody = new FormData();

    taglistbody.append('user_id', this.state.user_id);
    taglistbody.append('country', this.state.country);
    taglistbody.append('name', this.state.name);
    taglistbody.append('type', this.state.accountType);
    taglistbody.append('amount', '');
    taglistbody.append('id', '');
    taglistbody.append('method', 'put');
    taglistbody.append('routing', this.state.route);
    taglistbody.append('account', this.state.account);

    console.log(taglistbody);

    await axios({
      url: API_URL + 'info',
      method: 'POST',
      data: taglistbody,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          route: '',
          name: '',
          country: '',
          accountType: '',
          amount: '',
          account: '',
        });
        alert('You have successfully update your Bank Details');
        this.props.navigation.navigate('StudentInner');
        this.setState({
          btnStatus: false,
        });
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
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
          <StatusBar />
          {/* header section */}
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
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
              }
              style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>

          


            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
                <KeyboardAvoidingView
                  keyboardVerticalOffset = {Header.HEIGHT + 90} 
                  style = {{ flex: 1 }}
                  behavior = "padding" >
              <Text style={styles.heading}>Enter Bank Details</Text>

              <View style={styles.slctCntry}>
                <Text style={styles.slctCntryText}>Select Country</Text>
                <View style={styles.countryPicker}>
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.country}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({country: itemValue})
                    }>
                    <Picker.Item label="USA" value="USA" />
                    <Picker.Item label="India" value="India" />
                  </Picker>
                </View>
              </View>
              <Text style={styles.errorText}>{this.state.errors.country}</Text>

              <View style={[styles.slctCntry, styles.marVer20]}>
                <View>
                  <Text style={styles.slctCntryText}>Account Holder *</Text>
                  <TextInput
                    placeholder="Enter Full Name"
                    style={styles.input}
                    onChangeText={(e) => this.handelName(e)}
                    value={this.state.name}
                  />
                </View>
                <Text style={styles.errorText}>{this.state.errors.name}</Text>

                <View>
                  <Text style={styles.slctCntryText}>Account Type *</Text>
                  <View style={styles.accountType}>
                    <Picker
                      style={styles.picker}
                      selectedValue={this.state.accountType}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({accountType: itemValue})
                      }>
                      <Picker.Item label="Please Select" />
                      <Picker.Item label="Current" value="Current" />
                      <Picker.Item label="Saving" value="Saving" />
                      <Picker.Item label="Business" value="Business" />
                    </Picker>
                  </View>
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.accountType}
                </Text>

                <View>
                  <Text style={styles.slctCntryText}>Routing Number *</Text>
                  <TextInput
                    placeholder="Enter Code"
                    style={styles.input}
                    onChangeText={(e) => this.handelRoute(e)}
                    value={this.state.route}
                  />
                </View>
                <Text style={styles.errorText}>{this.state.errors.route}</Text>

                <View>
                  <Text style={styles.slctCntryText}>Account Number *</Text>
                  <TextInput
                    placeholder="Account Number"
                    style={[styles.input, styles.marBtm0]}
                    onChangeText={(e) => this.handelAccountNumber(e)}
                    value={this.state.account}
                  />
                </View>
                <Text style={styles.errorText}>
                  {this.state.errors.account}
                </Text>

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => this.onButtonSubmit()}>
                  <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// export default BankDetailScreen;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    // updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(mapStateToProps, mapDispatch)(BankDetailScreen);
