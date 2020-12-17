import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';

class PortfolioExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: [{link: 'facebook'}, {link: 'facebook'}],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={CommonStyles.main}>
        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Experience</Text>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddExperienceScreen')}>
              <Text style={styles.addPortfolio}>+ Add Experience</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.experience.map((item, i) => (
              <View style={styles.portDocSec}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.hdng}>Project Name : </Text>
                  <Text style={styles.proName}>Fit007</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.hdng}>Project URL : </Text>
                  <Text
                    style={styles.web}
                    onPress={() => Linking.openURL('https://www.fit007.com')}>
                    https://www.fit007.com
                  </Text>
                </View>

                <Text style={styles.hdng}>Project Description :</Text>
                <Text style={styles.details}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard.
                </Text>
                <Text style={styles.hdng}>Additional Url's :</Text>
                <Text
                  style={[styles.details, styles.blueText]}
                  onPress={() => Linking.openURL('https://www.facebook.com')}>
                  https://www.facebook.com
                </Text>

                <TouchableOpacity style={styles.editBtn}>
                  <FontAwesome name="edit" color="#71b85f" size={28} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default withNavigation(PortfolioExperience);
