import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Alert,
  Image,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import HireTutor from '../../../components/HireTutor';
import PostProject from '../../../components/PostProject';
import PostInternship from '../../../components/PostInternship';
import SearchClgStu from '../../../components/SearchClgStu';
import Header from '../../../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import OnlineClassEmployer from '../../../components/OnlineCodingClassEmployer';
//
import {connect} from 'react-redux';
//import {updateUserDetails} from "../../../redux/actions/user-data";
import {showLoader} from '../../../redux/actions/loader-data';
import {withNavigation} from 'react-navigation';

class EmployeeInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'Hire a Tutor'},
        {key: 'second', title: 'Post a Project'},
        {key: 'third', title: 'Post an Interships / Jobs'},
        {key: 'fourth', title: 'Search for College Students'},
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  renderScene = ({route}) => {
    switch (route.title) {
      case 'Hire a Tutor':
        return <HireTutor />; // passing data as data prop
      case 'Post a Project':
        return <PostProject />;
      case 'Post an Interships / Jobs':
        return <PostInternship />;
      case 'Search for College Students':
        return <SearchClgStu />;
      default:
        return null;
    }
  };
  // componentDidMount() {
  //   console.log('did mount====================');
  //   const {navigation} = this.props;
  //   this.focusListener = navigation.addListener('didFocus', () => {
  //     console.log('did mount focus====================');

  //     BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  //   });
  //   BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  // }

  // componentWillUnmount() {
  //   this.focusListener.remove();
  //   BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  // }
  // componentDidUpdate() {
  //   console.log('did update====');
  // }
  // backPressed = () => {
  //   Alert.alert(
  //     'Exit ConnectBud',
  //     'Do you want to exit?',
  //     [
  //       {
  //         text: 'No',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {text: 'Yes', onPress: () => BackHandler.exitApp()},
  //     ],
  //     {cancelable: false},
  //   );
  //   return true;
  // };
  // multipleFunction = async () => {
  //   this.focusListener.remove();
  //   BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  //   this.props.navigation.openDrawer();
  // };
  render() {
    const {userDeatailResponse} = this.props;

    // console.log('user details==========', userDeatailResponse);
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.image}
            />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
              }>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.tabSec}>
              <TabView
                navigationState={this.state}
                // renderScene={SceneMap({
                //   first: HireTutor,
                //   second: PostProject,
                //   third: PostInternship,
                //   forth: SearchClgStu,
                // })}
                renderScene={this.renderScene}
                onIndexChange={(index) => this.setState({index})}
                style={{flex: 1, justifyContent: 'center'}}
                renderTabBar={(props) => {
                  return (
                    <TabBar
                      tabStyle={{width: 'auto'}}
                      scrollEnabled={true}
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

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //fetchCartData: () => dispatch(fetchCartData()),
    //updateStoreId: (id) => dispatch(updateStoreId(id)),
    //showLoader: (text) => dispatch(showLoader(text)),
    // hideLoader: () => dispatch(hideLoader()),
  };
};

export default connect(mapStateToProps, null)(withNavigation(EmployeeInner));
