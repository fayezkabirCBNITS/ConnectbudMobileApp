import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import axios from "axios";
import { API_URL } from "../../config/url";
import {withNavigation} from 'react-navigation'
// import { Link } from "react-router-dom";

class PopularServies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    await axios.get(API_URL + "landing_tags").then(async (res) => {
      await this.setState({
        categoryList: res.data,
      });
    });
  };

  onPageNavigate = (tagName) =>{
    if(tagName === "Homework"){
      this.props.navigation.navigate('HomeWorkHelpNA')
    }else if(tagName === "Software Development"){
      this.props.navigation.navigate('PostProjectNA')
    }else if(tagName === "Online Coding"){
      this.props.navigation.navigate('OnlineClassesNA')
    }else if(tagName === "Design"){
      this.props.navigation.navigate('PostProjectNA')
    }else{

    }
  }

  // storeCategory = async (tagName, PageType) => {
  //   if (PageType === "coding") {
  //     localStorage.setItem("LoginStatus", "landingTutor");
  //     localStorage.setItem("LoginPageType", "Coding");
  //     localStorage.setItem("Category","Coding");
  //     localStorage.setItem("AccountType","tutor");

  //   } else if (PageType === "mentoring") {
  //     localStorage.setItem("LoginStatus", "landingTutor");
  //     localStorage.setItem("LoginPageType", "Homework");
  //     localStorage.setItem("Category","Homework");
  //     localStorage.setItem("AccountType","tutor");
  //   } else {
  //     localStorage.setItem("LoginStatus", "landingProject");
  //     localStorage.setItem("Category","Software Development");
  //     localStorage.setItem("AccountType","freelancer");
  //   }
  //   await localStorage.setItem("category", tagName);
  // };

  render() {
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.categoryList.map((item, i) => {
            if (i < 4) {
              return (
                // <Link
                //   to="/landing-projects"
                //   onClick={() =>
                //     this.storeCategory(item.tagName, item.type)
                //   }
                // >
                  <TouchableOpacity key={i} style={styles.popSec} onPress={()=>this.onPageNavigate(item.tagName)}>
                    <Image source={{uri: item.description}} style={styles.image}/>
                    <View style={styles.marTop20}>
                      <Text style={styles.smText}>{item.tagName}</Text>
                      {/* <Text style={styles.lgText}>{item.lgText}</Text> */}
                    </View>
                  </TouchableOpacity>
                //</Link>
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(PopularServies);
