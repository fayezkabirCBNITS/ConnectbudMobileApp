import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import {Item} from 'native-base';

class LatestProjects extends Component {
  constructor() {
    super();
    this.state = {
      project: [
        {hdng: 'Game Development Classes', boldText: 'Coding'},
        {hdng: 'Data Science Classes', boldText: 'Coding'},
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={CommonStyles.main}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.project.map((item, i) => (
            <View key={i} style={styles.wrap}>
              <View style={styles.imgSec}>
                <Image
                  source={require('../../assets/images/bnr.jpg')}
                  style={CommonStyles.image}
                />
                <View style={styles.priceCircle}>
                  <Text style={styles.priceCircleText}>$ 20</Text>
                </View>
              </View>
              <View style={styles.content}>
                <Text style={styles.hdng}>{item.hdng}</Text>
                <Text style={styles.boldText}>{item.boldText}</Text>
                <TouchableOpacity style={styles.knowMoreBtn}>
                  <Text style={styles.knowMoreBtnText}>KNOW MORE</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default LatestProjects;
