import React, { Component } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import CommonStyle from '../../../../CommonStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, ProgressBar, Colors } from 'react-native-paper';
import Header from '../../../components/Header'

class SearchProjectStudents extends Component {

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyle.safeAreaView}>
        <View style={CommonStyle.main}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Header />
              <Text style={styles.Heading} ><Text style={{ color: '#000' }}>Project :</Text> UI/UX Designer-Full time Remote Position</Text>
              <Divider style={styles.divider} />

              {
                new Array(3).fill().map((item, idx) => (

                  < View style={CommonStyle.container} key={idx}>
                    <View style={styles.subContainer}>
                      <View style={styles.subjectWrapper}>
                        <View style={[styles.leftSection]}>
                          <Image
                            source={require('../../../assets/images/userPro.jpg')}
                            style={styles.userImg}
                          />
                        </View>
                        <View style={[styles.rightSection]}>
                          <Text style={styles.boxTitle}>Angad Kumar Choudhary</Text>
                          <Text style={styles.subTitle}>MS in Softare Engineering</Text>

                          <View style={{ marginBottom: 20 }}>
                            <Text style={{ marginVertical: 5, fontFamily: 'Poppins-Rgular', }}>Progressing 60%</Text>
                            <ProgressBar progress={0.6} color={'#71b85f'} />
                          </View>

                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '40%', flexDirection: 'row' }}>
                              <FontAwesome
                                name="graduation-cap"
                                color="#71b85f"
                                size={15}
                              />
                              <Text style={styles.iconText}>Institute :</Text>
                            </View>
                            <View style={{ width: '60%' }}>
                              <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> San Jose </Text>
                            </View>
                          </View>

                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '40%', flexDirection: 'row' }}>
                              <FontAwesome
                                name="institution"
                                color="#71b85f"
                                size={15}
                              />
                              <Text style={styles.iconText}>Prefered :</Text>
                            </View>
                            <View style={{ width: '60%' }}>
                              <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}> Data Science</Text>
                            </View>
                          </View>

                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '40%', flexDirection: 'row', marginLeft: -5, }}>
                              <Entypo
                                name="location-pin"
                                color="#71b85f"
                                size={25}
                              />
                              <Text style={styles.iconText}>Location : </Text>
                            </View>
                            <View style={{ width: '60%' }}>
                              <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold' }}>   Kolkata, India</Text>
                            </View>
                          </View>

                          <View style={styles.btnGrp}>
                            <Text style={[styles.subBtn1, styles.iconText]}>Skills :</Text>
                            <Text style={styles.subBtn}>Python</Text>
                            <Text style={styles.subBtn}>Hive</Text>
                          </View>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          // onPress={() => this.handleSubmit()}
                          style={[styles.authBtn]}>
                          <Text style={styles.authBtnText}>Invite</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                ))
              }
            </View>
          </ScrollView>
        </View>
      </SafeAreaView >
    )
  }
}

export default SearchProjectStudents
