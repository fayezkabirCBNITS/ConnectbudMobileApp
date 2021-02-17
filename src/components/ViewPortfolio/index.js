import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet
} from 'react-native';
import styles from './style';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ApiUrl from '../../config/ApiUrl';
import { makeGetRequest } from '../../services/http-connectors';
import { WebView } from 'react-native-webview';

class ViewPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiledataset: []
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    let response = await makeGetRequest(ApiUrl.ExpertProfile + this.props.slugname, false, "");
    if (response) {
      this.setState({
        profiledataset: response[0].portfolio,
      });
    }
  };

  render() {
    return (
      <View style={styles.portfolio}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Portfolio</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.profiledataset.map((item, i) => {
            if (item.id.length > 0) {
              return (
                <View key={i} style={styles.newportfolioSec}>
                  <View style={styles.imgSec}>
                    <Image source={{ uri: item.image }} style={CommonStyles.image} />
                  </View>
                  <View>
                    <View style={styles.details}>
                      <Text
                        style={styles.portfolioHdng}
                        onPress={() => Linking.openURL(item.link)}>
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={styles.portfolioDetails}>
                        {item.description}
                      </Text>
                      <Text style={styles.portfolioWeb}>{item.link}</Text>
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
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

export default ViewPortfolio;
