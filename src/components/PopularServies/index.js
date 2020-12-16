import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';

class PopularServies extends Component {
  constructor() {
    super();
    this.state = {
      talent: [
        {smText: 'Connect with your', lgText: 'Online Tutor Classes', img: require('../../assets/images/tutorIcon.png')},
        {smText: 'Be a Techie with your', lgText: 'Codding Classes', img: require('../../assets/images/codingIcon.png')},
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.talent.map((item, i) => (
            <TouchableOpacity key={i} style={styles.popSec}>
              <Image source={item.img} />
              <View style={styles.marTop20}>
                <Text style={styles.smText}>{item.smText}</Text>
                <Text style={styles.lgText}>{item.lgText}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default PopularServies;
