import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

import Swiper from 'react-native-swiper';

class CustomerStories extends Component {
  constructor() {
    super();
    this.state = {
      swiper: [
        {
          name: 'Rajdeep Bose', dept: 'Co-Founder, CBNITS LLC', story: '“It has been a fantastic experience hiring a college student from ConnectBud for my project. I was really surprised to see the huge talent- pool this platform has.My project has been executed very smoothly.I’m highly satisfied with the service I’ve got and decided that for all my future projects, I’ll hire college students from ConnectBud.”', img: require('../../assets/images/sir.jpg')
        },
        {
          name: 'Rohan Doddi', dept: 'High school senior, Mission San Jose High, Fremont, CA, USA', story: '“The Python class with Ayan Roy was excellent. It was very useful to have someone who close to my own age but also an adult to teach me. The course was quite diverse but also very informative. The rates were also very affordable.”', img: require('../../assets/images/srison.jpg')
        },
        { 
          name: 'Shubh Bachkethi', dept: '5th Grade, Northwood Elementary School, San Jose, CA, USA', story: '“My parents enrolled to the Vedic maths class through ConnectBud, I like my teacher Ritu Sharma, she is detail oriented and clears my doubts, gives homework to practice. The rates are very reasonable, it’s 5 usd/hour for my class.”', img: require('../../assets/images/naveson.jpeg')
        }
      ],
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
          showsButtons
        >
          {this.state.swiper.map((item, i) => (
            <View key={i} style={{ width: '100%' }}>
              <View style={styles.imgSec}>
                <Image
                  source={item.img}
                  style={CommonStyles.image}
                />
              </View>
              <View style={styles.center}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desig}>{item.dept}</Text>
              </View>
              <View style={styles.feedbackSec}>
                <Text style={styles.feedback}>{item.story}</Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    );
  }
}

export default CustomerStories;
