import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {API_URL} from '../../../config/url';
import Spinner from 'react-native-loading-spinner-overlay';
import {makePostRequestMultipart} from '../../../services/http-connectors';
import SyncStorage from 'sync-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';

import {updateJobId} from '../../../redux/actions/user-data';
import {connect} from 'react-redux';

class ChatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStatus: this.props.navigation.state.params
        ? this.props.navigation.state.params.page_status
        : '',
      job_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.job_id
        : '',
      receiver_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.receiver_id
        : '',
      sender_id: this.props.navigation.state.params
        ? this.props.navigation.state.params.sender_id
        : '',
      name: this.props.navigation.state.params
        ? this.props.navigation.state.params.name
        : '',
      user_image: this.props.navigation.state.params
        ? this.props.navigation.state.params.user_image
        : '',
      user_type: this.props.navigation.state.params
        ? this.props.navigation.state.params.user_type
        : '',
      token: this.props.navigation.state.params
        ? this.props.navigation.state.params.token
        : '',
      room_id: '',
      showLoader: false,
      chatMessage: [],
      request_type: '',
      request_status: '',
      chatContent: '',
      file: '',
      proposed_amount: '0',
      ProjectType:'',
    };
    const room_id = SyncStorage.get('room_id');
    let webSocketConnection = `wss://kt9fns6g34.execute-api.us-west-1.amazonaws.com/Prod?user=${room_id}`;
    this.socket = new WebSocket(webSocketConnection);
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    console.log(this.state.user_type);
    this.chatFullDetails();
  }

  chatFullDetails = () => {
    this.setState({showLoader: true});
    let body = new FormData();
    body.append('sender_id', this.state.sender_id);
    body.append('login_userid', this.state.sender_id);
    body.append('receiver_id', this.state.receiver_id);
    body.append('job_id', this.state.job_id);
    if (this.state.pageStatus === 'projectlist') {
      body.append('type', 'freelancer');
    } else {
      body.append('type', 'recruiter');
    }

    console.log(body);

    axios({
      url: API_URL + 'chat/getChat',
      method: 'POST',
      data: body,
    })
      .then((response) => {
        this.setState({showLoader: false});
        this.setState({
          chatMessage: response.data,
          request_type: response.data[0].request_type,
          request_status: response.data[0].request_status,
          room_id: this.state.job_id + '_' + this.state.sender_id,
          proposed_amount: response.data[0].proposed_amount,
          ProjectType: response.data[0].detail_type,
        });
        console.log(this.state.chatMessage);
        setTimeout(() => {
          if (this.refs && this.refs.scrollView) {
            this.refs.scrollView.scrollToEnd(true);
          }
        }, 400);
      })
      .catch((error) => {
        this.setState({showLoader: false});
      });
  };
  usercommentSubmit = async () => {
    let formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('sender_id', +this.state.sender_id);
    formData.append('receiver_id', this.state.receiver_id);
    formData.append('message', this.state.chatContent);
    formData.append('job_id', this.state.job_id);
    formData.append('job_type', 'freelancer');
    let response = await makePostRequestMultipart(
      'chat/startChat',
      false,
      formData,
    );
  };

  chatUpdate = () => {
    this.usercommentSubmit();
    this.sendMessage();
  };

  sendMessage = async () => {
    const room_id = SyncStorage.get('room_id');
    // Start
    if (this.state.chatContent != '') {
      var payload = {
        action: 'sendmessage',
        data: this.state.chatContent,
        source: this.state.sender_id,
        to_user: room_id,
      };
      this.socket.send(JSON.stringify(payload));

      console.log(payload);

      var temp = new Date();
      var time = temp
        .toUTCString('en-US', {timeZone: 'GMT'})
        .split(' ')[4]
        .slice(0, 5);

      var data = {
        chatContent: this.state.chatContent,
        chatDate: 'Today',
        chatTime: time + ' ' + 'UTC',
        receiver_image:
          'https://api-prod.connectbud.com/media/default_profile_pic.png',
        sender_id: this.state.sender_id,
      };
      let tempData = this.state.chatMessage;
      tempData.push(data);
      this.setState({
        chatMessage: tempData,
        chatContent: '',
      });
      setTimeout(() => {
        if (this.refs && this.refs.scrollView) {
          this.refs.scrollView.scrollToEnd(true);
        }
      }, 400);
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.chatMessage != this.state.chatMessage) {
      console.log(this.state.room_id);
      let webSocketConnection = `wss://kt9fns6g34.execute-api.us-west-1.amazonaws.com/Prod?user=${this.state.room_id}`;
      const socket = new WebSocket(webSocketConnection);

      let msgdata = '';
      let Id = '';
      socket.onmessage = (message) => {
        msgdata = message.data;
        this.setState({
          senderMsg: msgdata,
        });
        //Id = message.currentTarget.url.split("=")[1];
        if (this.state.lastMsg != this.state.senderMsg) {
          this.setState({
            lastMsg: this.state.senderMsg,
          });
          var data = {
            chatContent: msgdata,
            receiver_image: this.state.recImage,
            sender_id: this.state.receiver_id,
          };
          let tempData = this.state.chatMessage;
          tempData.push(data);
          this.setState({
            chatMessage: tempData,
          });
          setTimeout(() => {
            if (this.refs && this.refs.scrollView) {
              this.refs.scrollView.scrollToEnd(true);
            }
          }, 400);
        } else {
          this.chatFullDetails();
        }
      };
    }
    //this.scrollToBottom();
  }

  hireStudent = () => {
    console.log(this.state.token);
    this.RBSheet.close(),
      this.props.navigation.navigate('HireStudentsScreen', {
        proposed_amount: this.state.proposed_amount,
        job_id: this.state.job_id,
        token: this.state.token,
        receiver_id: this.state.receiver_id,
      });
  };
  viewProposal = () => {
    this.RBSheet.close(),
    this.props.navigation.navigate('ProposalFromFreelancer', {
      job_id: this.state.job_id,
      receiver_id: this.state.receiver_id,
    });
  }

  PageNav = async () => {
    // await AsyncStorage.setItem('ProjectJobId' , JobId);
    // this.props.navigateToDetails();
    console.log(this.state.ProjectType);
    if(this.state.ProjectType === "normal"){
    this.props.navigation.navigate('ProjectDetailsFreelancer', {
      page_status: 'invitation',
    });
  }
    else if(this.state.ProjectType === "tutor"){
      this.props.navigation.navigate('TutorDetailsFreelancer', {
        page_status: 'invitation',
      });
    }
    else{
      this.props.navigation.navigate('JobDetailsFreelancer', {
        page_status: 'invitation',
      });
    }
    console.log(this.state.job_id);
    this.props.updateJobId(this.state.job_id);
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <Spinner
            visible={this.state.showLoader}
            animation="fade"
            textContent={'Loading...'}
          />
          <StatusBar />
          {/* header section */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color="#fff"
              />
            </TouchableOpacity>
            <View style={styles.headerImgSec}>
              <Image
                source={{uri: this.state.user_image}}
                style={CommonStyles.image}
              />
            </View>

            <Text style={styles.chatUserName}>{this.state.name}</Text>
            {/* {this.state.request_type === "proposal" && this.state.user_type === "Rg==" ?
            (<TouchableOpacity style={styles.editBtn} onPress={()=>this.props.navigation.navigate(
                        'ProposalFromFreelancer'
                      )}>
                  <Text style={styles.editBtnText}>Proposal</Text>
                </TouchableOpacity>): null} */}

            {this.state.request_type === 'invitation' &&
            this.state.user_type === 'WQ==' ? (
              <TouchableOpacity
                onPress={() => this.RBSSheet.open()}
                style={styles.menuVertical}>
                <Fontisto name="more-v-a" size={25} color="#fff" />
              </TouchableOpacity>
            ) : null}

            <RBSheet
              ref={(ref) => {
                this.RBSSheet = ref;
              }}
              height={170}
              openDuration={600}
              customStyles={{
                container: {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}>
              <View style={styles.btmSheet}>
                {this.state.request_type === 'invitation' &&
                this.state.user_type === 'WQ==' ? (
                  <TouchableOpacity
                    onPress={() => this.PageNav()}
                    style={styles.loginBtn2}>
                    <Text style={styles.loginBtnText2}>View Proposal</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </RBSheet>

            {this.state.request_type === 'proposal' &&
            this.state.user_type === 'Rg==' ? (
              <TouchableOpacity
                onPress={() => this.RBSheet.open()}
                style={styles.menuVertical}>
                <Fontisto name="more-v-a" size={25} color="#fff" />
              </TouchableOpacity>
            ) : null}
          </View>

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={170}
            openDuration={600}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <View style={styles.btmSheet}>
              {this.state.pageStatus === 'joblist' &&
              this.state.user_type === 'Rg==' ? (
                <></>
              ) : (
                <TouchableOpacity
                  onPress={this.hireStudent}
                  style={styles.loginBtn}>
                  <Text style={styles.loginBtnText2}>Hire Student</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={this.viewProposal}
                style={styles.loginBtn2}>
                <Text style={styles.loginBtnText2}>View Proposal</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>

          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            contentContainerStyle={styles.keyboard}
            scrollEnabled={false}>
            <ScrollView ref="scrollView" showsVerticalScrollIndicator={false}>
              <View style={CommonStyles.container}>
                <View>
                  {this.state.chatMessage.map((data) =>
                    data.sender_id == this.state.sender_id ? (
                      <View style={styles.send}>
                        <View style={styles.sndChat}>
                          <Text style={styles.sndChatText}>
                            {data.chatContent}
                          </Text>
                          <Text style={styles.sndDate}>
                            {data.chatDate} {data.chatTime}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.receive}>
                        <View style={styles.userImgR}>
                          <Image
                            source={{uri: data.receiver_image}}
                            style={CommonStyles.image}
                          />
                        </View>
                        <View style={styles.revChat}>
                          <Text style={styles.revChatText}>
                            {data.chatContent}
                          </Text>
                          <Text style={styles.revDate}>
                            {data.chatDate} {data.chatTime}
                          </Text>
                        </View>
                      </View>
                    ),
                  )}
                </View>
              </View>
            </ScrollView>

            <View style={styles.chatInputSec}>
            {this.state.chatMessage.map((item, index) => {
              if (item.request_status != "pending" && item.request_status != "blocked") {
                if (index < 1) {
                return (
                  <View style={styles.inputHead}>
                    <TextInput
                      onChangeText={(text) => {
                        this.setState({chatContent: text});
                      }}
                      value={this.state.chatContent}
                      placeholder="Type a message"
                      style={[styles.input, {color: '#000000'}]}
                    />
                    {this.state.chatContent != '' ? (
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={this.chatUpdate}>
                        <FontAwesome name="send" color="#fff" size={18} />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                );}
                } else if (item.request_type == "invitation" && item.request_status == "pending") {
                  if (index < 1)
                    return (
                      this.state.user_type === 'Rg==' ? (
                        <Text style={{paddingLeft: 15}}>You can't chat until the student send you proposal and you accept it</Text>
                      ) : (
                        <Text style={{paddingLeft: 15}}>You can't chat until you accept the proposal</Text>
                          )
                    );
                  } else if (item.request_type === "proposal" && item.request_status == "pending") {
                    if (index < 1)
                      return (
                        this.state.user_type === 'Rg==' ? (
                          <Text style={{paddingLeft: 15}}>You can't chat until you accept the proposal</Text>
                        ) : (
                          <Text style={{paddingLeft: 15}}>You can't chat until the employer accepts the proposal</Text>
                            )
                      );
                  } else {
                      return (
                        this.state.user_type === 'Rg==' ? (
                          <Text style={{paddingLeft: 15}}>You can't chat anymore</Text>
                        ) : (
                          <Text style={{paddingLeft: 15}}>Employer has hired someone else for this project</Text>
                            )
                      );
                    }
                })}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //storeAccessToken: (token) => dispatch(storeAccessToken(token)),
    //updateUserStatus: (status) => dispatch(updateUserStatus(status)),
    updateJobId: (data) => dispatch(updateJobId(data)),
    //updateUserPaymentMethod: (data) => dispatch(updateUserPaymentMethod(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);

// export default ChatListScreen;
