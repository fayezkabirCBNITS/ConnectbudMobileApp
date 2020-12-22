import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';

class TransactionScreen extends Component {
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
              <View style={styles.walletDetails}>
                <Text style={styles.head}>
                  Escrowed Amount : <Text style={styles.headGreen}>0 USD</Text>
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.head}>
                    Wallet Amount :{' '}
                    <Text style={styles.headGreen}>435.6 USD</Text>
                  </Text>
                  <TouchableOpacity style={styles.redeemBtn}>
                    <Text style={styles.redeemBtnText}>Redeem</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.head}>
                  Escrowed Amount : <Text style={styles.headGreen}>0 USD</Text>
                </Text>
                <Text style={styles.head}>
                  Escrowed Amount : <Text style={styles.headGreen}>0 USD</Text>
                </Text>
              </View>

              <View style={styles.detailsSec}>
                <View style={styles.detailsField}>
                  <Text style={styles.deatailsHdng}>Date</Text>
                  <Text style={styles.deatailsInfo}>02-12-2020</Text>
                </View>
                <View style={styles.detailsField}>
                  <Text style={styles.deatailsHdng}>Employer Name</Text>
                  <Text style={styles.deatailsInfo}>John Wheeler</Text>
                </View>
                <View style={styles.detailsField}>
                  <Text style={styles.deatailsHdng}>Project</Text>
                  <Text style={styles.deatailsInfo}>
                    Need a Condition Creator
                  </Text>
                </View>
                <View style={styles.detailsField}>
                  <Text style={styles.deatailsHdng}>Amount</Text>
                  <Text style={styles.deatailsInfo}>$440.00</Text>
                </View>
                <View style={styles.detailsField}>
                  <Text style={styles.deatailsHdng}>Status</Text>
                  <Text style={styles.deatailsInfo}>In Wallet</Text>
                </View>
                <View style={styles.detailsField}>
                  <Text style={styles.deatailsHdng}>Ref. ID</Text>
                  <Text style={styles.deatailsInfo}>17</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default TransactionScreen;
