import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class JobListingScreen extends Component {
  constructor() {
    super();
    this.state = {
      wrap: [
        {name: 'React JS'},
        {name: 'C'},
        {name: 'HTML'},
        {name: 'CSS'},
        {name: 'React Native'},
        {name: 'Python'},
      ],
    };
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
          <View style={[CommonStyles.header, {marginBottom: 15}]}>
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
                    size={13}
                  />
                  <Text style={styles.time}>17 hrs ago</Text>
                </View>
                <View style={styles.topSec}>
                  <Text style={styles.hdng}>
                    Need a Full Stack React Developer to integrate API
                  </Text>
                  <Text style={styles.price}>5000 USD</Text>
                </View>

                <Text style={styles.subtitle}>
                  I am posting this job for testing purpose
                </Text>

                <View style={styles.wrap}>
                  {this.state.wrap.map((item, i) => (
                    <Text key={i} style={styles.wrapContent}>
                      {item.name}
                    </Text>
                  ))}
                </View>

                <View style={styles.btnSec}>
                  <TouchableOpacity style={styles.btn50}>
                    <AntDesign name="delete" color="#fff" size={18} />
                    <Text style={styles.btn50Text}>Close Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn50}>
                    <FontAwesome name="edit" color="#fff" size={18} />
                    <Text style={styles.btn50Text}>Edit Job</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity style={styles.btn}>
                    <AntDesign name="search1" color="#fff" size={20} />
                    <Text style={styles.btn50Text}>Find Candidates</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default JobListingScreen;
