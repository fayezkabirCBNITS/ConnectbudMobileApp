import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequestMultipart, makeDeleteRequest } from '../../../services/http-connectors';
import base64 from 'base-64';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ReadMore from 'react-native-read-more-text';

class MyQuestionScreen extends Component {
  constructor() {
    super();
    this.state = {
      questionset: [],
      similarQuestionset: [],
      showLoader: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    this.setState({ showLoader: true });
    const { userData } = this.props;

    let body = new FormData();
    body.append("user_id", base64.decode(userData.user_id));
    body.append("offset", 1);

    let response = await makePostRequestMultipart(ApiUrl.QuestionAnswer, false, body);
    if (response) {
      this.setState({
        questionset: response,
      });
    }

    let body1 = new FormData();
    body1.append("user_id", base64.decode(userData.user_id));
    body1.append("Flag", base64.decode(userData.Flag));
    body1.append("offset", 0)

    let feedresponse = await makePostRequestMultipart(ApiUrl.FeedQuestions, false, body1);
    if (feedresponse) {
      this.setState({
        similarQuestionset: feedresponse,
        showLoader: false
      });
    }
  };

  openAlert(question_id, qus) {
    Alert.alert(
      "Are you sure?",
      "You won't be able to revert this!",
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Ok', onPress: () => this.deleteQuestion(question_id, qus) },
      ]
    );
  }

  deleteQuestion = async (question_id, qus) => {

    let body = new FormData();
    body.append("question_id", question_id);

    let response = await makeDeleteRequest(ApiUrl.FetchQuestion + qus
      .split(" ")
      .join("_")
      .replace("'", "`")
      .replace("?", "~")
      .replace("?", "~"), false, body);
    if (response) {
      alert("Question is deleted!");
      this.componentDidMount();
    }
  };

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read less
      </Text>
    );
  }

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          {/* header section */}
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
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
              }
              style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#000" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <Text style={styles.heading}>Your Questions</Text>
              <View>
                {this.state.questionset.map((value, index) => {
                  if (value.Token !== "N") {
                    return (
                      <Collapse style={styles.collapse} key={index}>
                        <CollapseHeader>
                          <View style={styles.questions}>
                            <Text style={styles.questionsText}>
                              {value.question}
                            </Text>
                            <TouchableOpacity onPress={() => this.openAlert(value.question_id, value.question)}>
                              <AntDesign name="delete" size={25} color="#fff" />
                            </TouchableOpacity>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          {value.answers.map((item, index) => {
                            return (
                              <View style={styles.questionsWrap}>
                                <View style={styles.questionsMain}>
                                  <View style={styles.imgSec}>
                                    <Image
                                      source={{ uri: item.user_image }}
                                      style={CommonStyles.image}
                                    />
                                  </View>
                                  <View style={styles.answerSec}>
                                    <Text style={styles.userName}>{value.name}</Text>
                                    <Text style={styles.answer}>{item.answer}</Text>
                                  </View>
                                </View>
                              </View>
                            )
                          })}
                        </CollapseBody>
                      </Collapse>
                    );
                  }
                  else {
                    return (
                      <View style={styles.noDataImg}>
                        <Image source={require('../../../assets/images/noData.png')} />
                        <Text style={styles.noDataImgText}>No Data Found</Text>
                      </View>
                    );
                  }
                })}
              </View>

              {this.state.questionset.map((obj, index) => {
                if (obj.Token !== "N") {
                  return (
                    <View style={styles.similarQ}>
                      <Text style={styles.heading2}>Similar Questions</Text>
                      <View>
                        {this.state.similarQuestionset.map((value, index) => {
                          if (index < 5) {
                            return (
                              <Collapse style={styles.collapse}>
                                <CollapseHeader>
                                  <View style={styles.questions}>
                                    <Text style={styles.questionsText}>
                                      {value.question}
                                    </Text>
                                  </View>
                                </CollapseHeader>
                                <CollapseBody>
                                  {value.answers.map((item, index) => {
                                    return (
                                      <View style={styles.questionsWrap}>
                                        <View style={styles.questionsMain}>
                                          <View style={styles.imgSec}>
                                            <Image
                                              source={{ uri: item.user_image }}
                                              style={CommonStyles.image}
                                            />
                                          </View>
                                          <View style={styles.answerSec}>
                                            <Text style={styles.userName}>{item.name}</Text>
                                            <ReadMore
                                              numberOfLines={3}
                                              renderTruncatedFooter={this._renderTruncatedFooter}
                                              renderRevealedFooter={this._renderRevealedFooter}
                                            >
                                              <Text style={styles.answer}>{item.answer}</Text>
                                            </ReadMore>
                                          </View>
                                        </View>
                                      </View>
                                    );
                                  })}
                                </CollapseBody>
                              </Collapse>
                            );
                          }
                        })}
                      </View>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps, null)(MyQuestionScreen);
