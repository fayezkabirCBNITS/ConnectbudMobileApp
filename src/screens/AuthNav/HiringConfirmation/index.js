import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

class HiringConfirmation extends Component {
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
            <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <View>
                <View style={styles.heading}>
                  <Text style={styles.projHead}>Project Name : </Text>
                  <Text style={styles.projName}>Test for android</Text>
                </View>

                <View style={styles.detailsSec}>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Type of Project</Text>
                    <Text style={styles.deatailsInfo}>Milestone 1</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Project Timeline</Text>
                    <Text style={styles.deatailsInfo}>2020-12-16</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Description</Text>
                    <Text style={styles.deatailsInfo}>Complete</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Proposed Amount</Text>
                    <Text style={styles.deatailsInfo}>$50.00</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Service Fee</Text>
                    <Text style={styles.deatailsInfo}>12%</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Received Amount</Text>
                    <Text style={styles.deatailsInfo}>$44.00</Text>
                  </View>
                </View>

                <View style={styles.detailsSec}>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Type of Project</Text>
                    <Text style={styles.deatailsInfo}>Milestone 1</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Project Timeline</Text>
                    <Text style={styles.deatailsInfo}>2020-12-16</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Description</Text>
                    <Text style={styles.deatailsInfo}>Complete</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Proposed Amount</Text>
                    <Text style={styles.deatailsInfo}>$50.00</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Service Fee</Text>
                    <Text style={styles.deatailsInfo}>12%</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Received Amount</Text>
                    <Text style={styles.deatailsInfo}>$44.00</Text>
                  </View>
                </View>

                <View style={styles.detailsSec}>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Type of Project</Text>
                    <Text style={styles.deatailsInfo}>Milestone 1</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Project Timeline</Text>
                    <Text style={styles.deatailsInfo}>2020-12-16</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Description</Text>
                    <Text style={styles.deatailsInfo}>Complete</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Proposed Amount</Text>
                    <Text style={styles.deatailsInfo}>$50.00</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Service Fee</Text>
                    <Text style={styles.deatailsInfo}>12%</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Received Amount</Text>
                    <Text style={styles.deatailsInfo}>$44.00</Text>
                  </View>
                </View>

                <View style={styles.detailsSec}>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Type of Project</Text>
                    <Text style={styles.deatailsInfo}>Milestone 1</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Project Timeline</Text>
                    <Text style={styles.deatailsInfo}>2020-12-16</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Description</Text>
                    <Text style={styles.deatailsInfo}>Complete</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Proposed Amount</Text>
                    <Text style={styles.deatailsInfo}>$50.00</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Service Fee</Text>
                    <Text style={styles.deatailsInfo}>12%</Text>
                  </View>
                  <View style={styles.detailsField}>
                    <Text style={styles.deatailsHdng}>Received Amount</Text>
                    <Text style={styles.deatailsInfo}>$44.00</Text>
                  </View>
                </View>

                <View style={styles.btnSec}>
                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Ignore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Accept</Text>
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

export default HiringConfirmation;
