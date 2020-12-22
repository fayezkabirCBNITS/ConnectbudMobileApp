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
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-community/picker';

class BankDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      typeValue: '',
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
              <Text style={styles.heading}>Enter Bank Details</Text>

              <View style={styles.slctCntry}>
                <Text style={styles.slctCntryText}>Select Country</Text>
                <View style={styles.countryPicker}>
                  <Picker
                    style={{width: '100%', height: 45}}
                    selectedValue={this.state.typeValue}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({typeValue: itemValue})
                    }>
                    <Picker.Item label="USA" value="USA" />
                    <Picker.Item label="India" value="India" />
                  </Picker>
                </View>
              </View>

              <View style={[styles.slctCntry, styles.marVer20]}>
                <View>
                  <Text style={styles.slctCntryText}>Account Holder *</Text>
                  <TextInput
                    placeholder="Enter Full Name"
                    style={styles.input}
                  />
                </View>

                <View>
                  <Text style={styles.slctCntryText}>Account Type *</Text>
                  <View style={styles.accountType}>
                    <Picker
                      style={{width: '100%', height: 50}}
                      selectedValue={this.state.typeValue}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({typeValue: itemValue})
                      }>
                      <Picker.Item label="Please Select" />
                      <Picker.Item label="Current" value="Current" />
                      <Picker.Item label="Saving" value="Saving" />
                      <Picker.Item label="Business" value="Business" />
                    </Picker>
                  </View>
                </View>

                <View>
                  <Text style={styles.slctCntryText}>Routing Number *</Text>
                  <TextInput placeholder="Enter Code" style={styles.input} />
                </View>

                <View>
                  <Text style={styles.slctCntryText}>Account Number *</Text>
                  <TextInput
                    placeholder="Account Number"
                    style={[styles.input, styles.marBtm0]}
                  />
                </View>

                <TouchableOpacity style={styles.submitBtn}>
                  <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default BankDetailScreen;
