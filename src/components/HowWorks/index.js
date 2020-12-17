import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';

class HowWorks extends Component {
  constructor() {
    super();
    this.state = {
      whyHire: [
        {
          head: 'Select',
          details: 'Hire a Student',
          img: require('../../assets/images/hStudent.jpg'),
        },
        {
          head: 'Select',
          details: 'Hiring Type',
          img: require('../../assets/images/hType.jpg'),
        },
        {
          head: 'Enter',
          details: 'Details and Submit',
          img: require('../../assets/images/details.jpg'),
        },
        {
          head: 'Hire',
          details: 'Student',
          img: require('../../assets/images/student.jpg'),
        },
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
          {this.state.whyHire.map((item, i) => (
            <View key={i} style={styles.width220}>
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
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default HowWorks;
