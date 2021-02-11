import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import ApiUrl from '../../config/ApiUrl';
import {makePostRequestMultipart} from '../../services/http-connectors';
import base64 from 'base-64';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

class NewPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],
      showLoader: false,
    };
  }
  componentDidMount = () => {
    // const { navigation } = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   this.FetchOverview();
    // });
    this.FetchOverview();
  };

  FetchOverview = async () => {
    console.log('called');

    this.setState({showLoader: true});

    let body = new FormData();

    //mandatory for fetch
    body.append('id', this.props.userDeatailResponse.row_id);
    body.append(
      'user_id',
      base64.decode(this.props.userDeatailResponse.user_id),
    );

    //For Edit Intro
    body.append('first_name', '');
    body.append('last_name', '');
    body.append('category', '');
    body.append('skills', '');
    body.append('socialurls', '');

    //for Job
    body.append('experience_id', '');
    body.append('experience', '');
    body.append('description', '');
    body.append('projecturl', '');
    body.append('professionalurls', '');
    body.append('employment_type', '');
    body.append('willing_to_relocate', '');
    body.append('country', '');
    body.append('city', '');
    body.append('resumefile', '');
    body.append('videoresume', '');

    // For Education
    body.append('department', '');
    body.append('title', '');
    body.append('type', '');
    body.append('location', '');
    body.append('startDate', '');
    body.append('endDate', '');
    body.append('community', '');

    //For Portfolio
    body.append('portfolio_id', '');
    body.append('portfolio_name', '');
    body.append('portfolio_des', '');
    body.append('portfolio_category', '');
    body.append('portfolio_link', '');
    body.append('image', '');

    //For Availability
    body.append('date', '');

    let response = await makePostRequestMultipart(
      ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug),
      false,
      body,
    );
    if (response) {
      console.log(response);
      this.setState({
        profiledataset: response[0].portfolio,
        // urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
        showLoader: false,
      });
      this.setState({
        // urlsocial: this.state.urlsocialset.toString().split(" ,").join(", "),
      });
    }
  };

  gotoPortPage = data => {
    this.props.navigation.navigate('AddPortfolioScreen', { portfolioID: "" })
  }

  render() {
    return (
      <View style={styles.portfolio}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Portfolio</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn} onPress={this.gotoPortPage}>
            <AntDesign name="plus" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.newportfolioSec}>
              <View style={styles.imgSec}>
                <Image source={{uri: item.image}} style={CommonStyles.image} />
              </View>
              <View>
                <View style={styles.details}>
                  <Text
                    style={styles.portfolioHdng}
                    onPress={() => Linking.openURL(item.link)}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={styles.portfolioDetails}>
                    {item.description}
                  </Text>
                  <Text style={styles.portfolioWeb}>{item.link}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

// export default NewPortfolio;
const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null)(withNavigation(NewPortfolio));
