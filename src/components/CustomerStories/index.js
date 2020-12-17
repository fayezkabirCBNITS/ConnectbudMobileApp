import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';

import Swiper from 'react-native-swiper';

class CustomerStories extends Component {
  constructor() {
    super();
    this.state = {
      swiper: [{img: ''}, {img: ''}],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={styles.wrap}>
        <Swiper
          loop={true}
          autoplay={true}
          showsPagination={false}
          >
          {this.state.swiper.map((item, i) => (
            <View key={i} style={{width: '100%'}}>
              <View style={styles.imgSec}>
                <Image
                  source={require('../../assets/images/sir.jpg')}
                  style={CommonStyles.image}
                />
              </View>
              <View style={styles.center}>
                <Text style={styles.name}>Rajdeep Bose</Text>
                <Text style={styles.desig}>Co-Founder, CBNITS LLC</Text>
              </View>
              <View style={styles.feedbackSec}>
                <Text style={styles.feedback}>
                  “It has been a fantastic experience hiring a college student
                  from ConnectBud for my project. I was really surprised to see
                  the huge talent-pool this platform has. My project has been
                  executed very smoothly. I’m highly satisfied with the service
                  I’ve got and decided that for all my future projects, I’ll
                  hire college students from ConnectBud.”
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    );
  }
}

export default CustomerStories;
