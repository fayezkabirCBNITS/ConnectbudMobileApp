import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import styles from './style';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API_URL } from "../../config/url";
import {WebView} from 'react-native-webview';
import ViewPortfolioExperience from '../../components/ViewPortfolioExperience'

class ViewPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    await axios({
      url: API_URL + "expertProfile/" + await AsyncStorage.getItem("slugname"),
      method: 'GET',
    })
      .then((response) => {
        this.setState({
          profiledataset: response.data,
        });
      })
      .catch(() => {});
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={CommonStyles.container}>
          <View style={styles.portHeading}>
            <Text style={styles.portfolioHead}>Portfolio</Text>
          </View>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.profiledataset.map((item, i) => (
            <>
              {item.portfolio.map((value, i) => (
                <View key={i} style={styles.portfolioSec}>
                  <View style={styles.portImgSec}>
                    <Image
                      source={{uri: value.image}}
                      style={CommonStyles.image}
                    />
                    <View style={styles.portSecName}>
                      <Text
                        style={styles.portSecNameText}
                        onPress={() => Linking.openURL(value.link)}>
                        {value.title}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.portDetails}>
                    <View>
                      {/* <Text style={styles.portDetailsHead}>Test</Text> */}
                      <Text style={styles.portDetailsSlo}>
                        {value.category}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </>
          ))}
        </ScrollView>

        <ViewPortfolioExperience />

        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Uploaded Documents</Text>
          </View>
        </View>
        {this.state.profiledataset.map((item, i) => (
          <>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {item.resumefile.map((value, i) => (
                <View key={i} style={styles.portDocSec}>
                  <TouchableOpacity style={styles.portDocImgSec}>
                    <Text onPress={() => Linking.openURL(value.resumefile)}>
                      {value.resumefile}
                      {/* <WebView
                       originWhitelist={['*']}
                       source={{ html: 'http://docs.google.com/gview?embedded=true&url=https://api.connectbud.com/media/Biswanath%20Singh%20CBNITS.docx' }}
                       view={value.resumefile}
                       style={{ marginTop: 20 }}
                    /> */}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </>
        ))}

        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Uploaded Videos</Text>
          </View>
        </View>

        {/* {this.state.profiledataset.map((item, i) => (
          <> */}
        <View>
          <WebView
            originWhitelist={['*']}
            source={{
              html:
                'http://docs.google.com/gview?embedded=true&url=https://api.connectbud.com/media/Biswanath%20Singh%20CBNITS.docx',
            }}
            style={{marginTop: 20}}
          />
        </View>

        {/* </>
        ))} */}
      </ScrollView>
    );
  }
}

export default ViewPortfolio;
