import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import axios from "axios";
import { API_URL } from "../../config/url";
// import { Link } from "react-router-dom";

class QualityTalent extends Component {
  constructor() {
    super();
    this.state = {
      expertset: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {

    let body = new FormData();
    body.append("user_id", "");

    await axios({
      url: API_URL + "feedexpertlist",
      method: "POST",
      data: body,
    })
      .then((response) => {
        this.setState({
          expertset: response.data,
        });
      })
      .catch((error) => { });
  };

  viewProfile = (slug) => {
    console.log("hit view");
  };

  render() {
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.expertset.map((value, i) => (
              <TouchableOpacity key={i} style={styles.main} onPress={() => this.viewProfile(value.slug)}>
                <View style={styles.image}>
                  <Image
                    source={{uri: value.user_image}}
                    style={CommonStyles.image}
                  />
                </View>
                <View style={styles.des}>
                  <Text style={styles.name}>{value.expert_Name}</Text>
                  <Text style={styles.designation}>{value.collegeName}</Text>
                </View>
              </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default QualityTalent;
