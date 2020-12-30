import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import axios from "axios";
import { API_URL } from "../../config/url";
import { withNavigation } from 'react-navigation'
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

  render() {
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.categoryList.map((item, i) => {
            if (i < 4) {
              return (
                <TouchableOpacity key={i} style={styles.popSec} onPress={() => this.props.navigation.navigate('LatestProjectList', {tagName : item.tagName})}>
                  <Image source={{ uri: item.description }} style={styles.image} />

                  <View style={styles.marTop20}>
                    <Text style={styles.smText}>{item.tagName}</Text>
                    {/* <Text style={styles.lgText}>{item.lgText}</Text> */}
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(PopularServies);
