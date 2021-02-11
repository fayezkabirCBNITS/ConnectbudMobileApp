import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Linking} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import ApiUrl from '../../config/ApiUrl';
import {makePostRequestMultipart} from '../../services/http-connectors';
import base64 from 'base-64';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';


class UpdateDocument extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: []
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
        profiledataset: response[0].resumefile,
        // urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
        showLoader: false,
      });
      this.setState({
        // urlsocial: this.state.urlsocialset.toString().split(" ,").join(", "),
      });
    }
  };

  cvhandleSubmit = async (url) => {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };
    let body = new FormData();

    body.append("id", this.props.userDeatailResponse.row_id);
    body.append("user_id", base64.decode(this.props.userDeatailResponse.user_id));

    //For Edit Intro
    body.append("first_name", "");
    body.append("last_name", "");
    body.append("category", "");
    body.append("skills", "");
    body.append("socialurls", "");

    //for Job
    body.append("experience_id", "");
    body.append("experience", "");
    body.append("description", "");
    body.append("projecturl", "");
    body.append("professionalurls", "");
    body.append("employment_type", "");
    body.append("willing_to_relocate", "");
    body.append("country", "");
    body.append("city", "");
    body.append("resumefile", url);
    body.append("videoresume", "");

    // For Education
    body.append("department", "");
    body.append("title", "");
    body.append("type", "");
    body.append("location", "");
    body.append("startDate", "");
    body.append("endDate", "");
    body.append("community", "");

    //For Portfolio
    body.append("portfolio_id", "");
    body.append("portfolio_name", "");
    body.append("portfolio_des", "");
    body.append("portfolio_category", "");
    body.append("portfolio_link", "");
    body.append("image", "");
    body.append("device", "mobile");

    //For Availability
    body.append("date", "");

    let response = await makePostRequestMultipart(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body, { headers: headers });
    if (response) {
      this.setState({ showModal: true });
    }
  }

  handleAddNewDocument = async data => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (res.size < 2000000 && res.type === "application/pdf" || res.type === "application/msword") {
        this.cvhandleSubmit({ uri: res.uri, type: res.type, name: res.name });
      } else {
        alert('Size should be less than 2Mb')
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        Alert("add document failed ! please try later")
      } else {
        throw err;
      }
    }
  }

  render() {
    return (
      <View style={styles.updateDocument}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Update Document</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn} onPress={(data) => this.handleAddNewDocument()}>
            <AntDesign name="plus" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.profiledataset.map((value,i)=>(
            <TouchableOpacity style={styles.newDocumentSec}
            onPress={() => Linking.openURL(value.resumefile)}>
                <AntDesign name="pdffile1" color="#e95340" size={50} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

// export default UpdateDocument;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null)(withNavigation(UpdateDocument));
