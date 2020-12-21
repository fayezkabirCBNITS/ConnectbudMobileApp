import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      chatList: [
        {
          img: require('../../../assets/images/profileImg.jpg'),
          name: 'The Kop Fans',
        },
        {
          img: require('../../../assets/images/userPro.jpg'),
          name: 'Anna Bella',
        },
        {
          img: require('../../../assets/images/profileImg.jpg'),
          name: 'The Kop Fans',
        },
        {
          img: require('../../../assets/images/userPro.jpg'),
          name: 'Anna Bella',
        },
        {
          img: require('../../../assets/images/profileImg.jpg'),
          name: 'The Kop Fans',
        },
        {
          img: require('../../../assets/images/userPro.jpg'),
          name: 'Anna Bella',
        },
        {
          img: require('../../../assets/images/profileImg.jpg'),
          name: 'The Kop Fans',
        },
        {
          img: require('../../../assets/images/userPro.jpg'),
          name: 'Anna Bella',
        },
        {
          img: require('../../../assets/images/profileImg.jpg'),
          name: 'The Kop Fans',
        },
        {
          img: require('../../../assets/images/userPro.jpg'),
          name: 'Anna Bella',
        },
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* header section */}
          <View style={CommonStyles.header}>
            <TouchableOpacity
              style={CommonStyles.hambarIcon}
              onPress={() => this.props.navigation.openDrawer()}>
              <Entypo name="menu" color="#71b85f" size={35} />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={CommonStyles.imageHdr}
            />
            <TouchableOpacity style={CommonStyles.bellIcon}>
              <Feather name="bell" color="#71b85f" size={30} />
            </TouchableOpacity>
          </View>
          {/* header section end */}

          <View style={CommonStyles.container}>
            <View style={styles.searchBar}>
              <TextInput
                placeholder='Search for "Name, Skills & Colleges"'
                style={styles.searchInput}
              />
              <View style={styles.searchIcon}>
                <Fontisto name="search" color="#71b85f" size={20} />
              </View>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={CommonStyles.container}>
              {this.state.chatList.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.chatCard}
                  onPress={() =>
                    this.props.navigation.navigate('ChatListScreen')
                  }>
                  <View style={styles.imgSec}>
                    <Image source={item.img} style={styles.chatImage} />
                    <View style={styles.online} />
                  </View>

                  <View style={styles.details}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text
                      style={styles.userChat}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Great! Thank you So much
                    </Text>
                  </View>

                  <View style={styles.count}>
                    <Text style={styles.chatTime}>YESTERDAY</Text>
                    <View style={styles.unread}>
                      <Text style={styles.unreadText}>25</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default ChatScreen;
