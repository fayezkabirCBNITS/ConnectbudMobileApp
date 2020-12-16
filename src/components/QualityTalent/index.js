import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';

class QualityTalent extends Component {
  constructor() {
    super();
    this.state = {
      talent: [
        {name: 'Jagdeep Basu', desig: 'Finance Expert'},
        {name: 'Jagdeep Basu', desig: 'Software Developer'},
        {name: 'A. Smith', desig: 'Data Entry Operator'},
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
            <View key={i} style={styles.main}>
              <View style={styles.image}>
                <Image
                  source={require('../../assets/images/profileImg.jpg')}
                  style={CommonStyles.image}
                />
              </View>
              <View style={styles.des}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.designation}>{item.desig}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default QualityTalent;
