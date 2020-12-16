import React, {Component} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import StatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import QualityTalent from '../../../components/QualityTalent'
import PopularServies from '../../../components/PopularServies';

class HomeScreen extends Component {
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
          <Header />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[CommonStyles.container, styles.themeColor]}>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder="Try 'Coading Class Tutor'"
                  style={styles.searchInput}
                />
                <View style={styles.searchIcon}>
                  <Fontisto name="search" color="#000" size={20} />
                </View>
              </View>

              <View style={styles.loginHead}>
                <TouchableOpacity style={styles.loginBtn}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    College Student Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    Hire a College Student
                  </Text>
                </TouchableOpacity>
              </View>             
            </View>
            <TouchableOpacity activeOpacity={1} style={{width: '100%',}}>
                <Image source={require('../../../assets/images/homeBnr.jpg')} style={styles.coverImage}/>
              </TouchableOpacity>

              <View style={styles.marVer15}>
                <View style={CommonStyles.container}>
                <Text style={styles.hdng}>Find some of our quality talent</Text>
                </View>
               
                <QualityTalent />
              </View>

              <View style={styles.marVer15}>
                <View style={CommonStyles.container}>
                <Text style={styles.hdng}>Popular Professional Servies</Text>
                </View>
               
                <PopularServies />
              </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
import style from '../../../components/Header/style';

export default HomeScreen;
