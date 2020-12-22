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
      showLoader:false,
      chatDetails: [],
      request_type: "",
      request_status: ""
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount(){
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
          chatDetails: response.data,
          request_type: response.data[0].request_type,
          request_status: response.data[0].request_status,
        });
      })
      .catch((error) => {
        this.setState({showLoader: false});
       });
  }


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
          {/* header section end */}

          {/* <FlatList
            //inverted
            // ref={(flatList) => (this.flatList = flatList)}
            // onContentSizeChange={() => {
            //   this.flatList.scrollToEnd({animated: true});
            // }}
            style={{flex: 1, marginBottom: 60, paddingHorizontal: '5%'}}
            // data={this.state.currentChats}
            //ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={renderChat}
            showsVerticalScrollIndicator={false}
            // keyExtractor={(item) => item._id}
          /> */}

          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={CommonStyles.container}>
                <View>
                {this.state.chatDetails.map((data) => 
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
                placeholder="Type a message"
                style={[styles.input, {color: '#000000'}]}
              />
              <TouchableOpacity style={styles.icon}>
                <FontAwesome name="send" color="#fff" size={18} />
              </TouchableOpacity>
            </View>)}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ChatListScreen;
