import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';

class ProjectDetailsFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };
  render() {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaView, styles.bgColorWhite]}>
        <View style={[CommonStyles.main, styles.bgColorWhite]}>
          <StatusBar
            backgroundColor="#60a84e"
            barStyle="light-content"
            hidden={false}
            translucent={false}
          />
          <Header />
          <View style={[CommonStyles.container, styles.bgColorWhite]}>
            <ScrollView
              style={styles.scrolling}
              showsVerticalScrollIndicator={false}>
              <View style={styles.boxWrapper}>
                <Text style={styles.boxTitle}>
                  Introduction to Html5 and css3
                </Text>
                <Text style={styles.daysAgo}>13 days ago</Text>
                <Text style={styles.courseDetails}>Course Details</Text>
                <Text>
                  <Text style={styles.textSemibold}> Course Amount : </Text>{' '}
                  <Text> 20 USD</Text>
                </Text>
                <Text>
                  <Text style={styles.textSemibold}> Course Duration : </Text>{' '}
                  <Text></Text> month
                </Text>
                <Text>
                  <Text style={styles.textSemibold}> Course Date : </Text>{' '}
                  <Text>2020-12-16</Text>
                </Text>
                <Text>
                  <Text style={styles.textSemibold}> Course Syllabus : </Text>
                  <Text style={styles.syllabusText}>
                    est et sapien ullamcorper pharetra. Vestibulum erat wisi,
                    condimentum sed, commodo vitae, ornare sit amet, wisi.
                    Aenean fermentum, elit eget tincidunt condimentum, eros
                    ipsum rutrum orci, sagittis tempus
                  </Text>
                </Text>

                <TouchableOpacity style={styles.applyBtn}>
                  <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.similarJobWrapper}>
                <View style={styles.slimilarJob}>
                  <Text style={styles.similiarjobText}>
                    Similar Jobs for me
                  </Text>
                </View>
                {new Array(6).fill({fill: 'fill'}).map((data, idx) => (
                  <View key={idx} style={styles.similarList}>
                    <View style={styles.iconList}>
                      <FontAwesome
                        style={{width: 30}}
                        name="graduation-cap"
                        size={15}
                        color="#d7d7d8"
                      />
                      <Text style={styles.iconText}>Security Testing</Text>
                    </View>
                    <View style={styles.iconList}>
                      <FontAwesome
                        style={{width: 30}}
                        name="tag"
                        size={15}
                        color="#d7d7d8"
                      />
                      <Text style={styles.iconText}>
                        0 out of 1 skillset matched
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ProjectDetailsFreelancer;
