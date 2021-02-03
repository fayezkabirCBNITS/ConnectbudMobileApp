import React, {Component} from 'react';
import {View, Text, Pressable} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import {CheckBox} from 'react-native-elements';
import ApiUrl from '../../config/ApiUrl';
import {
  makePostRequestMultipart,
  makeGetRequest,
} from '../../services/http-connectors';
import {connect} from 'react-redux';
import base64 from 'base-64';

class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CategoryList: [],
      tutorexpertset: [],
      projectexpertset: [],
      jobexpertset: [],
      Category: '',
      Relevant: '',
      Latest: '',
      Low: '',
      High: '',
      isActiveIndex: '',
      value: '',
      jobType: '',
      selectedValue: '',
      selectedCountry: '',
      jobselectedType: '',
      collapsedCategory: false,
      collapsedSort: false,
      collapsedCountry: false,
      collapsedJobType: false,
      lodarStatus: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  AllCategory = async () => {
    if (this.props.ActiveTab == 0) {
      let response = await makeGetRequest(ApiUrl.FetchTutorCategory, false, '');
      this.setState({
        CategoryList: response,
      });
    } else {
      let response = await makeGetRequest(
        ApiUrl.FetchProjectCategory,
        false,
        '',
      );
      this.setState({
        CategoryList: response,
      });
    }
  };

  componentDidMount() {
    this.AllCategory();
  }

  FilterProjects = async () => {
    const {userDeatailResponse} = this.props;
    this.setState({lodarStatus: true});
    let filterdata = {
      search_type: 'filter',
      category: this.state.Category,
      relevant: this.state.Relevant,
      latest: this.state.Latest,
      low_price: this.state.Low,
      high_price: this.state.High,
      country: this.state.value,
    };
    let body = new FormData();

    body.append('search_type', 'filter');
    body.append('category', this.state.Category);
    body.append('relevant', this.state.Relevant);
    body.append('latest', this.state.Latest);
    body.append('low_price', this.state.Low);
    body.append('high_price', this.state.High);
    if (this.props.ActiveTab == 0) {
      body.append('type', 'tutor');
      body.append('country', this.state.value);
    } else if (this.props.ActiveTab == 1) {
      body.append('type', 'freelancer');
      body.append('country', this.state.value);
    } else {
      body.append('type', 'recruiter');
      body.append('job_type', this.state.jobType);
      body.append('job_location', this.state.value);
      body.append('skills', '');
    }
    body.append('user_id', base64.decode(userDeatailResponse.userData.user_id));
    body.append('offset', '30');

    let response = await makePostRequestMultipart(
      ApiUrl.JobSummary,
      false,
      body,
    );
    if (response) {
      if (this.props.ActiveTab === 0) {
        this.setState({
          tutorexpertset: response.sort(function (a, b) {
            if (a.avg_rating > b.avg_rating) return -1;
            else if (a.avg_rating > b.avg_rating) return 1;
            return 0;
          }),

          lodarStatus: false,
        });
        this.props.filterData(filterdata);
        this.props.TutorHideModal(this.state.tutorexpertset);
        this.props.ChildSkillset(this.state.childSkills);
        this.props.Skills(this.state.childSkills);
      } else if (this.props.ActiveTab === 1) {
        this.setState({
          projectexpertset: response.sort(function (a, b) {
            if (a.avg_rating > b.avg_rating) return -1;
            else if (a.avg_rating > b.avg_rating) return 1;
            return 0;
          }),
          
          lodarStatus: false,
        });
        this.props.filterData(filterdata);
        this.props.TutorHideModal(this.state.projectexpertset);
        this.props.ChildSkillset(this.state.childSkills);
        this.props.Skills(this.state.childSkills);
      } else {
        this.setState({
          jobexpertset: response.sort(function (a, b) {
            if (a.avg_rating > b.avg_rating) return -1;
            else if (a.avg_rating > b.avg_rating) return 1;
            return 0;
          }),
          lodarStatus: false,
        });
        this.props.filterData(filterdata);
        this.props.TutorHideModal(this.state.jobexpertset);
        this.props.ChildSkillset(this.state.childSkills);
        this.props.Skills(this.state.childSkills);
      }
     
    } else {
      this.setState({lodarStatus: false});
    }
  };

  ResetFilterProjects = async () => {
    const {userDeatailResponse} = this.props;
    this.setState({
      // CategoryList: [],
      lodarStatus: true,
      tutorexpertset: [],
      Category: '',
      Relevant: '',
      Latest: '',
      Low: '',
      High: '',
      isActiveIndex: '',
      value: '',
      jobType: '',
      selectedValue: '',
      selectedCountry: '',
      jobselectedType: '',
    });
    let body = new FormData();

    body.append('search_type', 'all');
    if (this.props.ActiveTab == 0) {
      body.append('type', 'tutor');
    } else if (this.props.ActiveTab == 1) {
      body.append('type', 'freelancer');
    } else {
      body.append('type', 'recruiter');
    }
    body.append('offset', '0');
    body.append('user_id', base64.decode(userDeatailResponse.userData.user_id));

    let response = await makePostRequestMultipart(
      ApiUrl.JobSummary,
      false,
      body,
    );
    if (response) {
      this.setState({
        lodarStatus: false,
      });
      let body = new FormData();
      body.append('category_id', '');
      body.append('page_type', 'others');

      let response1 = await makePostRequestMultipart(
        ApiUrl.CategorySubmit,
        false,
        body,
      );
      if (response1) {
        this.setState({
          childSkills: response1,
        });
      }

      this.setState({
        tutorexpertset: response.sort(function (a, b) {
          if (a.avg_rating > b.avg_rating) return -1;
          else if (a.avg_rating > b.avg_rating) return 1;
          return 0;
        }),
        isActiveIndex: '',
        selectedValue: '',
        selectedCountry: '',
        jobselectedType: '',
      });
      this.props.TutorHideModal(this.state.tutorexpertset);
      this.props.ChildSkillset(this.state.childSkills);
      this.props.Skills(this.state.childSkills);
    } else {
      this.setState({lodarStatus: false});
    }
  };

  SendLabel = async (label, id) => {
    await this.setState({
      Category: label,
      isActiveIndex: id,
    });

    let body = new FormData();
    body.append('category_id', id);
    body.append('page_type', 'others');

    let response = await makePostRequestMultipart(
      ApiUrl.CategorySubmit,
      false,
      body,
    );
    if (response) {
      this.setState({
        childSkills: response,
      });
    }
    this.FilterProjects();
  };

  Sort = async (value) => {
    if (value === 'relevant') {
      await this.setState({
        Relevant: 'yes',
        Latest: '',
        Low: '',
        High: '',
        selectedValue: 'relevant',
      });
    } else if (value === 'latest') {
      await this.setState({
        Relevant: '',
        Latest: 'yes',
        Low: '',
        High: '',
        selectedValue: 'latest',
      });
    } else if (value === 'low') {
      await this.setState({
        Relevant: '',
        Latest: '',
        Low: 'yes',
        High: '',
        selectedValue: 'low',
      });
    } else {
      await this.setState({
        Relevant: '',
        Latest: '',
        Low: '',
        High: 'yes',
        selectedValue: 'high',
      });
    }
    this.FilterProjects();
  };

  countrySort = async (value) => {
    if (value === 'All') {
      await this.setState({
        value: 'All',
        selectedCountry: 'all',
      });
    } else if (value === 'India') {
      await this.setState({
        value: 'India',
        selectedCountry: 'india',
      });
    } else {
      await this.setState({
        value: 'USA',
        selectedCountry: 'usa',
      });
    }
    this.FilterProjects();
  };

  jobSort = async (value) => {
    if (value === 'full') {
      await this.setState({
        jobType: 'full time',
        jobselectedType: 'jobfull',
      });
    } else if (value === 'part') {
      await this.setState({
        jobType: 'part time',
        jobselectedType: 'jobpart',
      });
    } else {
      await this.setState({
        jobType: 'internship',
        jobselectedType: 'jobintern',
      });
    }
    this.FilterProjects();
  };

  handleCollapseCategory = (prevState) => {
    this.setState({collapsedCategory: prevState});
  };

  handleCollapseSort = (prevState) => {
    this.setState({collapsedSort: prevState});
  };

  handleCollapseCountry = (prevState) => {
    this.setState({collapsedCountry: prevState});
  };

  handleCollapseType = (prevState) => {
    this.setState({collapsedJobType: prevState});
  };

  render() {
    const {selectedValue} = this.state;
    const {selectedCountry} = this.state;
    const {jobselectedType} = this.state;
    return (
      <View style={styles.wrap}>
        <Spinner
          visible={this.state.lodarStatus}
          animation="fade"
          textContent={'Loading...'}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.flexRow, styles.underline]}>
            <Text style={styles.head}>Filters</Text>
            <Pressable onPress={this.ResetFilterProjects}>
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
                    onPress={() => this.SendLabel(value.label, value.value)}>
                    <Text
                      style={[
                        styles.filterOptn,
                        this.state.isActiveIndex === value.value
                          ? styles.filterOptnSlct
                          : '',
                      ]}>
                      {value.label}
                    </Text>
                    {/* select option text - style={styles.filterOptnSlct} */}
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
                  title="Most Relevant"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-thin"
                  checkedColor="#71b85f"
                  containerStyle={styles.radio}
                  textStyle={{color: '#000', fontSize: 18}}
                  checked={selectedValue === 'relevant'}
                  onPress={() => this.Sort('relevant')}
                />
                <CheckBox
                  center
                  title="Latest"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-thin"
                  checkedColor="#71b85f"
                  containerStyle={styles.radio}
                  textStyle={{color: '#000', fontSize: 18}}
                  checked={selectedValue === 'latest'}
                  onPress={() => this.Sort('latest')}
                />
                <CheckBox
                  center
                  title="Low - High (Amount)"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-thin"
                  checkedColor="#71b85f"
                  containerStyle={styles.radio}
                  textStyle={{color: '#000', fontSize: 18}}
                  checked={selectedValue === 'low'}
                  onPress={() => this.Sort('low')}
                />
                <CheckBox
                  center
                  title="High - Low (Amount)"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-thin"
                  checkedColor="#71b85f"
                  containerStyle={styles.radio}
                  textStyle={{color: '#000', fontSize: 18}}
                  checked={selectedValue === 'high'}
                  onPress={() => this.Sort('high')}
                />
              </Pressable>
            </CollapseBody>
          </Collapse>

          {this.props.ActiveTab == 2 && (
            <Collapse onToggle={this.handleCollapseType}>
              <CollapseHeader>
                <View style={[styles.flexRow, styles.height50]}>
                  <Text style={styles.head}>Job Type</Text>
                  <Pressable>
                    {this.state.collapsedJobType == false ? (
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
                  </Pressable>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <Pressable style={styles.filterOptnBtnSlct}>
                  <CheckBox
                    center
                    title="Full Time"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-thin"
                    checkedColor="#71b85f"
                    containerStyle={styles.radio}
                    textStyle={{color: '#000', fontSize: 18}}
                    checked={jobselectedType === 'jobfull'}
                    onPress={() => this.jobSort('full')}
                  />
                  <CheckBox
                    center
                    title="Part Time"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-thin"
                    checkedColor="#71b85f"
                    containerStyle={styles.radio}
                    textStyle={{color: '#000', fontSize: 18}}
                    checked={jobselectedType === 'jobpart'}
                    onPress={() => this.jobSort('part')}
                  />
                  <CheckBox
                    center
                    title="Internship"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-thin"
                    checkedColor="#71b85f"
                    containerStyle={styles.radio}
                    textStyle={{color: '#000', fontSize: 18}}
                    checked={jobselectedType === 'jobintern'}
                    onPress={() => this.jobSort('intern')}
                  />
                </Pressable>
              </CollapseBody>
            </Collapse>
          )}

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
                  textStyle={{color: '#000', fontSize: 18}}
                  checked={selectedCountry === 'all'}
                  onPress={() => this.countrySort('All')}
                />
                <CheckBox
                  center
                  title="India"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-thin"
                  checkedColor="#71b85f"
                  containerStyle={styles.radio}
                  textStyle={{color: '#000', fontSize: 18}}
                  checked={selectedCountry === 'india'}
                  onPress={() => this.countrySort('India')}
                />
                <CheckBox
                  center
                  title="USA"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-thin"
                  checkedColor="#71b85f"
                  containerStyle={styles.radio}
                  textStyle={{color: '#000', fontSize: 18}}
                  checked={selectedCountry === 'usa'}
                  onPress={() => this.countrySort('USA')}
                />
              </Pressable>
            </CollapseBody>
          </Collapse>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};
export default connect(mapStateToProps, null)(FilterScreen);
