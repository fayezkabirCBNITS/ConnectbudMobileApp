import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import StatusBar from '../../../components/StatusBar';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

class FreeContactScreen extends Component {
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
              <Text style={styles.heading}>Ongoing Projects</Text>
              {/* project 1 */}
              <Collapse style={styles.collapse}>
                <CollapseHeader>
                  <View style={styles.questions}>
                    <Text style={styles.questionsText}>Project Name :</Text>
                    <Text style={styles.questionsTextGreen}>
                      Need a Condition Creator
                    </Text>
                  </View>
                </CollapseHeader>
                <CollapseBody>
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
                      <Text style={styles.deatailsHdng}>Amount</Text>
                      <Text style={styles.deatailsInfo}>$440.00</Text>
                    </View>
                    <View style={styles.detailsField}>
                      <Text style={styles.deatailsHdng}>Action</Text>
                      <TouchableOpacity style={styles.paidBtn}>
                        <Text style={styles.paidText}>$ Paid</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={styles.notPaidBtn}>
                        <Text style={styles.paidText}>$ Not Paid</Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </CollapseBody>
              </Collapse>

              {/* project 2 */}
              <Collapse style={styles.collapse}>
                <CollapseHeader>
                  <View style={styles.questions}>
                    <Text style={styles.questionsText}>Project Name :</Text>
                    <Text style={styles.questionsTextGreen}>
                      Physics Tutoring
                    </Text>
                  </View>
                </CollapseHeader>
                <CollapseBody>
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
                      <Text style={styles.deatailsHdng}>Amount</Text>
                      <Text style={styles.deatailsInfo}>$440.00</Text>
                    </View>
                    <View style={styles.detailsField}>
                      <Text style={styles.deatailsHdng}>Action</Text>
                      <TouchableOpacity style={styles.paidBtn}>
                        <Text style={styles.paidText}>$ Paid</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={styles.notPaidBtn}>
                        <Text style={styles.paidText}>$ Not Paid</Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>

                  <View style={styles.detailsSec}>
                    <View style={styles.detailsField}>
                      <Text style={styles.deatailsHdng}>Type of Project</Text>
                      <Text style={styles.deatailsInfo}>Milestone 2</Text>
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
                      <Text style={styles.deatailsHdng}>Amount</Text>
                      <Text style={styles.deatailsInfo}>$440.00</Text>
                    </View>
                    <View style={styles.detailsField}>
                      <Text style={styles.deatailsHdng}>Action</Text>
                      {/* <TouchableOpacity style={styles.paidBtn}>
                        <Text style={styles.paidText}>$ Paid</Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity style={styles.notPaidBtn}>
                        <Text style={styles.paidText}>$ Not Paid</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </CollapseBody>
              </Collapse>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default FreeContactScreen;
