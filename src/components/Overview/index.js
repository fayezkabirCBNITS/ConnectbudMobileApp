import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { withNavigation } from "react-navigation";
import Connect, { connect } from "react-redux";
import base64 from 'base-64';
import { BASE_URL } from "../../config/ApiUrl"
import Spinner from 'react-native-loading-spinner-overlay';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledataset: [],
      showLoader : false,

      skill: [
        { name: 'Concentration' },
        { name: 'Fast Typing Speed' },
        { name: 'Microsoft Word' },
        { name: 'Microsoft Excel' },
        { name: 'Blockchain' },
        { name: 'Data Science' },
        { name: 'Mathematics' },
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = () => {
    this.setState({showLoader : true})

    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      axios({
        url: `${BASE_URL}expertProfile/${base64.decode(this.props.userDeatailResponse.slug)}`,
        method: "GET",
      })
        .then((response) => {
          console.log(response.data.data , "overview")
          this.setState({
            profiledataset: response.data,
          });
          this.setState({showLoader : false})
        })
        .catch(() => { 
          this.setState({showLoader : false})
        });
    })
  };
  gotoEditPage = data => {
    this.props.navigation.navigate('EditProfileScreen', { slugname: this.props.userDeatailResponse.slugname })
  }

  render() {
    console.log(this.state.profiledataset[0] , "***********************************")
    return (
      <View style={CommonStyles.container}>
      <Spinner
        visible={this.state.showLoader}
        animation="fade"
        textContent={'Loading...'}
      />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.editBtn}>
            <MaterialIcons name="mode-edit" color="#fff" size={18} />
            <Text style={styles.editBtnText} onPress={this.gotoEditPage}>Edit</Text>
          </TouchableOpacity>

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>College</Text>
              <Text style={styles.userInfoDetails}>{item.college}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Major</Text>
              <Text style={styles.userInfoDetails}>{item.department}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Enrollment</Text>
              <Text style={styles.userInfoDetails}>{item.title}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Type</Text>
              <Text style={styles.userInfoDetails}>{item.type}</Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Duration</Text>
              <Text style={styles.userInfoDetails}>
                {item.startDateFormat} - {item.endDateFormat}
              </Text>
            </View>
          ))}

          {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>City</Text>
              <Text style={styles.userInfoDetails}>{item.location}</Text>
            </View>
          ))}

          {/* {this.state.profiledataset.map((item, i) => (
            <View key={i} style={styles.details}>
              <Text style={styles.userInfoHead}>Categories</Text>
              {item.category.map((item) => (
                <Text style={styles.userInfoDetails}>{item.label}</Text>
              ))}
            </View>
          ))} */}
            {/* <View style={styles.details}>
              <Text style={styles.userInfoHead}>Categories</Text>
              {this.state.profiledataset[0] ?  this.state.profiledataset[0].category.map((item) => console.log(item , "cuturu")
              // (
              //   <Text style={styles.userInfoDetails}>{item.label}</Text>
              // )
              ) : <></>}
            </View> */}
            {this.state.profiledataset.map((item, i) => (
            <>
            <Text style={styles.userInfoHead}>Categories</Text>
            <View style={styles.details}>
              {item.category.map((value, i) => (
                <Text style={styles.userInfoDetails}>{value.label},{"  "}</Text>
              ))}
            </View>
            </>
          ))}


          {this.state.profiledataset.map((item, i) => (
            <View key={i}>
              <Text style={styles.skillHead}>Skills</Text>
              <View style={styles.skillSec}>

                {item.skills.map((value, i) => (
                  <View key={i} style={styles.skillTab}>
                    <Text style={styles.skillText}>{value.label}</Text>
                  </View>
                ))}

              </View>
            </View>
          ))}
          {this.state.profiledataset.map((item, i) => (
            <View key={i}>
              <Text style={styles.skillHead}>Info</Text>
              <Text style={styles.skillText}>{item.about}</Text>
            </View>
          ))}
        </ScrollView>

      </View>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    userDeatailResponse: state.userData,
  };
};

// export default  withNavigation(connect(Overview),(mapStateToProps, null));
export default connect(mapStateToProps, null,)(withNavigation(Overview));
