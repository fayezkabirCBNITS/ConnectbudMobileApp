import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import axios from "axios";
import { API_URL } from "../../config/url";
import { withNavigation } from 'react-navigation'
// import { Link } from "react-router-dom";
import Swiper from 'react-native-swiper'

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

  render() {
    return (
      <View  style={styles.wrap}>
        {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal> */}
        <Swiper
          loop={true}
          showsPagination={false}
          showsButtons
        >
          {this.state.categoryList.map((item, i) => {
            if (i < 4) {
              return (
                <View key={i} style={{width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: '5%'}}>
                <TouchableOpacity key={i} style={styles.popSec} onPress={() => this.props.navigation.navigate('LatestProjectList', {tagName : item.tagName})}>
                  <Image source={{ uri: item.description }} style={styles.image} />

                  <View style={styles.marTop20}>
                    <Text style={styles.smText}>{item.tagName}</Text>
                    {/* <Text style={styles.lgText}>{item.lgText}</Text> */}
                  </View>
                </TouchableOpacity>
                </View>
              );
            }
          })}
          </Swiper>
        {/* </ScrollView> */}
      </View>
    );
  }
}

export default withNavigation(PopularServies);
