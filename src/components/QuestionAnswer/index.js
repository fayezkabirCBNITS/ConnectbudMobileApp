import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

class QuestionAnswer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={CommonStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={CommonStyles.container}>
            <View style={styles.post}>
              <Text style={styles.hdng}>Post your questions</Text>
              <TextInput
                placeholder="Type your questions"
                style={styles.questionInput}
              />
              <TouchableOpacity style={styles.sendBtn}>
                <Text style={styles.sendBtnText}>Send</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.qPost}>
              <Text style={styles.hdng}>
                What are the different students club you participated in USA?
              </Text>

              <View style={styles.qSec}>
                <View style={styles.imgSec}>
                  <Image
                    source={require('../../assets/images/userPro.jpg')}
                    style={CommonStyles.image}
                  />
                </View>
                <View style={{width: '80%'}}>
                  <Text style={styles.name}>Nisha Games</Text>
                  <Text style={styles.details}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever.
                  </Text>

                  <View style={styles.update}>
                    <FontAwesome
                      name="calendar"
                      color="rgba(0,0,0,0.5)"
                      size={17}
                    />
                    <Text style={styles.updateText}>Updated 5 days ago</Text>
                  </View>

                  <View style={styles.countSec}>
                    <View style={[styles.width30, styles.bdrRight]}>
                      <Text style={styles.count}>0 Likes</Text>
                    </View>
                    <View style={[styles.width30, styles.bdrRight]}>
                      <Text style={styles.count}>0 Answer</Text>
                    </View>
                    <View style={styles.width30}>
                      <Text style={styles.count}>0 Views</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>            
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default QuestionAnswer;
