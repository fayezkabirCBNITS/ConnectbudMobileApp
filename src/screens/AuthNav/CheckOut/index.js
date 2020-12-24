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

class CheckoutScreen extends Component {
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
                <Text style={styles.checkOut}>Checkout</Text>
                <View style={styles.field}>
                  <View style={styles.icon}>
                    <FontAwesome name="dollar" size={30} color="#fff" />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.label}>Milestone Amount</Text>
                    <Text style={styles.price}>500</Text>
                  </View>
                </View>
                <View style={styles.field}>
                  <View style={styles.icon}>
                    <FontAwesome5
                      name="money-bill-wave"
                      size={30}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.label}>ConnectBud Service Fee</Text>
                    <Text style={styles.price}>15</Text>
                  </View>
                </View>
                <View style={styles.field}>
                  <View style={styles.icon}>
                    <FontAwesome name="money" size={30} color="#fff" />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.label}>Total Payable Amount</Text>
                    <Text style={styles.price}>515</Text>
                  </View>
                </View>
              </View>

              {/* without CVV section */}
              <View>
                <View style={styles.nameField}>
                  <TextInput placeholder="Name" style={styles.name} />
                </View>
                <View style={styles.cardField}>
                  <TextInput
                    placeholder="Card Number"
                    keyboardType="numeric"
                    style={styles.cardNumber}
                  />
                  <TextInput
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    style={styles.month}
                  />
                </View>
                <TouchableOpacity style={styles.payBtn}>
                  <Text style={styles.payBtnText}>Pay</Text>
                </TouchableOpacity>
              </View>
              {/* without CVV section end */}

          {/* with CVV section */}
              {/* <View>
                <View style={styles.nameField}>
                  <TextInput placeholder="Name" style={styles.name} />
                </View>
                <TextInput
                  placeholder="Card Number"
                  keyboardType="numeric"
                  style={styles.cardNumber2}
                />
                <View style={styles.cardField}>
                  <TextInput
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    style={styles.monthCvv}
                  />
                  <TextInput
                    placeholder="CVV"
                    keyboardType="numeric"

                    style={styles.monthCvv}
                  />
                </View>
                <TouchableOpacity style={styles.payBtn}>
                  <Text style={styles.payBtnText}>Pay</Text>
                </TouchableOpacity>
              </View> */}
          {/* with CVV section end */}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CheckoutScreen;
