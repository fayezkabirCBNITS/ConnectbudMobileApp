import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  BackHandler
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Header from '../../../components/Header';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Feather from 'react-native-vector-icons/Feather';
import ApiUrl from '../../../config/ApiUrl';
import { makePostRequest, makeGetRequest } from '../../../services/http-connectors';

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySet: [],
      keyGen: [],
      buttonstate: true
    };
  }

  async ParentTagList(e, value) {
      if (this.state.keyGen.includes(value) == false) {
      await this.setState({
        keyGen: this.state.keyGen.concat([value])
      });
    } else {
      await this.setState({
        keyGen: this.state.keyGen.filter(function (val) {
          return val !== value;
        })
      });
    }
    if (this.state.keyGen.length > 0) {
      this.setState({
        buttonstate: false
      });
    } else {
      this.setState({
        buttonstate: true
      });
    }
  }

  handleSubmit = async () => {
    const body = {
      category_id: this.state.keyGen.toString(),
      page_type: "maintag"
    };
    let response = await makePostRequest(ApiUrl.CategorySubmit, false, body);
    if (response) {
      this.props.navigation.navigate('AddSkillScreen', {userID : this.props.navigation.state.params.userID, tagID : this.state.keyGen});
    }
  };

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this._handleAppStateChange);
    let response = await makeGetRequest(ApiUrl.FetchCategory + this.props.navigation.state.params.userID, false, "");
    if (response[0].message === "Profile exists") {
      this.props.navigation.navigate('SignInScreen')
    } else {
      await this.setState({
        categorySet: response
      });
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleAppStateChange);
  }

  _handleAppStateChange = () => {
    BackHandler.exitApp()
  };

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <View style={CommonStyles.header}>
            {/* <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Entypo name="menu" color="#71b85f" size={35} />
        </TouchableOpacity> */}
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.image}
            />
            {/* <TouchableOpacity>
          <Feather name="bell" color="#71b85f" size={30} />
        </TouchableOpacity> */}
          </View>
          <View style={CommonStyles.container}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>Select the categories:</Text>
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={this.handleSubmit}
                disabled={this.state.buttonstate}>
                <Text style={styles.continueBtnText}>continue</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scroll}
              showsVerticalScrollIndicator={false}>
              <View style={styles.categoryList}>
                {this.state.categorySet.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.tagID}
                      style={[
                        styles.categorylistedItem,
                        this.state.keyGen.includes(item.tagID)
                          ? styles.categorySelected
                          : '',
                      ]}
                      onPress={(e) => this.ParentTagList(e, item.tagID)}>
                      <Image source={{ uri: item.description }} style={styles.categoryIcon} />
                      <Text style={styles.categoryText}>{item.tagName}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CategoryScreen;
