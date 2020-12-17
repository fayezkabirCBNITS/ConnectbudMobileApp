import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  UIManager,
  Animated,
  Image,
  LayoutAnimation,
  Platform,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
const width = Dimensions.get('window').width;

class Animated_Item extends Component {
  constructor() {
    super();

    this.animatedValue = new Animated.Value(0);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0.5,
      duration: 510,
      useNativeDriver: true,
    }).start(() => {
      this.props.afterAnimationComplete();
    });
  }

  deleteItem = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 510,
      useNativeDriver: true,
    }).start(() => {
      this.props.deleteItem(this.props.item.id);
    });
  };

  render() {
    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width],
    });

    const opacity_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Animated.View
        style={[
          //styles.singleItemView,
          styles.formGroup1,
          {
            transform: [{translateX: translate_Animation_Object}],
            opacity: opacity_Animation_Object,
          },
        ]}>
        {/* <Text style={styles.singleItemText}>Item {this.props.item.text}</Text> */}

        <View style={styles.formSubGroup2}>
          <TextInput
            returnKeyType="done"
            placeholder="http://facebook.com/..."
            style={styles.inputGroup}
            keyboardType="default"
          />
        </View>
        <View style={styles.formSubGroup1}>
          <TouchableOpacity onPress={this.deleteItem}>
            <FontAwesome name="minus" size={25} color="#d7d7d8" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

class AddExperienceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {valueArray: [], disabled: false};
    this.addNewElement = false;
    this.index = 0;
  }

  static navigationOptions = {
    headerShown: false,
  };

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({disabled: false});
  };
  add_New_View = () => {
    this.addNewElement = true;
    const newlyAddedValue = {id: 'id_' + this.index, text: this.index + 1};

    this.setState({
      disabled: true,
      valueArray: [...this.state.valueArray, newlyAddedValue],
    });
  };

  remove_Selected_Item(id) {
    this.addNewElement = false;
    const newArray = [...this.state.valueArray];
    newArray.splice(
      newArray.findIndex((ele) => ele.id === id),
      1,
    );

    this.setState(
      () => {
        return {
          valueArray: newArray,
        };
      },
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      },
    );
  }
  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <CommonStatusBar />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color="#71b85f"
              />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.image}
            />
            <View style={{width: 35}}></View>
          </View>
          <View style={CommonStyles.container}>
            <Text style={styles.portfolioHead}>Add Your Project Details</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputHead}>* Project Title: </Text>

              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, {width: '100%'}]}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="Project Title: Java Tutorial"
                    style={styles.inputGroup}
                    keyboardType="default"
                  />
                </View>
              </View>

              <Text style={styles.inputHead}>* Project Description: </Text>

              <View
                style={[
                  styles.formGroup1,
                  {
                    height: 180,
                  },
                ]}>
                <View
                  style={[
                    styles.formSubGroup2,
                    {
                      height: 180,
                      width: '100%',
                    },
                  ]}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="Project Description e.g. - Introduction to Java,
                    Basic Oops Concept..."
                    style={[
                      styles.inputGroup,
                      {
                        height: 180,
                        justifyContent: 'flex-start',
                        textAlignVertical: 'top',
                      },
                    ]}
                    keyboardType="default"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>
              </View>

              <Text style={styles.inputHead}>* Project Url: </Text>

              <View style={styles.formGroup1}>
                <View style={[styles.formSubGroup2, {width: '100%'}]}>
                  <TextInput
                    returnKeyType="done"
                    placeholder="e.g.http://github.com/"
                    style={styles.inputGroup}
                    keyboardType="default"
                  />
                </View>
              </View>

              <Text style={styles.inputHead}>* Additional Url(s):</Text>

              <View style={styles.formGroup11}>
                <View style={[styles.formGroup1, {width: '85%'}]}>
                  <View style={styles.formSubGroup2}>
                    <TextInput
                      returnKeyType="done"
                      placeholder="http://facebook.com/..."
                      style={styles.inputGroup}
                      keyboardType="default"
                    />
                  </View>
                </View>

                <View style={[styles.formSubGroup11]}>
                  <TouchableOpacity onPress={() => this.add_New_View()}>
                    <FontAwesome name="plus" size={25} color="#d7d7d8" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{width: '100%'}}>
                <ScrollView
                  ref={(scrollView) => (this.scrollView = scrollView)}
                  onContentSizeChange={() => {
                    this.addNewElement && this.scrollView.scrollToEnd();
                  }}>
                  <View style={{flex: 1, padding: 4}}>
                    {this.state.valueArray.map((ele) => {
                      return (
                        <Animated_Item
                          key={ele.id}
                          item={ele}
                          deleteItem={(id) => this.remove_Selected_Item(id)}
                          afterAnimationComplete={this.afterAnimationComplete}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.authBtn, {marginTop: 10}]}>
                <Text style={styles.authBtnText}>Update</Text>
                {this.state.showLoader && (
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                    style={CommonStyles.loader}
                  />
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AddExperienceScreen;
