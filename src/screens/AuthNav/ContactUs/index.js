import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import CommonStyle from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {API_URL} from '../../../config/url';
import axios from 'axios';

import Spinner from 'react-native-loading-spinner-overlay';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      errors: {},
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  handelName = async (e) => {
    this.setState({
      name: e,
    });
    this.validateJobForm();
  };

  handelEmail = async (e) => {
    this.setState({
      email: e,
    });
    this.validateJobForm();
  };

  handelMessage = async (e) => {
    this.setState({
      message: e,
    });
    this.validateJobForm();
  };

  validateJobForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.name) {
      formIsValid = false;
      errors['name'] = '*Please enter the name';
    }

    if (this.state.name.length > 0 && this.state.name.length < 3) {
      formIsValid = false;
      errors['namechar'] = '*enter minimum 3 characters';
    }

    if (!this.state.email) {
      formIsValid = false;
      errors['email'] = '*Please enter your email address.';
    }

    if (typeof this.state.email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?))|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/i,
      );
      if (!pattern.test(this.state.email)) {
        formIsValid = false;
        errors['email'] = '*Please enter valid email address.';
      }
    }

    if (!this.state.message) {
      formIsValid = false;
      errors['message'] = '*Please enter the message';
    }

    if (this.state.message.length > 0 && this.state.message.length < 5) {
      formIsValid = false;
      errors['messagechar'] = '*enter minimum 5 characters';
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  userContact = async () => {
    const obj = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
    };

    await axios
      .post(API_URL + 'contact_us', obj, {
        header: {
          'content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.data[0].message === 'SUCCESS') {
          this.setState({
            showLoader: false,
          });
          alert(
            'Thank You! for contacting us',
            'ConnectBud team will contact you asap',
            'info',
          );
          this.props.navigation.navigate('StudentInner');
        }
      })
      .catch((error) => {});
  };

  ContactForm = () => {
    let dataSet = this.validateJobForm();
    if (dataSet === true) {
      this.setState({
        showLoader: true,
      });
      this.userContact();
    }
  };

  render() {
    return (
      <SafeAreaView style={CommonStyle.safeAreaView}>
        <View style={CommonStyle.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header />
            <View style={{marginHorizontal: '5%', marginTop: 20}}>
              <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>
                Contact Us
              </Text>

              <View style={{marginVertical: '2%', marginTop: 20}}>
                <TextInput
                  returnKeyType="done"
                  placeholder="* Enter your user name"
                  keyboardType="default"
                  style={styles.formGroup}
                  onChangeText={(e) => this.handelName(e)}
                />
              </View>
              <Text style={styles.errorText}>
                {this.state.errors.name}
                {this.state.errors.namechar}
              </Text>

              <View style={{marginVertical: '2%'}}>
                <TextInput
                  returnKeyType="done"
                  placeholder="* Enter your Email"
                  keyboardType="email-address"
                  style={styles.formGroup}
                  onChangeText={(e) => this.handelEmail(e)}
                />
              </View>
              <Text style={styles.errorText}>{this.state.errors.email}</Text>

              <View style={{marginVertical: '2%'}}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Write your message"
                  keyboardType="default"
                  numberOfLines={5}
                  multiline={true}
                  style={styles.formGroup2}
                  onChangeText={(e) => this.handelMessage(e)}
                />
              </View>
              <Text style={styles.errorText}>
                {this.state.errors.message}
                {this.state.errors.messagechar}
              </Text>

              <TouchableOpacity activeOpacity={0.9} style={[styles.authBtn]}>
                <Text style={styles.authBtnText} onPress={this.ContactForm}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default ContactUs;
