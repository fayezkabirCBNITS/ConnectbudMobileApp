import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import styles from './style';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ApiUrl from '../../config/ApiUrl';
import { makePostRequestMultipart } from '../../services/http-connectors';
import { WebView } from 'react-native-webview';
import PortfolioExperience from '../../components/PortfolioExperience'
import { withNavigation } from 'react-navigation';
import { connect } from "react-redux";
import base64 from 'base-64';
import { BASE_URL } from "../../config/ApiUrl";
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';


class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledataset: [],
      showLoader: false,
      showModal: false
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.FetchPortfolio();
    });
    this.FetchPortfolio();
  };

  FetchPortfolio = async () => {

    this.setState({ showLoader: true });

    let body = new FormData();

    //mandatory for fetch
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
    body.append("resumefile", "");
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

    let response = await makePostRequestMultipart(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body);
    if (response) {
      this.setState({
        profiledataset: response,
        showLoader: false
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

  viewModal = (text, flag) => (
    <Modal transparent={true} isVisible={true}>
      <View style={CommonStyles.modalBg}>
        <View style={CommonStyles.modalContent}>
          <Text style={CommonStyles.modalText}>Uploaded Succesfully !</Text>
          <TouchableOpacity style={CommonStyles.modalCross} onPress={() => this.setState({ showModal: false })}>
            <Entypo name="circle-with-cross" color="#71b85f" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  gotoPortPage = data => {
    this.props.navigation.navigate('AddPortfolioScreen', { portfolioID: "" })
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spinner
          visible={this.state.showLoader}
          animation="fade"
          textContent={'Loading...'}
        />
        {this.state.showModal ? this.viewModal() : <></>}

        <View style={CommonStyles.container}>
          <View style={styles.portHeading}>
            <Text style={styles.portfolioHead}>Portfolio</Text>
            <TouchableOpacity onPress={this.gotoPortPage}>
              <Text style={styles.addPortfolio}>+ Add Portfolio</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.profiledataset.length > 0 ?
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {this.state.profiledataset.map((item, i) => (
              <>
                {item.portfolio.map((value, i) => (
                  <View key={i} style={styles.portfolioSec}>
                    <View style={styles.portImgSec}>
                      <Image
                        source={{ uri: value.image }}
                        style={CommonStyles.image}
                      />
                      <View style={styles.portSecName}>
                        <Text
                          style={styles.portSecNameText}
                          onPress={() => Linking.openURL(value.link)}>
                          {value.title}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.portDetails}>
                      <View style={{ width: '60%' }}>
                        <Text style={styles.portDetailsSlo}>
                          {value.category}
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.editBtn} onPress={() => this.props.navigation.navigate('AddPortfolioScreen', { portfolioID: value.id })}>
                        <MaterialIcons name="mode-edit" color="#fff" size={18} />
                        <Text style={styles.editBtnText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            ))}
          </ScrollView>
          : <Text style={{ alignSelf: 'center' }}>No Data</Text>
        }

        <PortfolioExperience />

        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Uploaded Documents</Text>
            <TouchableOpacity onPress={(data) => this.handleAddNewDocument()}>
              <Text style={styles.addPortfolio}>+ Add Document</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.profiledataset.length > 0 ? this.state.profiledataset.map((item, i) => (
          <>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal key={i}>
              {item.resumefile.map((value, i) => (
                <View key={i} style={styles.portDocSec}>
                  <TouchableOpacity style={styles.portDocImgSec}
                    onPress={() => Linking.openURL(value.resumefile)}>
                    {
                      <Text style={styles.fileLinkText}>
                        {value.resumefile.includes(".pdf") === true ?
                          <FontAwesome name="file-pdf-o" size={55} color="#71b85f" />
                          :
                          <FontAwesome name="file-word-o" size={55} color="#71b85f" />
                        }
                        {/* <WebView
                          originWhitelist={['*']}
                          source={{ html: 'http://docs.google.com/gview?embedded=true&url=https://api.connectbud.com/media/Biswanath%20Singh%20CBNITS.docx' }}
                          view={value.resumefile}
                          style={{ marginTop: 20 }}
                        /> */}
                      </Text>
                    }
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </>
        )) : <Text style={{ alignSelf: 'center' }}>No Data</Text>
        }

        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Uploaded Videos</Text>
            {/* <TouchableOpacity
              onPress={() =>
                launchImageLibrary({ mediaType: 'video' }, (response) => {
                  console.log(response);
                })}
            >
              <Text style={styles.addPortfolio}>+ Add Video</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {this.state.profiledataset.length > 0 ? this.state.profiledataset.map((item, i) => (
          <>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal key={i}>
              {item.videoresume.map((value, index) => {
                if (value.videoresume !== "" &&
                  value.videoresume !== "NULL"
                ) {
                  return (
                    <View key={i} style={[styles.portDocSec, { marginBottom: 30 }]}>
                      <TouchableOpacity style={styles.portDocImgSec}
                        onPress={() => Linking.openURL(value.videoresume)}>
                        {
                          <Text style={styles.fileLinkText}>
                            {value.videoresume.includes("https://www.youtube.com/") === true ?
                              <FontAwesome name="youtube-play" size={55} color='#F44336' />
                              :
                              <FontAwesome name="file-video-o" size={55} color="#71b85f" />
                            }
                          </Text>
                        }
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  return (
                    <></>
                  );
                }
              })}
              {/* <View style={{ marginBottom: 100, }}>
              <WebView
                originWhitelist={['*']}
                source={{
                  html:
                    'http://docs.google.com/gview?embedded=true&url=https://api.connectbud.com/media/Biswanath%20Singh%20CBNITS.docx',
                }}
                style={{ marginTop: 20 }}
              />
            </View> */}
            </ScrollView>
          </>
        )) : <Text style={{ alignSelf: 'center' }}>No Data</Text>
        }
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null,)(withNavigation(Portfolio));
