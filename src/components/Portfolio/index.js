import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import CommonStyles from '../../../CommonStyles';
import style from './style';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PortfolioExperience from '../../components/PortfolioExperience'
import {withNavigation} from 'react-navigation';


class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [{hdng: 'Design and Editing'}, {hdng: 'Online Coding'}],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={CommonStyles.container}>
          <View style={styles.portHeading}>
            <Text style={styles.portfolioHead}>Portfolio</Text>
            <TouchableOpacity >
              <Text style={styles.addPortfolio}>+ Add Portfolio</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.portfolio.map((item, i) => (
            <View key={i} style={styles.portfolioSec}>
              <View style={styles.portImgSec}>
                <Image
                  source={require('../../assets/images/bnr.jpg')}
                  style={CommonStyles.image}
                />
                <View style={styles.portSecName}>
                  <Text style={styles.portSecNameText}>{item.hdng}</Text>
                </View>
              </View>
              <View style={styles.portDetails}>
                <View>
                  <Text style={styles.portDetailsHead}>Test</Text>
                  <Text style={styles.portDetailsSlo}>Test</Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                  <MaterialIcons name="mode-edit" color="#fff" size={18} />
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <PortfolioExperience/>

        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Uploaded Document</Text>
            <TouchableOpacity>
              <Text style={styles.addPortfolio}>+ Add Document</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.portfolio.map((item, i) => (
            <View key={i} style={styles.portDocSec}>
              <TouchableOpacity style={styles.portDocImgSec}>
                <Ionicons
                  name="document-attach-outline"
                  color="rgba(0,0,0,0.3)"
                  size={60}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Uploaded Video</Text>
            <TouchableOpacity>
              <Text style={styles.addPortfolio}>+ Add Video</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.portfolio.map((item, i) => (
            <View key={i} style={[styles.portfolioSec, {marginBottom: 20}]}>
              <TouchableOpacity style={styles.portDocImgSec}>
                <Ionicons
                  name="ios-videocam-outline"
                  color="rgba(0,0,0,0.3)"
                  size={60}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    );
  }
}

export default withNavigation(Portfolio);
