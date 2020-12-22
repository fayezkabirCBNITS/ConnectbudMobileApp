import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

class MyQuestionScreen extends Component {
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
              <Text style={styles.heading}>Your Questions</Text>
              <View>
                <Collapse style={styles.collapse}>
                  <CollapseHeader>
                    <View style={styles.questions}>
                      <Text style={styles.questionsText}>
                        How to study online in lokedown?
                      </Text>
                      <AntDesign name="delete" size={25} color="#fff" />
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View style={styles.questionsWrap}>
                      <View style={styles.questionsMain}>
                        <View style={styles.imgSec}>
                          <Image
                            source={require('../../../assets/images/profileImg.jpg')}
                            style={CommonStyles.image}
                          />
                        </View>
                        <View style={styles.answerSec}>
                          <Text style={styles.userName}>John Wheeler</Text>
                          <Text style={styles.answer}>Answer</Text>
                        </View>
                      </View>
                    </View>
                  </CollapseBody>
                </Collapse>

                <Collapse isCollapsed={true} style={styles.collapse}>
                  <CollapseHeader>
                    <View style={styles.questions}>
                      <Text style={styles.questionsText}>
                        How to improve our immunity?
                      </Text>
                      <AntDesign name="delete" size={25} color="#fff" />
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View style={styles.questionsWrap}>
                      <View style={styles.questionsMain}>
                        <View style={styles.imgSec}>
                          <Image
                            source={require('../../../assets/images/profileImg.jpg')}
                            style={CommonStyles.image}
                          />
                        </View>
                        <View style={styles.answerSec}>
                          <Text style={styles.userName}>John Wheeler</Text>
                          <Text style={styles.answer}>Answer</Text>
                        </View>
                      </View>
                    </View>
                  </CollapseBody>
                </Collapse>
              </View>

              <View style={styles.similarQ}>
                <Text style={styles.heading2}>Similar Questions</Text>
                <View>
                  <Collapse style={styles.collapse}>
                    <CollapseHeader>
                      <View style={styles.questions}>
                        <Text style={styles.questionsText}>
                          How to study online in lokedown?
                        </Text>
                        <AntDesign name="delete" size={25} color="#fff" />
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View style={styles.questionsWrap}>
                        <View style={styles.questionsMain}>
                          <View style={styles.imgSec}>
                            <Image
                              source={require('../../../assets/images/profileImg.jpg')}
                              style={CommonStyles.image}
                            />
                          </View>
                          <View style={styles.answerSec}>
                            <Text style={styles.userName}>John Wheeler</Text>
                            <Text style={styles.answer}>Answer</Text>
                          </View>
                        </View>
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default MyQuestionScreen;
