import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

class LatestProjectList extends Component {
  constructor() {
    super();
    this.state = {};
  }
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* header section */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
              }
              style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}
          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <View style={styles.card}>
                <View style={styles.timeSec}>
                  <Entypo
                    name="back-in-time"
                    color="rgba(0,0,0,0.4)"
                    size={15}
                  />
                  <Text style={styles.time}>102 days ago</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.hdng}>
                    Hiring For Animation Video Creator
                  </Text>
                  <TouchableOpacity style={styles.applyBtn}>
                    <Text style={styles.applyBtnText}>Apply</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.details}>
                  I am looking to have a30 second, animated explainer video made
                  for the branding of my Ed-tech startup. The video should be
                  informative covering all the valuable points of my startup.
                </Text>
                <View style={[styles.flexstyle, styles.moneyContainer]}>
                  <Text style={styles.usdText}>40 USD</Text>
                  <Text style={styles.inrtxt}>3000 INR</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default LatestProjectList;
