import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
// import ImagePicker from 'react-native-image-picker';

class EditProfileScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {
      firtName: '',
      lastName: '',
      college: '',
      major: '',
      currentEnrollment: '',
      typeValue: '',
      location: '',
      startDate: '',
      endDate: '',
      community: '',
      socialUrl: '',
      profileImageSource: '',
      coverImageSource: '',
      profileImageToUpload: {},
      coverImageToUpload: {},
      showLoader: false,
      showSkills: false,
      skillsData: [
        {title: 'C'},
        {title: 'JAVA'},
        {title: 'C++'},
        {title: 'C#'},
      ],
    };
  }

  selectProfilePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker.showImagePicker(options, (showImage) => {
    //   if (showImage.didCancel) {
    //   } else if (showImage.error) {
    //   } else if (showImage.customButton) {
    //   } else {
    //     this.setState({
    //       profileImageToUpload: {
    //         name: showImage.fileName,
    //         type: showImage.type,
    //         // path: showImage.path,
    //         uri: showImage.uri,
    //       },
    //        profileImageSource: showImage.uri,
    //     });
    //   }
    // });
  };

  selectCoverPhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker.showImagePicker(options, (showImage) => {
    //   if (showImage.didCancel) {
    //   } else if (showImage.error) {
    //   } else if (showImage.customButton) {
    //   } else {
    //     this.setState({
    //       coverImageToUpload: {
    //         name: showImage.fileName,
    //         type: showImage.type,
    //         // path: showImage.path,
    //         uri: showImage.uri,
    //       },
    //       coverImageSource: showImage.uri,
    //     });
    //   }
    // });
  };

  handleSkills = async () => {
    this.setState({showSkills: !this.state.showSkills});
  };
  handleSubmit = async () => {
    this.setState({showLoader: true});
    Toast.show('submit action', Toast.LONG);
  };

  render() {
    const renderSkillItems = ({item}) => (
      <TouchableOpacity style={styles.headSec}>
        <View style={styles.details}>
          <Text style={styles.inputHead}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar
            backgroundColor="#60a84e"
            barStyle="light-content"
            hidden={false}
            translucent={false}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <View style={styles.uploadSec}>
                <View style={styles.cover}>
                  <Image
                    style={[CommonStyles.image]}
                    source={require('../../../assets/images/bnr.jpg')}
                  />
                  <Image
                    style={styles.uploadcoverImage}
                    source={{
                      uri: `${this.state.coverImageSource}`,
                    }}
                  />
                  <TouchableOpacity
                    onPress={this.selectCoverPhoto}
                    style={styles.coverUpload}>
                    <FontAwesome name="camera" size={20} color="#71b85f" />
                  </TouchableOpacity>
                </View>

                <View style={styles.logo}>
                  <Image
                    style={[styles.image, {borderRadius: 55}]}
                    source={require('../../../assets/images/userPro.jpg')}
                  />
                  <Image
                    style={styles.uploadImage}
                    source={{
                      uri: `${this.state.profileImageSource}`,
                    }}
                  />
                  <TouchableOpacity
                    onPress={this.selectProfilePhoto}
                    style={styles.logoUpload}>
                    <FontAwesome name="camera" size={20} color="#71b85f" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.form}>
                <Text style={styles.title}>Edit Profile</Text>

                <Text style={styles.inputHead}>First Name *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="John"
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="user" size={25} color="#d7d7d8" />
                  </View>
                </View>

                <Text style={styles.inputHead}>Last Name *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Doe"
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="user" size={25} color="#d7d7d8" />
                  </View>
                </View>

                <Text style={styles.inputHead}>College *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="MIT"
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="graduation-cap"
                      size={25}
                      color="#d7d7d8"
                    />
                  </View>
                </View>

                <Text style={styles.inputHead}>Major *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Java"
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="graduation-cap"
                      size={25}
                      color="#d7d7d8"
                    />
                  </View>
                </View>

                <Text style={styles.inputHead}>Current Enrollment *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Java"
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="graduation-cap"
                      size={25}
                      color="#d7d7d8"
                    />
                  </View>
                </View>
                <Text style={styles.inputHead}>Type *</Text>

                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, {width: '100%'}]}>
                    <Picker
                      style={{width: '100%', height: 45}}
                      selectedValue={this.state.typeValue}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({typeValue: itemValue})
                      }>
                      <Picker.Item label="Full Timer" value="FT" />
                      <Picker.Item label="Part Timer" value="PT" />
                    </Picker>
                  </View>
                </View>

                <Text style={styles.inputHead}>Location *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="USA"
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="map-marker" size={25} color="#d7d7d8" />
                  </View>
                </View>

                <Text style={styles.inputHead}>Skills *</Text>

                <View style={[styles.formGroup1]}>
                  <View style={[styles.formSubGroup2,{flexWrap:'wrap'}]}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Java"
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="angle-down"
                      size={28}
                      color="#d7d7d8"
                      onPress={() => this.handleSkills()}
                    />
                  </View>
                </View>
                {this.state.showSkills === true ? (
                  <View style={[styles.formGroup1, {marginTop: -15}]}>
                    <FlatList
                      data={this.state.skillsData}
                      ItemSeparatorComponent={this.FlatListItemSeparator}
                      renderItem={renderSkillItems}
                      showsHorizontalScrollIndicator={false}
                      //keyExtractor={(item) => item.id}
                    />
                  </View>
                ) : (
                  <></>
                )}

                <Text style={styles.inputHead}>Start Date *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <DatePicker
                      style={{width: '100%'}}
                      date={this.state.startDate}
                      mode="date"
                      placeholder="01-01-2021"
                      format="YYYY-MM-DD"
                      minDate="1900-05-01"
                      maxDate={moment().subtract(10, 'years')}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={styles.datePickerStyle}
                      onDateChange={(date) =>
                        this.handleChange(date, 'startDate')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="calendar" size={25} color="#d7d7d8" />
                  </View>
                </View>

                <Text style={styles.inputHead}>End Date *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <DatePicker
                      style={{width: '100%'}}
                      date={this.state.endDate}
                      mode="date"
                      placeholder="10-01-2021"
                      format="YYYY-MM-DD"
                      minDate="1900-05-01"
                      maxDate={moment().subtract(10, 'years')}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={styles.datePickerStyle}
                      onDateChange={(date) =>
                        this.handleChange(date, 'endDate')
                      }
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="calendar" size={25} color="#d7d7d8" />
                  </View>
                </View>
                <Text style={styles.inputHead}>Community *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Java"
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                </View>

                <Text style={styles.inputHead}>Social Url(s) *</Text>

                <View style={styles.formGroup1}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="http://facebook.com/..."
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome name="plus" size={25} color="#d7d7d8" />
                  </View>
                </View>
                <Text style={styles.inputHead}>Info *</Text>

                <View
                  style={[
                    styles.formGroup1,
                    {
                      height: 180,
                    },
                  ]}>
                  <View
                    style={[
                      styles.formSubGroup2,
                      {
                        height: 180,
                        width: '100%',
                      },
                    ]}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="Write something..."
                      style={[
                        styles.inputGroup,
                        {
                          height: 180,
                          justifyContent: 'flex-start',
                          textAlignVertical: 'top',
                        },
                      ]}
                      keyboardType="default"
                      numberOfLines={10}
                      multiline={true}
                    />
                  </View>
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
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default EditProfileScreen;
