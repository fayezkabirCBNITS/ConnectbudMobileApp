import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';

class NewPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      newOverview: [
        {
          name: 'John Doe',
          details: 'natit solved',
          website: 'https://www.connectbud.com',
        },
        {
          name: 'John Doe',
          details: 'natit solved',
          website: 'https://www.connectbud.com',
        },
        {
          name: 'John Doe',
          details: 'natit solved',
          website: 'https://www.connectbud.com',
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.portfolio}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Portfolio</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn}>
            <AntDesign name="plus" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.newOverview.map((item, i) => (
            <View key={i} style={styles.newportfolioSec}>
              <View style={styles.imgSec}>
                <Image source={require('../../assets/images/bnr.jpg')} />
              </View>
              <View>
                <View style={styles.details}>
                  <Text style={styles.portfolioHdng}>{item.name}</Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={styles.portfolioDetails}>
                    {item.details}
                  </Text>
                  <Text style={styles.portfolioWeb}>{item.website}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default NewPortfolio;
