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
import {Picker} from '@react-native-community/picker';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
//import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
      showStartDatePicker: false,
      showEndDatePicker: false,
      showLoader: false,
      showSkills: false,
      showCategories: false,
      skillsData: [
        {title: 'C'},
        {title: 'JAVA'},
        {title: 'C++'},
        {title: 'C#'},
      ],
      categoriesData: [
        {title: 'Data Entry'},
        {title: 'Software Development'},
        {title: 'Sales and Marketing'},
        {title: 'Music and Arts'},
      ],
      skill: [
        {name: 'Concentration'},
        {name: 'Fast Typing Speed'},
        {name: 'Microsoft Word'},
        {name: 'Microsoft Excel'},
        {name: 'Blockchain'},
        {name: 'Data Science'},
        {name: 'Mathematics'},
      ],
      categories: [
        {name: 'Data Entry'},
        {name: 'Software Development'},
        {name: 'Sales and Marketing'},
        {name: 'Music and Arts'},
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
  handleCategories = async () => {
    this.setState({showCategories: !this.state.showCategories});
  };
  handleSubmit = async () => {
    this.setState({showLoader: true});
    Toast.show('submit action', Toast.LONG);
  };
  FlatListItemSeparator = () => (
    <View
      style={{
        height: 1.5,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.5)',
      }}
    />
  );
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
            showsVerticalScrollIndicator={false}>
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

                <Text style={styles.inputHead}>Categories *</Text>

                <View style={[styles.formGroup1]}>
                  <View
                    style={[
                      styles.formSubGroup2,
                      {flexWrap: 'wrap', flexDirection: 'row'},
                    ]}>
                    {this.state.categories.map((item, i) => (
                      <View key={i} style={styles.skillTab}>
                        <Text style={styles.skillText}>{item.name}</Text>
                        <FontAwesome
                          name="times-circle"
                          size={20}
                          color="black"
                          style={styles.marginRight3}
                        />
                      </View>
                    ))}
                  </View>
                  <View style={styles.formSubGroup1}>
                    <FontAwesome
                      name="angle-down"
                      size={28}
                      color="#d7d7d8"
                      onPress={() => this.handleCategories()}
                    />
                  </View>
                </View>
                {this.state.showCategories === true ? (
                  <View style={[styles.formGroup1, {marginTop: -15}]}>
                    <FlatList
                      data={this.state.categoriesData}
                      ItemSeparatorComponent={this.FlatListItemSeparator}
                      renderItem={renderSkillItems}
                      showsHorizontalScrollIndicator={false}
                      //keyExtractor={(item) => item.id}
                    />
                  </View>
                ) : (
                  <></>
                )}
                <Text style={styles.inputHead}>Skills *</Text>

                <View style={[styles.formGroup1]}>
                  <View
                    style={[
                      styles.formSubGroup2,
                      {flexWrap: 'wrap', flexDirection: 'row'},
                    ]}>
                    {this.state.skill.map((item, i) => (
                      <View key={i} style={styles.skillTab}>
                        <Text style={styles.skillText}>{item.name}</Text>
                        <FontAwesome
                          name="times-circle"
                          size={20}
                          color="black"
                          style={styles.marginRight3}
                        />
                      </View>
                    ))}
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
                {this.state.showStartDatePicker === true ? (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    placeholder="Select Start Date"
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                  />
                ) : (
                  <></>
                )}
                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, {height: 45}]}>
                    <Text style={styles.inputHead2}>
                      {this.state.startDate}
                    </Text>
                  </View>
                  <View style={styles.formSubGroup1}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          showStartDatePicker: !this.state.showStartDatePicker,
                        })
                      }>
                      <FontAwesome name="calendar" size={25} color="#d7d7d8" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.inputHead}>End Date *</Text>
                {this.state.showEndDatePicker === true ? (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    placeholder="Select End Date"
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                  />
                ) : (
                  <></>
                )}
                <View style={styles.formGroup1}>
                  <View style={[styles.formSubGroup2, {height: 45}]}>
                    <Text style={styles.inputHead2}>{this.state.endDate}</Text>
                  </View>
                  <View style={styles.formSubGroup1}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          showEndDatePicker: !this.state.showEndDatePicker,
                        })
                      }>
                      <FontAwesome name="calendar" size={25} color="#d7d7d8" />
                    </TouchableOpacity>
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
