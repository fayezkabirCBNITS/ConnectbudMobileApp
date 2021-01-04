import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { connect }  from "react-redux";
import { withNavigation } from "react-navigation";
import axios from "axios";
import { API_URL } from "../../../config/url";
import base64 from 'base-64';
import Spinner from 'react-native-loading-spinner-overlay';

import SyncStorage from 'sync-storage';


class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      chatList: [],
      jobchatList: [],
      showLoader:false,
      projectBtn: true,
      internshipBtn: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount(){
    this.setState({showLoader: true});
    let taglistbody = new FormData();
    taglistbody.append("sender_id", base64.decode(this.props.userDeatailResponse.user_id));
    taglistbody.append("type", "freelancer");
    axios({
      url: API_URL + "chat/chattedUsers",
      method: "POST",
      data: taglistbody,
    })
      .then((response) => {
        this.setState({showLoader: false});
        this.setState({
          chatList: response.data,
        });
      })
      .catch((error) => {
        this.setState({showLoader: false});
       });

       let body = new FormData();
       body.append("sender_id", base64.decode(this.props.userDeatailResponse.user_id));
       body.append("type", "recruiter");
       axios({
         url: API_URL + "chat/chattedUsers",
         method: "POST",
         data: body,
       })
         .then((response) => {
           this.setState({showLoader: false});
           this.setState({
             jobchatList: response.data,
           });
         })
         .catch((error) => {
           this.setState({showLoader: false});
          });
  }
gotoPage = ()=>{
  
}

// jobList = async() => {
//   let body = new FormData();
//     body.append("sender_id", base64.decode(this.props.userDeatailResponse.user_id));
//     body.append("type", "recruiter");
//     axios({
//       url: API_URL + "chat/chattedUsers",
//       method: "POST",
//       data: body,
//     })
//       .then((response) => {
//         this.setState({showLoader: false});
//         this.setState({
//           jobchatList: response.data,
//         });
//       })
//       .catch((error) => {
//         this.setState({showLoader: false});
//        });
// }


showProject = () => {
  this.setState({projectBtn: true, internshipBtn: false});
} 
showInternship = () => {
  this.setState({projectBtn: false, internshipBtn: true});
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
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={[CommonStyles.container, styles.tabSec]}>
            {/* <View style={styles.searchBar}>
              <TextInput
                placeholder='Search for "Name, Skills & Colleges"'
                style={styles.searchInput}
              />
              <View style={styles.searchIcon}>
                <Fontisto name="search" color="#71b85f" size={20} />
              </View>
            </View> */}
            <TouchableOpacity onPress={()=> this.showProject()} style={this.state.projectBtn ? styles.tabSlct : styles.tab}>
              <Text style={styles.tabText}>Project</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.showInternship()} style={this.state.internshipBtn ? styles.tabSlct : styles.tab}>
              <Text style={styles.tabText}>Internship / Job</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.projectBtn ?
            <View style={CommonStyles.container}>            
              {this.state.chatList.length > 0 ? (this.state.chatList.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.chatCard}
                  onPress={() =>
                this.props.navigation.navigate('ChatListScreen',{
                job_id: item.job_id,
                receiver_id: item.receiver_id,
                sender_id: base64.decode(this.props.userDeatailResponse.user_id),
                name:item.name,
                user_image: item.user_image,
                user_type: this.props.userDeatailResponse?.Flag,
                room_id: item.room_id,
                token: item.token,
                page_status: 'projectlist'
            },  SyncStorage.set('room_id',item.job_id+'_'+item.receiver_id))
                  }>
                  <View style={styles.imgSec}>
                    <Image source={{uri: item.user_image}} style={styles.chatImage} />
                    {item.status === "True" ? <View style={styles.online} />  : null }
                  </View>

                  <View style={styles.details}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text
                      style={styles.userChat}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.last_message}
                    </Text>
                  </View>

                  <View style={styles.count}>
                    <Text style={styles.chatTime}>{item.chatTime}</Text>
                    {item.read_status === "false"  ? 
                    (<View style={styles.unread}>
                      {/* <Text style={styles.unreadText}>25</Text> */}
                    </View>)
                    : null}
                  </View>
                </TouchableOpacity>
              ))): <View style={styles.noChat}><Text style={styles.userChat2}>No chat found</Text></View>}
            </View>




            : <View style={CommonStyles.container}>            
              {this.state.jobchatList.length > 0 ? (this.state.jobchatList.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.chatCard}
                  onPress={() =>
                this.props.navigation.navigate('ChatListScreen',{
                job_id: item.job_id,
                receiver_id: item.receiver_id,
                sender_id: base64.decode(this.props.userDeatailResponse.user_id),
                name:item.name,
                user_image: item.user_image,
                user_type: this.props.userDeatailResponse?.Flag,
                room_id: item.room_id,
                token: item.token,
                page_status: 'joblist'
            },  SyncStorage.set('room_id',item.job_id+'_'+item.receiver_id))
                  }>
                  <View style={styles.imgSec}>
                    <Image source={{uri: item.user_image}} style={styles.chatImage} />
                    {item.status === "True" ? <View style={styles.online} />  : null }
                  </View>

                  <View style={styles.details}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text
                      style={styles.userChat}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item.last_message}
                    </Text>
                  </View>

                  <View style={styles.count}>
                    <Text style={styles.chatTime}>{item.chatTime}</Text>
                    {item.read_status === "false"  ? 
                    (<View style={styles.unread}>
                      {/* <Text style={styles.unreadText}>25</Text> */}
                    </View>)
                    : null}
                  </View>
                </TouchableOpacity>
              ))): <View style={styles.noChat}><Text style={styles.userChat2}>No chat found</Text></View>}
            </View>}
          </ScrollView>
          {/* START */}
{/* END */}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    userDeatailResponse: state.userData,
  };
};

export default connect( mapStateToProps,null,)(withNavigation(ChatScreen));
