import React, {Component} from 'react';
import {View, Text, SafeAreaView , TouchableOpacity} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";

class InternshipJobs extends Component {
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              new Array(2).fill({ hi: "hi" }).map((data, idx) => (

                <TouchableOpacity key={idx}>
                  <View style={CommonStyles.container}>
                    <View style={styles.subjectWrapper}>
                      <View style={styles.leftSection}>
                        <FontAwesome
                          name="tv"
                          color="#000"
                          size={25}
                        />
                      </View>
                      <View style={styles.rightSection}>
                        <Text style={styles.boxTitle}>Introduction to java</Text>
                        <Text style={styles.boxTexts}>this is an introductory-level course where students will learn the basic of
                            java programming to build software.then will learn to use.
                        </Text>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <Entypo
                            name="time-slot"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>13 hrs ago</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="tag"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>Java</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="user"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>1 out of 1 skillset matches</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="search-plus"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>0 applied</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.moneyContainer]}>
                          <Text style={styles.usdText}>20 USD</Text>
                          <Text style={styles.inrtxt}>(1500 INR)</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              ))
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default InternshipJobs;
