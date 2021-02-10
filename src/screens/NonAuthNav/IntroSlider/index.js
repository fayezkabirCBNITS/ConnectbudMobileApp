import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import Swiper from 'react-native-swiper';
import styles from './styles';

class IntroSliderScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          <Swiper
            ref="swiper"
            loop={false}
            showsPagination
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}>
            <View style={styles.container}>
              <View style={styles.imgSec}>
                <Image source={require('../../../assets/images/intro1.jpg')} />
              </View>
              <View style={styles.infoSec}>
                <Text style={styles.hdng}>LEARN</Text>
                <Text style={styles.info}>
                  Learn the latest skills from talented young minds today.
                </Text>
              </View>
              <View style={styles.wid100}>
                <TouchableOpacity
                  onPress={() => this.refs.swiper.scrollBy(1)}
                  style={styles.nextBtn}>
                  <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.imgSec}>
                <Image source={require('../../../assets/images/intro2.jpg')} />
              </View>
              <View style={styles.infoSec}>
                <Text style={styles.hdng}>ENGAGE</Text>
                <Text style={styles.info}>
                  Engage and collaborate to bring innovatiove concepts to life.
                </Text>
              </View>
              <View style={styles.wid100}>
                <TouchableOpacity
                  onPress={() => this.refs.swiper.scrollBy(1)}
                  style={styles.nextBtn}>
                  <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.imgSec}>
                <Image source={require('../../../assets/images/intro3.jpg')} />
              </View>
              <View style={styles.infoSec}>
                <Text style={styles.hdng}>CREATE</Text>
                <Text style={styles.info}>
                  Create hi-tech project and build a brighter tomorrow.
                </Text>
              </View>
              <View style={styles.wid100}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('HomeScreen')}
                  style={styles.nextBtn}>
                  <Text style={styles.nextBtnText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swiper>
        </View>
      </SafeAreaView>
    );
  }
}

export default IntroSliderScreen;
