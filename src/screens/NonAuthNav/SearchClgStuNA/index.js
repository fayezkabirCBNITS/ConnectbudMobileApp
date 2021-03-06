import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Picker } from '@react-native-community/picker';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import ApiUrl from '../../../config/ApiUrl';
import {
  makePostRequestMultipart,
  makeAuthGetRequest,
  makeGetRequest
} from '../../../services/http-connectors';
import { withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CheckBox } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

class SearchClgStu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FreelancerSet: [],
      CategoryList: [],
      skills: [],
      selectedSkills: [],
      skillValuePlaceHolder: [{ value: 'Select Skill', label: 'Select skill' }],
      updateInitialSearchState: false,
      Category: '',
      Country: '',
      Latest: '',
      isActiveIndex: "",
      lodarStatus: false,
      selectedValue: '',
      selectedCountry: '',
      collapsedCategory: false,
      collapsedSort: false,
      collapsedCountry: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.fetchSkills();
      this.fetchSearchedEmployees();
      this.AllCategory();
    });
    this.fetchSkills();
    this.fetchSearchedEmployees();
    this.AllCategory();
  }

  async fetchSkills() {
    let response = await makeAuthGetRequest(ApiUrl.FetchSkills, false, '');
    this.setState({ skills: this.state.skillValuePlaceHolder.concat(response) });
  }

  fetchSearchedEmployees = () => {
    const { params } = this.props.navigation.state;
    this.setState({
      FreelancerSet: params.res.data
    })
  }

  AllCategory = async () => {
    let response = await makeGetRequest(ApiUrl.FetchProjectCategory, false, '');
    this.setState({ CategoryList: response });
  };

  async fetchEmployees() {
    this.setState({ lodarStatus: true });
    let body = new FormData();
    body.append('user_id', '');
    body.append('job_id', '');
    body.append('skillset', '');
    body.append('status', '');
    body.append('search_type', 'all');
    body.append('experience', '');
    body.append('relocate', '');
    body.append('job_type', '');
    body.append('job_location', '');
    body.append('key_skill', '');
    body.append('offset', '30');
    body.append('type', 'freelancer');
    let response = await makePostRequestMultipart(
      ApiUrl.RecrutierFeedPage,
      false,
      body,
    );
    if (response) {
      this.setState({
        lodarStatus: false,
        FreelancerSet: response.sort(function (a, b) {
          if (a.avg_rating > b.avg_rating) return -1;
          else if (a.avg_rating > b.avg_rating) return 1;
          return 0;
        }),
        collapsedCategory: false,
        collapsedSort: false,
        collapsedCountry: false,
      });
      this.RBSheet.close();
    }
  }
  ResetEmployees = async () => {
    this.setState({
      lodarStatus: true,
      FreelancerSet: [],
      Category: '',
      Country: '',
      Latest: '',
      isActiveIndex: "",
      selectedValue: '',
      selectedCountry: '',
    });
    let body = new FormData();
    body.append('user_id', '');
    body.append('job_id', '');
    body.append('skillset', '');
    body.append('status', '');
    body.append('search_type', 'all');
    body.append('experience', '');
    body.append('relocate', '');
    body.append('job_type', '');
    body.append('job_location', '');
    body.append('key_skill', '');
    body.append('offset', '30');
    body.append('type', 'freelancer');
    let response = await makePostRequestMultipart(
      ApiUrl.RecrutierFeedPage,
      false,
      body,
    );
    if (response) {
      this.setState({
        lodarStatus: false,
        FreelancerSet: response.sort(function (a, b) {
          if (a.avg_rating > b.avg_rating) return -1;
          else if (a.avg_rating > b.avg_rating) return 1;
          return 0;
        }),
        collapsedCategory: false,
        collapsedSort: false,
        collapsedCountry: false,
      });
      this.RBSheet.close()
    }
  }
  async fetchFilteredEmployees() {
    this.setState({ lodarStatus: true });
    let body = new FormData();
    body.append('search_type', 'filter');
    body.append('category', this.state.Category);
    body.append('latest', this.state.Latest);
    body.append('user_id', '');
    body.append('offset', '30');
    body.append('location', this.state.Country);
    body.append('status', '');
    body.append('skillset', '');
    body.append('relocate', '');
    body.append('job_type', 'freelancer');
    let response = await makePostRequestMultipart(
      ApiUrl.RecrutierFeedPage,
      false,
      body,
    );
    if (response) {
      this.setState({
        lodarStatus: false,
        FreelancerSet: response.sort(function (a, b) {
          if (a.avg_rating > b.avg_rating) return -1;
          else if (a.avg_rating > b.avg_rating) return 1;
          return 0;
        }),
        collapsedCategory: false,
        collapsedSort: false,
        collapsedCountry: false,
      });
      this.RBSheet.close()
    }
  }
  async fetchEmployeesBasedOnIS(userIds) {
    const skt = JSON.stringify(this.state.selectedSkills).replace(
      /[\[\]']+/g,
      '',
    );
    this.setState({ lodarStatus: true });
    let body = new FormData();
    body.append('user_id', userIds);
    body.append('job_id', '');
    body.append('skillset', skt.replace(/['"]+/g, ''));
    body.append('status', '');
    body.append('search_type', 'all');
    body.append('experience', '');
    body.append('relocate', '');
    body.append('job_type', '');
    body.append('job_location', '');
    body.append('key_skill', '');
    body.append('offset', '30');
    body.append('type', 'freelancer');
    let response = await makePostRequestMultipart(
      ApiUrl.RecrutierFeedPage,
      false,
      body,
    );
    if (response) {
      this.setState({
        lodarStatus: false,
        FreelancerSet: response.sort(function (a, b) {
          if (a.avg_rating > b.avg_rating) return -1;
          else if (a.avg_rating > b.avg_rating) return 1;
          return 0;
        }),
      });
    }
  }

  async fetchInitialSearch() {
    const skt = JSON.stringify(this.state.selectedSkills).replace(
      /[\[\]']+/g,
      '',
    );
    let body = new FormData();
    body.append('skillset', skt.replace(/['"]+/g, ''));
    body.append('location', '');
    body.append('type', 'freelancer');
    let response = await makePostRequestMultipart(
      ApiUrl.RecrutierIntialSearch,
      false,
      body,
    );
    if (response && response[0]?.message === 'Matching Candidates Not found') {
      this.setState({ updateInitialSearchState: false });
      this.fetchEmployees();
    } else if (
      response &&
      response[0]?.message === 'Matching Candidates found'
    ) {
      this.setState({ updateInitialSearchState: false });
      this.fetchEmployeesBasedOnIS(response[0].user_id);
    }
  }

  reverseAddSkills = async (index) => {
    this.setState({
      selectedSkills: this.state.selectedSkills.filter((_, i) => i !== index),
    });
    let data = this.state.selectedSkills[index];
    await this.setState({
      skills: this.state.skills.concat({ value: data, label: data }).sort(),
    });
    this.setState({ skills: this.state.skills.sort() });
    this.fetchInitialSearch();
  };

  selectFilterCategory = (label, id) => {
    this.setState({ Category: label, isActiveIndex: id });
    this.fetchFilteredEmployees();
  };

  selectSortBy = async () => {
    this.setState({ Latest: 'yes', selectedValue: 'latest' });
    this.fetchFilteredEmployees();
  };

  selectCountry = async (country) => {
    if (country === 'All') {
      await this.setState({
        Country: 'All',
        selectedCountry: 'all',
      });
    } else if (country === 'India') {
      await this.setState({
        Country: 'India',
        selectedCountry: 'india',
      });
    } else {
      await this.setState({
        Country: 'USA',
        selectedCountry: 'usa',
      });
    }
    this.fetchFilteredEmployees();
  };

  handleCollapseCategory = (prevState) => {
    this.setState({ collapsedCategory: prevState });
  };

  handleCollapseSort = (prevState) => {
    this.setState({ collapsedSort: prevState });
  };

  handleCollapseCountry = (prevState) => {
    this.setState({ collapsedCountry: prevState });
  };

  render() {
    {
      this.state.updateInitialSearchState === true
        ? this.fetchInitialSearch()
        : '';
    }
    const { selectedValue } = this.state;
    const { selectedCountry } = this.state;
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* {/ header section /} */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#000" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
          </View>
          <Spinner
            visible={this.state.lodarStatus}
            animation="fade"
            textContent={'Loading...'}
          />
          {/* {/ header section end /} */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Text style={[styles.title, { fontSize: 18, paddingHorizontal: '5%', paddingLeft: 0, color: '#71b85f' }]}>
              Search, Connect, Hire(Use talent search to find college students){' '}
            </Text>
            <View>
              <View style={{ paddingHorizontal: '5%' }}>
                {this.state.selectedSkills.length > 0 ? (
                  this.state.selectedSkills?.map((data, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.reverseAddSkills(index)}
                        key={index}
                      >
                        <View
                          style={[
                            styles.formSubGroup22,
                            { flexWrap: 'wrap', flexDirection: 'row' },
                          ]}>
                          <View
                            style={[styles.skillTab]}>
                            <Text style={[styles.skillText]}>
                              {data}
                            </Text>
                            <FontAwesome name="close" size={15} color='rgba(0,0,0,0.5)' />
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                    <></>
                  )}
              </View>
              <View style={styles.skillView}>
                <View style={[styles.formGroup01]}>
                  <View style={styles.formPicker}>
                    <Picker
                      style={{
                        //width: '90%',
                        height: 50,
                        color: '#000',
                        fontFamily: 'Poppins-Regular',
                        borderColor: 'rgba(113,184,95,0.3)',
                        borderWidth: 1,
                      }}
                      selectedValue={this.state.skills}
                      onValueChange={(itemValue, itemIndex) =>
                        //this.setState({ selectedSkills:this.state.selectedSkills.push(itemValue) })
                        this.setState({
                          selectedSkills: [
                            ...this.state.selectedSkills,
                            itemValue,
                          ],
                          skills: this.state.skills.filter(
                            (_, i) => i !== itemIndex,
                          ),
                          updateInitialSearchState: true,
                        })
                      }>
                      {this.state.skills.length > 0 ? (
                        this.state?.skills?.map((data) => {
                          return (
                            <Picker.Item
                              label={data.label}
                              value={data.label}
                            />
                          );
                        })
                      ) : (
                          <></>
                        )}
                    </Picker>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => this.RBSheet.open()}
                    style={{
                      backgroundColor: '#60a84e',
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                      width: 50,
                      marginLeft: 'auto'
                    }}
                  >
                    <MaterialIcons name="filter-list" color="#fff" size={32} />
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>

            <Text style={styles.title}>College Student List</Text>
            <TouchableOpacity style={{ marginTop: -5 }}>
              <ScrollView>
                {this.state.FreelancerSet.map((item, i) => {
                  if (item.message != "No data found") {
                    return (
                      <TouchableOpacity style={{ marginTop: -5 }}
                        key={i}
                        onPress={() => this.props.navigation.navigate('ViewUserProfileScreen', { username: item.slug })}>
                        <View style={CommonStyles.container}>
                          <View style={styles.subjectWrapper}>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={[styles.leftSection]}>
                                <Image
                                  source={{ uri: item.user_image }}
                                  style={styles.userImg}
                                />
                              </View>
                              <View style={styles.rightSection}>
                                <Text style={styles.boxTitle}>{item.name}</Text>
                              </View>
                            </View>
                            <View style={[styles.flexstyle, styles.timeAgo, { marginTop: 10 }]}>
                              <FontAwesome
                                name="graduation-cap"
                                color="#71b85f"
                                size={15}
                                style={{ width: '8%', marginTop: 2 }}
                              />
                              <Text style={styles.iconText}>Institute :</Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins-Regular',
                                  width: '72%',
                                  paddingLeft: 10,
                                  color: '#000'
                                }}>
                                {item.institute}
                              </Text>
                            </View>
                            <View style={[styles.flexstyle, styles.timeAgo]}>
                              <FontAwesome
                                name="institution"
                                color="#71b85f"
                                size={15}
                                style={{ width: '8%', marginTop: 2 }}
                              />
                              <Text style={styles.iconText}>Prefered :</Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins-Regular',
                                  width: '72%',
                                  paddingLeft: 10,
                                  color: '#000'
                                }}
                                numberOfLines={3}
                                ellipsizeMode="tail">
                                {item.prefferedskill}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.flexstyle,
                                styles.timeAgo,
                                // { marginLeft: -5, marginTop: -5 },
                              ]}>
                              <Entypo
                                name="location-pin"
                                color="#71b85f"
                                size={20}
                                style={{ width: '8%', marginTop: 2, marginRight: 2 }}
                              />
                              <Text style={styles.iconText}>Location :</Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins-Regular',
                                  width: '72%',
                                  paddingLeft: 10,
                                  color: '#000'
                                }}
                                numberOfLines={3}
                                ellipsizeMode="tail">{item.location}
                              </Text>
                            </View>
                            <View style={styles.btnGrp}>
                              {item.skillset.map((value, i) => (
                                <TouchableOpacity style={styles.subBtn}>
                                  <Text style={styles.btnText}>
                                    {value.skill_name}
                                  </Text>
                                </TouchableOpacity>

                              ))}
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <View style={styles.noData}>
                        <Image source={require('../../../assets/images/resultNotFound.png')} style={{ width: 120, height: 121 }} />
                        <Text style={styles.noDataText}>No Result Found</Text>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </TouchableOpacity>
            <View style={{ marginBottom: 70 }} />
            {/* </View> */}
          </ScrollView>
        </View>
        <View style={{ width: '100%', paddingHorizontal: '5%', height: 90, alignItems: 'flex-end', justifyContent: 'center', position: 'absolute', bottom: 0 }}>
          <TouchableOpacity
            onPress={() => this.RBSheet.open()}
            style={styles.filterSec2}>
            <AntDesign name="filter" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={250}
          openDuration={600}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <View>
            <View style={styles.wrap}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.flexRow, styles.underline]}>
                  <Text style={styles.head}>Filters</Text>
                  <Pressable onPress={() => this.ResetEmployees()}>
                    <Text style={styles.resetAll}>Reset All</Text>
                  </Pressable>
                </View>

                <Collapse onToggle={this.handleCollapseCategory}>
                  <CollapseHeader>
                    <View style={[styles.flexRow, styles.height50]}>
                      <Text style={styles.head}>Category</Text>
                      {this.state.collapsedCategory == false ? (
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          color="#71b85f"
                          size={30}
                        />
                      ) : (
                          <MaterialIcons
                            name="keyboard-arrow-up"
                            color="#71b85f"
                            size={30}
                          />
                        )}
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    {this.state.CategoryList.map((value, index) => {
                      return (
                        <Pressable
                          key={index}
                          style={styles.filterOptnBtn}
                          onPress={() => this.selectFilterCategory(value.label, value.value)}>
                          <Text
                            style={[
                              styles.filterOptn,
                              this.state.isActiveIndex === value.value
                                ? styles.filterOptnSlct
                                : '',
                            ]}>
                            {value.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </CollapseBody>
                </Collapse>

                <Collapse onToggle={this.handleCollapseSort}>
                  <CollapseHeader>
                    <View style={[styles.flexRow, styles.height50]}>
                      <Text style={styles.head}>Sort By</Text>
                      {this.state.collapsedSort == false ? (
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          color="#71b85f"
                          size={30}
                        />
                      ) : (
                          <MaterialIcons
                            name="keyboard-arrow-up"
                            color="#71b85f"
                            size={30}
                          />
                        )}
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <Pressable style={styles.filterOptnBtnSlct}>
                      <CheckBox
                        center
                        title="Latest"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-thin"
                        checkedColor="#71b85f"
                        containerStyle={styles.radio}
                        textStyle={{ color: '#000', fontSize: 18 }}
                        checked={selectedValue === 'latest'}
                        onPress={() => this.selectSortBy()}
                      />
                    </Pressable>
                  </CollapseBody>
                </Collapse>

                <Collapse onToggle={this.handleCollapseCountry}>
                  <CollapseHeader>
                    <View style={[styles.flexRow, styles.height50]}>
                      <Text style={styles.head}>Country</Text>
                      {this.state.collapsedCountry == false ? (
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          color="#71b85f"
                          size={30}
                        />
                      ) : (
                          <MaterialIcons
                            name="keyboard-arrow-up"
                            color="#71b85f"
                            size={30}
                          />
                        )}
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <Pressable style={styles.filterOptnBtnSlct}>
                      <CheckBox
                        center
                        title="All"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-thin"
                        checkedColor="#71b85f"
                        containerStyle={styles.radio}
                        textStyle={{ color: '#000', fontSize: 18 }}
                        checked={selectedCountry === 'all'}
                        onPress={() => this.selectCountry('All')}
                      />
                      <CheckBox
                        center
                        title="India"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-thin"
                        checkedColor="#71b85f"
                        containerStyle={styles.radio}
                        textStyle={{ color: '#000', fontSize: 18 }}
                        checked={selectedCountry === 'india'}
                        onPress={() => this.selectCountry('India')}
                      />
                      <CheckBox
                        center
                        title="USA"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-thin"
                        checkedColor="#71b85f"
                        containerStyle={styles.radio}
                        textStyle={{ color: '#000', fontSize: 18 }}
                        checked={selectedCountry === 'usa'}
                        onPress={() => this.selectCountry('USA')}
                      />
                    </Pressable>
                  </CollapseBody>
                </Collapse>
              </ScrollView>
            </View>
          </View>
        </RBSheet>
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
    //fetchCartData: () => dispatch(fetchCartData()),
    //updateStoreId: (id) => dispatch(updateStoreId(id)),
    //showLoader: (text) => dispatch(showLoader(text)),
    // hideLoader: () => dispatch(hideLoader()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(SearchClgStu));
