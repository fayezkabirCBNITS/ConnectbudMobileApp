import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Image
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ApiUrl from '../../config/ApiUrl';
import { makeGetRequest } from '../../services/http-connectors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

class ViewPortfolioExperience extends Component {
  constructor() {
    super();
    this.state = {
      experienceset: [],
      urlprofessional: "",
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    let response = await makeGetRequest(ApiUrl.ExpertProfile + this.props.slugname, false, "");
    if (response) {
      this.setState({
        experienceset: response[0].experiences,
        urlprofessional: response[0].experiences.map(
          (obj) => obj.professionalurls
        ),
      });
    }
  };

  render() {
    return (
      <View style={styles.portfolio}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Experience</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.experienceset.map((item, i) => {
            if (item.experience.length > 0) {
              return (
                <View key={i} style={styles.newexperienceSec}>
                  <View style={styles.iconSec}>
                    <SimpleLineIcons name="briefcase" color="#71b85f" size={25} />
                    <View style={styles.lines} />
                  </View>
                  <View style={styles.deatilsSec}>
                    <View>
                      <Text style={styles.experienceHdng}>Project Name</Text>
                      <Text style={styles.experienceDetails}>{item.experience}</Text>
                    </View>
                    <View>
                      <Text style={styles.experienceHdng}>Project URL</Text>
                      <Text style={styles.experienceDetails}>{item.projecturl}</Text>
                    </View>
                    <View>
                      <Text style={styles.experienceHdng}>Project Description</Text>
                      <Text style={styles.experienceDetails}>{item.description}</Text>
                    </View>
                    <View>
                      <Text style={styles.experienceHdng}>Additional URL's</Text>
                      <Text style={styles.experienceDetails}>{item.professionalurls}</Text>
                    </View>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.noData}>
                  <Image source={require('../../assets/images/noData.png')} />
                  <Text style={styles.noDataText}>No Data Found</Text>
                </View>
              )
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

export default ViewPortfolioExperience;
