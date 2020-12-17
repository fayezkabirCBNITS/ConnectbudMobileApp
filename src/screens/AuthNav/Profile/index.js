import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Overview from '../../../components/Overview';
import Portfolio from '../../../components/Portfolio';
import WorkHistory from '../../../components/WorkHistory';
import axios from 'axios';

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Overview'},
        {key: 'second', title: 'Portfolio'},
        {key: 'third', title: 'Work History'},
      ],
      profiledataset: [],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    await axios({
      url: 'https://api.connectbud.com/expertProfile/Utkarsh-Sarkar-15',
      method: 'GET',
    })
      .then((response) => {
        this.setState({
          profiledataset: response.data,
        });
      })
      .catch(() => {});
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {this.state.profiledataset.map((item, i) => (
              <ImageBackground
                // source={require('../../../assets/images/bnr.jpg')}
                source={{uri: item.cover_image}}
                style={styles.coverImage}>
                <TouchableOpacity style={CommonStyles.hanPosition}>
                  <Entypo name="menu" color="#71b85f" size={35} />
                </TouchableOpacity>
                <View style={styles.userImg}>
                  <Image
                    source={{uri: item.user_image}}
                    style={CommonStyles.usrImage}
                  />
                  {/* <TouchableOpacity style={CommonStyles.userPhoto}>
                  <FontAwesome name="camera" color="#71b85f" size={22} />
                </TouchableOpacity> */}
                </View>
                {/* <TouchableOpacity style={styles.camPosition}>
                <FontAwesome name="camera" color="#71b85f" size={22} />
              </TouchableOpacity> */}
              </ImageBackground>
            ))}

            {this.state.profiledataset.map((item, i) => (
              <ScrollView
                style={{flexDirection: 'row', marginTop: -80}}
                showsHorizontalScrollIndicator={false}
                horizontal>
                <View style={styles.details}>
                  <Text style={styles.userInfoHead}>Name</Text>
                  <Text style={styles.userInfoDetails}>
                    {item.first_name} {item.last_name}
                  </Text>
                </View>

                <View style={styles.details}>
                  <Text style={styles.userInfoHead}>College</Text>
                  <Text style={styles.userInfoDetails}>{item.college}</Text>
                </View>

                <View style={styles.details}>
                  <Text style={styles.userInfoHead}>Department</Text>
                  <Text style={styles.userInfoDetails}>{item.department}</Text>
                </View>
              </ScrollView>
            ))}

            <View style={styles.tabSec}>
              <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                  first: Overview,
                  second: Portfolio,
                  third: WorkHistory,
                })}
                onIndexChange={(index) => this.setState({index})}
                style={{flex: 1, justifyContent: 'center'}}
                renderTabBar={(props) => {
                  return (
                    <TabBar
                      {...props}
                      renderLabel={({route, focused, color}) => (
                        <Text style={focused ? styles.label : styles.label2}>
                          {route.title}
                        </Text>
                      )}
                      indicatorStyle={styles.indicator}
                      style={styles.tab}
                      inactiveColor={'#a5a5b4'}
                      activeColor={'#6e83e3'}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;
