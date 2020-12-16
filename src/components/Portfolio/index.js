import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './style';
import CommonStyles from '../../../CommonStyles';
import style from './style';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      portfolio: [{hdng: 'Design and Editing'}, {hdng: 'Online Coding'}],
      profiledataset: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    await axios({
      url: 'https://api.connectbud.com/expertProfile/Utkarsh-Sarkar-15',
      method: "GET",
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
            <TouchableOpacity>
              <Text style={styles.addPortfolio}>+ Add Portfolio</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.profiledataset.map((item, i) => (
            <>
          {item.portfolio.map((value, i) => (
            // <a href={value.link}>
            <View key={i} style={styles.portfolioSec}>
              <View style={styles.portImgSec}>
                <Image
                  source={{uri : value.image}}
                  style={CommonStyles.image}
                />
                <View style={styles.portSecName}>
                  <Text style={styles.portSecNameText}
                  onPress={() => Linking.openURL(value.link)}
                  >{value.title}</Text>
                </View>
              </View>
              <View style={styles.portDetails}>
                <View>
                  {/* <Text style={styles.portDetailsHead}>Test</Text> */}
                  <Text style={styles.portDetailsSlo}>
                    {value.category}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                  <MaterialIcons name="mode-edit" color="#fff" size={18} />
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            // </a>
          ))}
          </>
          ))}
        </ScrollView>

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

        <WebView
    source={{ uri: `https://api.connectbud.com/media/BIO%20DATA%20SUDEEP-converted-converted.pdf`}}
    startInLoadingState={true} />

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

export default Portfolio;
