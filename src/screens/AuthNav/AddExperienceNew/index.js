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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';

class AddExperienceNew extends Component {
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
            <TouchableOpacity style={CommonStyles.hambarIcon}>
              <AntDesign name="left" color="#71b85f" size={30} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            {/* <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#000" size={30} />
            </TouchableOpacity> */}
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              >
              <View>
                <Text style={styles.heading}>Add Your Project Details</Text>

                <View>
                  <Text style={styles.label}>* Project Title :</Text>
                  <TextInput
                    placeholder="Project Title : Java Tutorial"
                    style={styles.textInput}
                  />
                </View>

                <View>
                  <Text style={styles.label}>* Project Description :</Text>
                  <TextInput
                    placeholder="Project Description e.g. - Introduction to Java, Basic Oops Concept..."
                    style={styles.textArea}
                    multiline
                  />
                </View>

                <View>
                  <Text style={styles.label}>* Project Url :</Text>
                  <TextInput
                    placeholder="e.g.http://github.com"
                    style={styles.textInput}
                  />
                </View>

                <View>
                  <Text style={styles.label}>* Additional Url(s) :</Text>
                  <View style={styles.additionalSec}>
                    <TextInput
                      placeholder="e.g.http://github.com"
                      style={styles.additional}
                    />
                    <TouchableOpacity style={styles.plusIcon}>
                      <AntDesign name="plus" size={50} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.addBtn}>
                  <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AddExperienceNew;
