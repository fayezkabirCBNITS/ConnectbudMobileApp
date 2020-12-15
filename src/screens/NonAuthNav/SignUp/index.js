import React, {Component} from 'react';

import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {deepClone} from '../../../services/helper-methods';

import style from '../../../../CommonStyles';
import styles from './style';

class SignUpScreen extends Component {
  state = {
    formFields: {
      email: {
        value: '',
        error: null,
        isValid: false,
        isDirty: false,
        isRequired: true,
      },
      userName: {
        value: '',
        error: null,
        isValid: false,
        isDirty: false,
        isRequired: true,
        isAvailable: false,
      },
      password: {
        value: '',
        error: null,
        isValid: false,
        isDirty: false,
        isRequired: true,
      },
      confirmPassword: {
        value: '',
        error: null,
        isValid: false,
        isDirty: false,
        isRequired: true,
      },
      acceptCondition: {
        value: false,
        error: null,
        isValid: false,
        isDirty: false,
        isRequired: true,
      },
    },
    isLoading: false,
    isFormValid: false,
  };

  static navigationOptions = {
    headerShown: false,
  };

  /**
   * Reset Navigation stack with a new route
   */
  _resetStack = (routeName = 'PassionScreen') => {
    console.log('12345 :>> ', 12345);
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'AuthStackNav',
            action: NavigationActions.navigate({routeName}),
          }),
        ],
      }),
    );
  };

  _changeFormValue = (value, attr) => {
    const {formFields} = deepClone(this.state);

    if (attr === 'userName') {
      if (value.length && RegexConfig.userName.test(value.trim())) {
        formFields[attr]['value'] = value.trim();
      } else {
        return;
      }
    } else {
      formFields[attr]['value'] = value;
    }

    this.setState({formFields}, () => {
      this._validateForm();
    });
  };

  _checkUserNameAvailability = (_) => {
    const {formFields} = deepClone(this.state);
    formFields['userName']['isAvailable'] = true;
    this.setState({formFields}, () => {
      this._markAsDirty('userName');
    });
  };

  _validateForm = () => {
    return new Promise((resolve, reject) => {
      const {formFields, isValidAddress, deliveryAddressDetails} = deepClone(
        this.state,
      );

      let isFormValid = true;
      Object.keys(formFields).forEach((fieldName, index) => {
        switch (fieldName) {
          case 'email': {
            if (
              formFields.email.value &&
              formFields.email.value.length &&
              RegexConfig.email.test(formFields.email.value.toLowerCase())
            ) {
              formFields.email.isValid = true;
            } else {
              formFields.email.isValid = false;
              isFormValid = false;
            }
            break;
          }

          case 'userName': {
            if (
              formFields.userName.value &&
              formFields.userName.value.length &&
              formFields.userName.isAvailable
            ) {
              formFields.userName.isValid = true;
            } else {
              formFields.userName.isValid = false;
              isFormValid = false;
            }
            break;
          }

          case 'password': {
            if (formFields.password.value && formFields.password.value.length) {
              formFields.password.isValid = true;
            } else {
              formFields.password.isValid = false;
              isFormValid = false;
            }
            break;
          }

          case 'confirmPassword': {
            if (
              formFields.confirmPassword.value &&
              formFields.confirmPassword.value.length &&
              formFields.confirmPassword.value === formFields.password.value
            ) {
              formFields.confirmPassword.isValid = true;
            } else {
              formFields.confirmPassword.isValid = false;
              isFormValid = false;
            }
            break;
          }
        }
      });
      this.setState({formFields, isFormValid}, () => {
        resolve();
      });
    });
  };

  _markAsFocused = (fieldName) => {
    const {formFields} = deepClone(this.state);
    formFields[fieldName].isFocused = true;
    this.setState({formFields});
  };

  _makeAllFieldDirty = () => {
    return new Promise((resolve) => {
      const {formFields} = deepClone(this.state);
      Object.keys(formFields).forEach((fieldName, index) => {
        formFields[fieldName].isDirty = true;
      });
      this.setState({formFields}, () => {
        resolve();
      });
    });
  };

  _markAsDirty = (fieldName) => {
    const {formFields} = deepClone(this.state);
    formFields[fieldName].isDirty = true;

    formFields[fieldName].isValid = false;
    formFields[fieldName].isFocused = false;
    this.setState({formFields}, () => {
      this._validateForm();
    });
  };

  _signUp = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const {formFields, isFormValid, isLoading} = deepClone(this.state);

    if (this.state.isLoading || !this.state.isFormValid) {
      return;
    }

    await this._makeAllFieldDirty();
    await this._validateForm();

    this.setState({isLoading: true}, () => {
      if (isFormValid) {
        this._resetStack();
      } else {
        this.setState({isLoading: false});
      }
    });
  };

  render() {
    const {formFields, isLoading, isFormValid} = deepClone(this.state);
    return (
      <Text>Signup screen</Text>
      // <SafeAreaView style={style.wrapper}>
      //   <StatusBar
      //     barStyle="light-content"
      //     backgroundColor="#e30021"
      //     translucent
      //   />

      //   <KeyboardAvoidingView
      //     keyboardDismissMode="on-drag"
      //     style={style.flexOne}>
      //     <ScrollView keyboardDismissMode="on-drag">
      //       <View style={style.container}>
      //         <View style={style.logoview}>
      //           {/* <Image
      //             source={require('../../assets/images/logo.png')}
      //             style={style.logo}
      //           /> */}
      //         </View>
      //         <View style={style.flexOne}>
      //           <View style={style.formwrap}>
      //             <View style={[style.formgroup, style.rowjustify]}>
      //               <View style={style.icoinput}>
      //                 <Icon name="ios-person" size={20} color="#f10c2d" />
      //               </View>
      //               <View style={style.inbox}>
      //                 <Text style={style.labeltext}>User Name</Text>
      //                 <TextInput
      //                   returnKeyType="done"
      //                   style={style.inputform}
      //                   placeholder="Enter"
      //                   value={formFields.userName.value}
      //                   onChangeText={(text) => {
      //                     this._changeFormValue(text, 'userName');
      //                   }}
      //                   onBlur={() => this._checkUserNameAvailability()}
      //                 />
      //               </View>
      //             </View>
      //             <View style={[style.formgroup, style.rowjustify]}>
      //               <View style={style.icoinput}>
      //                 <Icon name="mail-open" size={20} color="#f10c2d" />
      //               </View>
      //               <View style={style.inbox}>
      //                 <Text style={style.labeltext}>Email</Text>
      //                 <TextInput
      //                   returnKeyType="done"
      //                   style={style.inputform}
      //                   placeholder="Enter"
      //                   value={formFields.email.value}
      //                   onChangeText={(text) => {
      //                     this._changeFormValue(text, 'email');
      //                   }}
      //                   onBlur={() => this._markAsDirty('email')}
      //                 />
      //               </View>
      //             </View>
      //             <View style={[style.formgroup, style.rowjustify]}>
      //               <View style={style.icoinput}>
      //                 <Fontistoicon name="locked" size={20} color="#f10c2d" />
      //               </View>
      //               <View style={style.inbox}>
      //                 <Text style={style.labeltext}>Password</Text>
      //                 <TextInput
      //                   returnKeyType="done"
      //                   style={style.inputform}
      //                   placeholder="Enter"
      //                   secureTextEntry={true}
      //                   value={formFields.password.value}
      //                   onChangeText={(text) => {
      //                     this._changeFormValue(text, 'password');
      //                   }}
      //                   onBlur={() => this._markAsDirty('password')}
      //                 />
      //               </View>
      //             </View>
      //             <View style={[style.formgroup, style.rowjustify]}>
      //               <View style={style.icoinput}>
      //                 <Fontistoicon name="locked" size={20} color="#f10c2d" />
      //               </View>
      //               <View style={style.inbox}>
      //                 <Text style={style.labeltext}>Confirm Password</Text>
      //                 <TextInput
      //                   returnKeyType="done"
      //                   style={style.inputform}
      //                   placeholder="Enter"
      //                   secureTextEntry={true}
      //                   value={formFields.confirmPassword.value}
      //                   onChangeText={(text) => {
      //                     this._changeFormValue(text, 'confirmPassword');
      //                   }}
      //                   onBlur={() => this._markAsDirty('confirmPassword')}
      //                 />
      //               </View>
      //             </View>

      //             <View style={style.mT2}>
      //               <View
      //                 style={[style.rowSec, style.alignCenter, style.width100]}>
      //                 <View
      //                   style={{
      //                     marginRight: 10,
      //                     marginLeft: 10,
      //                     maxWidth: '100%',
      //                   }}>
      //                   <Text style={[styles.ftext, styles.rowwrap]}>
      //                     Yes, I understand and agree to the workwise
      //                     <Text style={[styles.whitetext, {fontSize: 17}]}>
      //                       {' '}
      //                       Terms & Conditions.
      //                     </Text>
      //                   </Text>
      //                 </View>
      //               </View>
      //             </View>

      //             <View style={style.formgroup}>
      //               <TouchableOpacity
      //                 style={
      //                   !isFormValid || isLoading
      //                     ? style.disableBtn
      //                     : styles.blackbtn
      //                 }
      //                 onPress={(event) => this._signUp(event)}>
      //                 <Text style={styles.btntext}>SIGN UP</Text>
      //                 {isLoading ? (
      //                   <ActivityIndicator
      //                     size="large"
      //                     color="#fff"
      //                     style={style.btnLoader}
      //                   />
      //                 ) : null}
      //               </TouchableOpacity>
      //             </View>
      //           </View>
      //           <View style={[styles.textbtn, style.mT4]}>
      //             <Text style={[styles.ftext, {fontSize: 18}]}>
      //               Already have an account?
      //             </Text>
      //             <TouchableOpacity
      //               onPress={() =>
      //                 this.props.navigation.navigate('SignInScreen')
      //               }>
      //               <Text style={[styles.whitetext, {fontWeight: 'bold'}]}>
      //                 SIGN IN
      //               </Text>
      //             </TouchableOpacity>
      //           </View>
      //         </View>
      //       </View>
      //     </ScrollView>
      //   </KeyboardAvoidingView>
      // </SafeAreaView>
    );
  }
}

export default SignUpScreen;
