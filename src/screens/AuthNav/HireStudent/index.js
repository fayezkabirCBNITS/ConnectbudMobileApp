import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

class HireStudentsScreen extends Component {
  constructor() {
    super();
    this.state = {
      radio: [{text: 'Milestone Payment'}, {text: 'One-off Payment'}],
      select: false,
      isDateTimePickerVisible: false,
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
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
            {/* <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity> */}
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              <View style={styles.projectTab}>
                <View>
                  <Text style={styles.projectName}>
                    Project Name : Animation Designer
                  </Text>
                  <Text style={styles.budget}>
                    Budget : <Text style={styles.bold}>$540</Text> USD
                  </Text>
                </View>
                <View style={styles.userImg}>
                  <View style={styles.imgSec}>
                    <Image
                      source={require('../../../assets/images/profileImg.jpg')}
                      style={CommonStyles.image}
                    />
                  </View>
                  <Text style={styles.userName}>Utkarsh Chandra</Text>
                </View>
              </View>
              <View style={styles.collapseCntn}>
                <View style={styles.questionHead}>
                  <View style={styles.number}>
                    <Text style={styles.numberText}>1</Text>
                  </View>
                  <Text style={styles.questionText}>How you want to pay?</Text>
                </View>

                {this.state.radio.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => this.setState({select: !this.state.select})}
                    key={i}
                    style={styles.radioSec}>
                    {this.state.select ? (
                      <Fontisto
                        name="radio-btn-active"
                        size={18}
                        color="#71b85f"
                      />
                    ) : (
                      <Fontisto
                        name="radio-btn-passive"
                        size={18}
                        color="#000"
                      />
                    )}
                    <Text
                      style={
                        this.state.select
                          ? styles.radioTextGreen
                          : styles.radioText
                      }>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                ))}

                <View style={[styles.questionHead, styles.marTop20]}>
                  <View style={styles.number}>
                    <Text style={styles.numberText}>2</Text>
                  </View>
                  <Text style={styles.questionText}>
                    How many milsetone do you want to include?
                  </Text>
                </View>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>+ Add Milestone</Text>
                </TouchableOpacity>

                <View style={styles.inputCard}>
                  <View style={styles.wrap}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.des} />
                  </View>
                  <View style={styles.wrap}>
                    <Text style={styles.label}>Due Date</Text>
                    <TouchableOpacity
                      style={styles.date}
                      onPress={this.showDateTimePicker}>
                      <FontAwesome name="calendar" size={30} color="#71b85f" />
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this.handleDatePicked}
                      onCancel={this.hideDateTimePicker}
                    />
                  </View>
                  <View style={styles.wrap}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput style={styles.des} />
                    <FontAwesome
                      name="dollar"
                      color="#71b85f"
                      size={30}
                      style={{position: 'absolute', right: 15, bottom: 10}}
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Send Contract</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tab}>
                <View style={styles.summaryTab}>
                  <Text style={styles.projectName}>Summary</Text>
                </View>
                <View style={styles.summaryDetails}>
                  <View style={[styles.row, styles.bdrBtm]}>
                    <Text style={styles.head}>Total price of project :</Text>
                    <Text style={styles.price}>$ 0 USD</Text>
                  </View>
                  <View style={[styles.row, styles.bdrBtm]}>
                    <Text style={styles.head}>Connectbud service fee :</Text>
                    <Text style={styles.price}>$ 0 USD</Text>
                  </View>
                  <View style={[styles.row, styles.bdrBtm]}>
                    <Text style={styles.head}>
                      How many milestone you have :
                    </Text>
                    <Text style={styles.price}>$ 0 USD</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.head}>Total payable :</Text>
                    <Text style={styles.price}>$ 0 USD</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.tab, styles.marBtm20]}>
                <View style={styles.summaryTab}>
                  <Text style={styles.projectName}>
                    What is a Milestone Payment?
                  </Text>
                </View>
                <View style={styles.summaryDetails}>
                  <Text style={styles.milePayText}>
                    A vsystem where an employer can split the project into a
                    list of objectives and allocate certain percentage of the
                    fee to each deliverable. At the end of every target, the
                    employer can acknowledge and release the amount to the
                    student. This type of payment is usually.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default HireStudentsScreen;
