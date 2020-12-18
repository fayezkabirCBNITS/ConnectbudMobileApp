import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import axios from 'axios';
import { API_URL } from '../../config/url';

class QuestionAnswer extends Component {
  constructor() {
    super();
    this.state = {
      questionset: []
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    console.log("called")
    let body = new FormData();

    body.append("user_id", "2519");
    body.append("Flag", "Y");
    body.append("offset", "3");

    this.setState({ loadingState: true });

    await axios({
      url: API_URL + "Questions/feedQuestions",
      method: "POST",
      data: body,
    })
      .then((response) => {
        this.setState({
          questionset: response.data,
          // loadingState: false,
        });
        console.log(this.state.questionset)
      })
      .catch((error) => {
        this.setState({ loadingState: false });
      });
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

            {this.state.questionset.map((value,i)=>(
            <TouchableOpacity style={styles.qPost}>
              <Text style={styles.hdng}>
                {value.question}
              </Text>

              <View style={styles.qSec}>
                <View style={styles.imgSec}>
                {value.answers.map((item,i)=> (
                  <Image
                    source={{uri : item.user_image}}
                    style={CommonStyles.image}
                  />
                ))}
                </View>

                {value.answers.map((item,i)=> (
                <View style={{width: '80%'}}>

                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.details}>
                    {item.answer}
                  </Text>

                  <View style={styles.update}>
                    <FontAwesome
                      name="calendar"
                      color="rgba(0,0,0,0.5)"
                      size={17}
                    />
                    <Text style={styles.updateText}>{item.answer_time_new}</Text>
                  </View>

                  <View style={styles.countSec}>
                    <View style={[styles.width30, styles.bdrRight]}>
                      <Text style={styles.count}>{item.like} Likes</Text>
                    </View>
                    <View style={[styles.width30, styles.bdrRight]}>
                      <Text style={styles.count}>{item.total_answers} Answer</Text>
                    </View>
                    <View style={styles.width30}>
                      <Text style={styles.count}>{item.views} Views</Text>
                    </View>
                  </View>
                </View>
                ))}
              </View>
            </TouchableOpacity> 
              ))}

          </View>
        </ScrollView>
      </View>
    );
  }
}

export default QuestionAnswer;
