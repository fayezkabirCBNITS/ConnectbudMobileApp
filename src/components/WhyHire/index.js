import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import Swiper from 'react-native-swiper'

class WhyHire extends Component {
  constructor() {
    super();
    this.state = {
      whyHire: [
        {
          head: 'Cost-effective',
          details: '25% of cost of a regular cost',
          img: require('../../assets/images/cost.png'),
        },
        {
          head: 'Authenticated',
          details: 'Verified and curated College Students',
          img: require('../../assets/images/auth.png'),
        },
        {
          head: 'Qualified',
          details: 'Well educated and up-to date with current trends',
          img: require('../../assets/images/qualified.png'),
        },
        {
          head: 'Committed',
          details: 'Motivated to excel the assignments',
          img: require('../../assets/images/committed.png'),
        },
        {
          head: 'Effective',
          details: 'Super energetic and goal oriented',
          img: require('../../assets/images/effective.png'),
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
        <Swiper
          loop={true}
          showsPagination={false}
          showsButtons
        >
        {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal> */}
          {this.state.whyHire.map((item, i) => (
            <View key={i} style={styles.swiperWrap}>
            <View style={[styles.width200, {width: '100%', alignItems: 'center', paddingHorizontal: '5%'}]}>
              <View style={styles.imgSec}>
                <Image
                  source={item.img}
                  style={styles.image}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.headText}>{item.head}</Text>
                <Text style={styles.detailsText}>
                  {item.details}
                </Text>
              </View>
            </View>
            </View>
          ))}
        {/* </ScrollView> */}
        </Swiper>
      </View>
    );
  }
}

export default WhyHire;
