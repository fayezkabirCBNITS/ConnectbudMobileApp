import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import {WebView} from 'react-native-webview';

import Swiper from 'react-native-swiper';

class CustomerStories extends Component {
  constructor() {
    super();
    this.state = {
      swiper: [
        {
          name: 'Rajdeep Bose',
          dept: 'Co-Founder, CBNITS LLC',
          story:
            '“It has been a fantastic experience hiring a college student from ConnectBud as my project has been executed very smoothly. This ease of hiring and quality of resources has helped me hire interns from ConnectBud for all future projects.”',
          img: require('../../assets/images/sir.jpg'),
        },
        {
          name: 'Rohan Doddi',
          dept: 'High school senior, Mission San Jose High, Fremont, CA, USA',
          story:
            '“The Python class I signed up for was excellent. It was relatable to learn from someone young as well as interactive. It is one of the best places to learn a new coding language at very reasonable rates.”',
          img: require('../../assets/images/srison.jpg'),
        },
        {
          name: 'Shubh Bachkethi',
          dept: '5th Grade, Northwood Elementary School, San Jose, CA, USA',
          story:
            '“I enjoy the Vedic maths class of ConnectBud. My teacher is detail oriented, clears my doubts, and gives interesting assignments.”',
          img: require('../../assets/images/naveson.jpeg'),
        },
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={styles.wrap}>
        <Swiper loop={true} autoplay={true} showsPagination={false}>
          {this.state.swiper.map((item, i) => (
            <View key={i} style={styles.head}>
              <Image
                source={require('../../assets/images/storiesDesign.png')}
                style={styles.design}
              />
              <View style={styles.feedbackSec}>
                <Image
                  source={require('../../assets/images/quoteWhite.png')}
                  style={styles.quote}
                />
                <Text style={styles.feedback}>{item.story}</Text>

                {/* <View style={styles.videoSec}>
                  <WebView
                    style={{width: '100%', height: '100%'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsFullscreenVideo={true}
                    mediaPlaybackRequiresUserAction={false}
                    allowsInlineMediaPlayback={true}
                    source={{
                      uri: 'https://www.youtube.com/embed/MOhYD7va19k',
                    }}
                  />
                </View> */}
              </View>

              <View style={styles.flexRow}>
                <View style={styles.imgSec}>
                  <Image source={item.img} style={CommonStyles.image} />
                </View>
                <View style={styles.center}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.desig}>{item.dept}</Text>
                </View>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    );
  }
}

export default CustomerStories;
