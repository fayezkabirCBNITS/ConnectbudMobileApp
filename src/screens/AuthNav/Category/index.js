import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoy: [],
      dummyCategoryArr: [
        {
          cat: 'software development',
          icon: <FontAwesome name="connectdevelop" color="#000" size={35} />,
        },
        {
          cat: 'online coding',
          icon: <FontAwesome name="connectdevelop" color="#000" size={35} />,
        },
        {
          cat: 'homework',
          icon: <FontAwesome name="home" color="#000" size={35} />,
        },
        {
          cat: 'design',
          icon: <FontAwesome name="connectdevelop" color="#000" size={35} />,
        },
        {
          cat: 'homework',
          icon: <FontAwesome name="home" color="#000" size={35} />,
        },
        {
          cat: 'Language',
          icon: <FontAwesome name="language" color="#000" size={35} />,
        },
        {
          cat: 'music & arts',
          icon: <FontAwesome name="music" color="#000" size={35} />,
        },
        {
          cat: 'homework',
          icon: <FontAwesome name="home" color="#000" size={35} />,
        },
        {
          cat: 'fitness',
          icon: <FontAwesome name="connectdevelop" color="#000" size={35} />,
        },
        {
          cat: 'music & arts',
          icon: <FontAwesome name="connectdevelop" color="#000" size={35} />,
        },
        {
          cat: 'fitness',
          icon: <FontAwesome name="connectdevelop" color="#000" size={35} />,
        },
      ],
    };
  }
  categorySelection = (index) => {
    const arr = this.state.selectedCategoy;
    arr.push(index);
    this.setState({selectedCategoy: arr});
  };
  gotoNextScreen = (_) => {
    this.props.navigation.navigate('AddSkillScreen');
  };

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <View style={styles.header}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <Entypo name="menu" color="#71b85f" size={35} />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.image}
        />
        <TouchableOpacity>
          <Feather name="bell" color="#71b85f" size={30} />
        </TouchableOpacity>
      </View>
          <View style={CommonStyles.container}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>Select the Category.</Text>
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={this.gotoNextScreen}>
                <Text style={styles.continueBtnText}>continue</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scroll}
              showsVerticalScrollIndicator={false}>
              <View style={styles.categoryList}>
                {this.state.dummyCategoryArr.map((data, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.categorylistedItem,
                      this.state.selectedCategoy.includes(idx)
                        ? styles.categorySelected
                        : '',
                    ]}
                    onPress={() => this.categorySelection(idx)}>
                    <View style={styles.categoryIcon}>{data.icon}</View>
                    <Text style={styles.categoryText}>{data.cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CategoryScreen;
