import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import StatusBar from '../../../components/StatusBar';
import Header from '../../../components/Header';
import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import QualityTalent from '../../../components/QualityTalent';
import PopularServies from '../../../components/PopularServies';
import RBSheet from 'react-native-raw-bottom-sheet';

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
                  placeholder="Try 'Coding Class Tutor'"
                  style={styles.searchInput}
                />
                <View style={styles.searchIcon}>
                  <Fontisto name="search" color="#000" size={20} />
                </View>
              </View>

              <View style={styles.loginHead}>
                <TouchableOpacity
                  onPress={() => this.RBSheet.open()}
                  style={styles.filterSec}
                  style={styles.mainLoginBtn}>
                  <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity activeOpacity={1} style={styles.width100}>
              <Image
                source={require('../../../assets/images/homeBnr.jpg')}
                style={styles.coverImage}
              />
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

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={170}
            openDuration={600}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <View style={styles.btmSheet}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignInScreen')} style={styles.loginBtn}>
                <Text style={styles.loginBtnText2}>College Student Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignInScreen')} style={styles.loginBtn2}>
                <Text style={styles.loginBtnText2}>Hire a College Student</Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
