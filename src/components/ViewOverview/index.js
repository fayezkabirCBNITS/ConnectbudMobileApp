// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import CommonStyles from '../../../CommonStyles';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import styles from './style';
// import { ScrollView } from 'react-native-gesture-handler';
// import ApiUrl from '../../config/ApiUrl';
// import { makeGetRequest } from '../../services/http-connectors';
// import Zocial from 'react-native-vector-icons/Zocial';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// class ViewOverview extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       profiledataset: [],
//       showLoader: false,
//       urlsocialset: "",
//       urlsocial: ""
//     };
//   }

//   static navigationOptions = {
//     headerShown: false,
//   };

//   componentDidMount = async () => {
//     let response = await makeGetRequest(ApiUrl.ExpertProfile + this.props.slugname, false, "");
//     if (response) {
//       this.setState({
//         profiledataset: response,
//         urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
//         showLoader: false
//       });
//       this.setState({
//         urlsocial: this.state.urlsocialset.toString().split(" ,").join(", "),
//       });
//     }
//   };

//   render() {
//     return (
//       <View style={CommonStyles.container}>
//         {this.state.profiledataset.map((item, i) => {
//           if (this.state.profiledataset.length > 0) {
//             return (
//               <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={styles.editBtn} />
//                 <View key={i} style={styles.details}>
//                   <Text style={styles.userInfoHead}>College</Text>
//                   <Text style={styles.userInfoDetails}>{item.college}</Text>
//                 </View>

//                 <View key={i} style={styles.details}>
//                   <Text style={styles.userInfoHead}>Major</Text>
//                   <Text style={styles.userInfoDetails}>{item.department}</Text>
//                 </View>

//                 <View key={i} style={styles.details}>
//                   <Text style={styles.userInfoHead}>Enrollment</Text>
//                   <Text style={styles.userInfoDetails}>{item.title}</Text>
//                 </View>

//                 <View key={i} style={styles.details}>
//                   <Text style={styles.userInfoHead}>Type</Text>
//                   <Text style={styles.userInfoDetails}>{item.type}</Text>
//                 </View>

//                 <View key={i} style={styles.details}>
//                   <Text style={styles.userInfoHead}>Duration</Text>
//                   <Text style={styles.userInfoDetails}>
//                     {item.startDateFormat} - {item.endDateFormat}
//                   </Text>
//                 </View>

//                 <View key={i} style={styles.details}>
//                   <Text style={styles.userInfoHead}>City</Text>
//                   <Text style={styles.userInfoDetails}>{item.location}</Text>
//                 </View>

//                 <Text style={styles.userInfoHead}>Categories</Text>
//                 <View style={styles.details}>
//                   {item.category.map((value, i) => (
//                     <Text style={styles.userInfoDetails}>{value.label},{"  "}</Text>
//                   ))}
//                 </View>

//                 {this.state.urlsocial !== "" &&
//                   this.state.urlsocial !== "NULL" && (
//                     <View style={styles.socialIconSec}>
//                       <Text style={styles.userInfoHead}>Social Url's</Text>
//                       <View style={styles.socialIcon}>
//                         {item.socialurls.map((value) => {
//                           if (value.type === "linkedin") {
//                             return (
//                               <TouchableOpacity
//                                 onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
//                                 <Zocial name="linkedin" color='#014670' size={16} />
//                               </TouchableOpacity>
//                             );
//                           }
//                         })}
//                         {item.socialurls.map((value) => {
//                           if (value.type === "youtube") {
//                             return (
//                               <TouchableOpacity
//                                 onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
//                                 <Zocial name="youtube" color='#F44336' size={16} />
//                               </TouchableOpacity>
//                             );
//                           }
//                         })}
//                         {item.socialurls.map((value) => {
//                           if (value.type === "facebook") {
//                             return (
//                               <TouchableOpacity
//                                 onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
//                                 <Zocial name="facebook" color='#3c5a9a' size={16} />
//                               </TouchableOpacity>
//                             );
//                           }
//                         })}
//                         {item.socialurls.map((value) => {
//                           if (value.type === "twitter") {
//                             return (
//                               <TouchableOpacity
//                                 onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
//                                 <Zocial name="twitter" color='#00acee' size={16} />
//                               </TouchableOpacity>
//                             );
//                           }
//                         })}
//                         {item.socialurls.map((value) => {
//                           if (value.type === "instagram") {
//                             return (
//                               <TouchableOpacity
//                                 onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
//                                 <Zocial name="instagram" color='#3f729b' size={16} />
//                               </TouchableOpacity>
//                             );
//                           }
//                         })}
//                         {item.socialurls.map((value) => {
//                           if (value.type === "github") {
//                             return (
//                               <TouchableOpacity
//                                 onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
//                                 <Zocial name="github" color='#212121' size={16} />
//                               </TouchableOpacity>
//                             );
//                           }
//                         })}
//                         {item.socialurls.map((value) => {
//                           if (value.type === "stackoverflow") {
//                             return (
//                               <TouchableOpacity
//                                 onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10 }}>
//                                 <Zocial name="stackoverflow" color='#f48024' size={16} />
//                               </TouchableOpacity>
//                             );
//                           }
//                         })}
//                         {item.socialurls.map((value) => {
//                           if (value.type === "other") {
//                             return (
//                               <TouchableOpacity
//                                 onPress={() => Linking.openURL(value.socialurl)} style={{ marginRight: 10, paddingTop: 5 }}>
//                                 <FontAwesome name="external-link" color='#71B85F' size={18} />
//                               </TouchableOpacity>
//                             );
//                           }
//                         })}
//                       </View>
//                     </View>
//                   )
//                 }

//                 <Text style={styles.skillHead}>Skills</Text>
//                 <View style={styles.skillSec}>
//                   {item.skills.map((value, i) => (
//                     <View key={i} style={styles.skillTab}>
//                       <Text style={styles.skillText}>{value.label}</Text>
//                     </View>
//                   ))}
//                 </View>

//                 {
//                   item.about !== "" && (
//                     <View key={i}>
//                       <Text style={styles.skillHead}>Info</Text>
//                       <Text style={styles.skillText}>{item.about}</Text>
//                     </View>
//                   )
//                 }
//               </ScrollView>
//             );
//           } else {
//             return (
//               <View style={styles.noData}>
//                 <Image source={require('../../assets/images/noData.png')} />
//                 <Text style={styles.noDataText}>No Data Found</Text>
//               </View>
//             );
//           }
//         })}
//       </View>
//     );
//   }
// }

// export default ViewOverview;

import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../../../CommonStyles';
import ApiUrl from '../../config/ApiUrl';
import {makeGetRequest} from '../../services/http-connectors';
import base64 from 'base-64';
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

class ViewOverview extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],
      showLoader: false,
      newOverview: [
        {hdng: 'College', details: 'natit solved'},
        {hdng: 'Major', details: 'Computer Science'},
        {hdng: 'Enrolment', details: 'Under Graduate'},
        {hdng: 'Type', details: 'Part timer'},
        {hdng: 'Duration', details: '03 August 2015 - 21 June 2019'},
        {hdng: 'City', details: 'Kolkata'},
        {hdng: 'Categories', details: 'Software Development, Online Coding'},
        {hdng: 'Skills', details: 'C, React js,'},
      ],
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
    console.log("called");

    this.setState({ showLoader: true });


    let response = await makeGetRequest(ApiUrl.ExpertProfile + base64.decode(this.props.userDeatailResponse.slug), false, body);
    if (response) {
      console.log(response)
      this.setState({
        profiledataset: response,
        urlsocialset: response.map((item) => item.socialurls.map((obj) => obj.socialurl)),
        showLoader: false
      });
      this.setState({
        urlsocial: this.state.urlsocialset.toString().split(" ,").join(", "),
      });
    }
  };

  gotoEditPage = data => {
    this.props.navigation.navigate('EditProfileScreen', { slugname: this.props.userDeatailResponse.slugname })
  }

  render() {
    return (
      <View style={styles.overview}>
        <View style={CommonStyles.newHdng}>
          <Text style={CommonStyles.newHdngText}>Overview</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn} onPress={this.gotoEditPage}>
            <FontAwesome name="edit" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Edit</Text>
          </TouchableOpacity>
        </View>
        {this.state.profiledataset.map((item, i) => (
          <View key={i} style={styles.newOverviewSec}>
            <Text style={styles.overviewHdng}>College</Text>
            <Text style={styles.overviewDetails}>{item.college}</Text>
            <Text style={styles.overviewHdng}>Major</Text>
            <Text style={styles.overviewDetails}>{item.department}</Text>
            <Text style={styles.overviewHdng}>Enrolment</Text>
            <Text style={styles.overviewDetails}>{item.title}</Text>
            <Text style={styles.overviewHdng}>Type</Text>
            <Text style={styles.overviewDetails}>{item.type}</Text>
            <Text style={styles.overviewHdng}>Duration</Text>
            <Text style={styles.overviewDetails}>{item.startDateFormat} - {item.endDateFormat}</Text>
            <Text style={styles.overviewHdng}>City</Text>
            <Text style={styles.overviewDetails}>{item.location}</Text>
            <Text style={styles.overviewHdng}>Categories</Text>
            {item.category.map((value,i)=> (
            <Text style={styles.overviewDetails}>{value.label}</Text>
            ))}
            <Text style={styles.overviewHdng}>Skills</Text>
            {item.skills.map((value,i)=> (
            <Text style={styles.overviewDetails}>{value.label}</Text>
            ))}
          </View>
        ))}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null,)(withNavigation(ViewOverview));
