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
  FlatList,
} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import { API_URL } from "../../../config/url";
import Spinner from 'react-native-loading-spinner-overlay';
import {
  makePostRequestMultipart,
} from '../../../services/http-connectors';

let webSocketConnection = `wss://kt9fns6g34.execute-api.us-west-1.amazonaws.com/Prod?user=750_2298`;
const socket = new WebSocket(webSocketConnection);
class ChatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_id: this.props.navigation.state.params
                ? this.props.navigation.state.params.job_id : '',
      receiver_id: this.props.navigation.state.params
                ? this.props.navigation.state.params.receiver_id : '',
      sender_id: this.props.navigation.state.params
                ? this.props.navigation.state.params.sender_id : '',
      name: this.props.navigation.state.params
                ? this.props.navigation.state.params.name : '',
      user_image: this.props.navigation.state.params
                ? this.props.navigation.state.params.user_image : '',
      user_type: this.props.navigation.state.params
                ? this.props.navigation.state.params.user_type : '',
      room_id:     '',                         
      showLoader:false,
      chatMessage: [],
      request_type: "",
      request_status: "",
      chatContent: "",
      file:""
    };
    
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount(){
    
    this.chatFullDetails();
  }

  chatFullDetails =() => {
    this.setState({showLoader: true});
    let body = new FormData();
    body.append("sender_id", this.state.sender_id);
    body.append("login_userid", this.state.sender_id);
    body.append("receiver_id", this.state.receiver_id);
    body.append("job_id", this.state.job_id);
    body.append("type", "freelancer");

    axios({
      url: API_URL + "chat/getChat",
      method: "POST",
      data: body,
    })
      .then((response) => {
        console.log("sppp",response);
        this.setState({showLoader: false});
        this.setState({
          chatMessage: response.data,
          request_type: response.data[0].request_type,
          request_status: response.data[0].request_status,
          room_id:response.data[0].room_id,
        });
      })
      .catch((error) => {
        this.setState({showLoader: false});
       });
  }
  usercommentSubmit = async() => {
    
      let formData = new FormData();

      formData.append("file", this.state.file);
      formData.append("sender_id", +this.state.sender_id);
      formData.append("receiver_id", this.state.receiver_id);
      formData.append("message", this.state.chatContent);
      formData.append("job_id", this.state.job_id);
      formData.append("job_type", this.state.user_type === "WQ=="?"recruiter":"freelancer");
      
      let response = await makePostRequestMultipart("chat/startChat",false,formData);
      console.log('dddddddddddddd-----', formData);
      
      };

 chatUpdate = ()=>{
  this.usercommentSubmit();
  this.sendMessage();
 }

  sendMessage = async() => {
    // if(this.state.room_id){
      // let webSocketConnection = `wss://kt9fns6g34.execute-api.us-west-1.amazonaws.com/Prod?user=${this.state.room_id? this.state.room_id:""}`;
      // const socket = new WebSocket(webSocketConnection);
    // }
    
    // Start
    if (this.state.chatContent != "") {
      //this.chatFullDetails();
      
      var payload = {
        action: "sendmessage",
        data: this.state.chatContent,
        source: this.state.receiver_id,
        to_user: this.state.room_id
          
      };
      socket.send(JSON.stringify(payload));
      console.log(payload);

      var temp = new Date();
      var time = temp.toUTCString('en-US', { timeZone: 'GMT' }).split(" ")[4].slice(0, 5);

      var data = {
        chatContent: this.state.chatContent,
        chatDate: "Today",
        chatTime: time + " " + "UTC",
        receiver_image:
          "https://api-prod.connectbud.com/media/default_profile_pic.png",
        sender_id: this.state.sender_id,
      };
      let tempData = this.state.chatMessage;
      tempData.push(data);
      this.setState({
        chatMessage: tempData,
        chatContent:""
      });
      
    } 
  };
  /*componentDidUpdate(prevProps, prevState) {
    if (prevState.chatMessage != this.state.chatMessage) {
      let webSocketConnection = `wss://kt9fns6g34.execute-api.us-west-1.amazonaws.com/Prod?user=750_2519`;
      const socket = new WebSocket(webSocketConnection);

      let msgdata = "";
      let Id = "";
      socket.onmessage = (message) => {
        msgdata = message.data;
        this.setState({
          senderMsg: msgdata,
        });
        //Id = message.currentTarget.url.split("=")[1];
        if (
          
          this.state.lastMsg != this.state.senderMsg
        ) {
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
        } else {
          this.chatFullDetails();
        }
      };
    }
    //this.scrollToBottom();
  }*/

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
            {this.state.request_type === "proposal" && this.state.user_type === "Rg==" ?
            (<TouchableOpacity style={styles.editBtn} onPress={()=>this.props.navigation.navigate(
                        'ProposalFromFreelancer'
                      )}>
                  <Text style={styles.editBtnText}>Proposal</Text>
                </TouchableOpacity>): null}
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={CommonStyles.container}>
                <View>
                {this.state.chatMessage.map((data) => 
                  data.sender_id == this.state.sender_id ?
                  (<View style={styles.send}>
                    <View style={styles.sndChat}>
                      <Text style={styles.sndChatText}>{data.chatContent}</Text>
                      <Text style={styles.sndDate}>{data.chatDate} {data.chatTime}</Text>
                    </View>
                  </View>)
                  :
                  (<View style={styles.receive}>
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
                      <Text style={styles.revDate}>{data.chatDate} {data.chatTime}</Text>
                    </View>
                  </View>)
                )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <View style={styles.chatInputSec}>
            {this.state.request_status === "pending" ? 
            (this.state.user_type === "Rg=="
            ? <Text>You can't chat until you accept the proposal</Text>
            : <Text>You can't chat until the employer accepts the proposal</Text>)
            :
            (<View style={styles.inputHead}>
              <TextInput
              onChangeText={text => {
                        this.setState({chatContent: text});
                      }}
                value={this.state.chatContent}
                placeholder="Type a message"
                style={[styles.input, {color: '#000000'}]}
              />
              {this.state.chatContent !="" ? 
              <TouchableOpacity style={styles.icon} onPress={this.chatUpdate}>
                <FontAwesome name="send" color="#fff" size={18} />
              </TouchableOpacity>
              :null}
            </View>)}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ChatListScreen;
