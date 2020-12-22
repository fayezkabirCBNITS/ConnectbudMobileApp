import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import styles from './styles';
import CommonStyles from '../../../../CommonStyles';
import StatusBar from '../../../components/StatusBar';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class ChatListScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    // const renderChat = () => (
    //   <View>
    //     <View style={styles.receive}>
    //       <View style={styles.userImgR}>
    //         <Image
    //           source={require('../../../assets/images/profileImg.jpg')}
    //           style={CommonStyles.image}
    //         />
    //       </View>
    //       <View style={styles.revChat}>
    //         <Text style={styles.revChatText}>
    //           swarup kumar chakraborty gfh swarup kumar chakraborty nbjh swarup
    //           kumar chakraborty hvh swarup kumar chakraborty hgf swarup kumar
    //           chakraborty hgjh swarup kumar chakraborty
    //         </Text>
    //         <Text style={styles.revDate}>11/12/2020</Text>
    //       </View>
    //     </View>

    //     <View style={styles.send}>
    //       <View style={styles.sndChat}>
    //         <Text style={styles.sndChatText}>Send</Text>
    //         <Text style={styles.sndDate}>12/20/2020</Text>
    //       </View>
    //     </View>
    //   </View>
    // );
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <StatusBar />
          {/* header section */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={40}
                color="#fff"
              />
            </TouchableOpacity>
            <View style={styles.headerImgSec}>
              <Image
                source={require('../../../assets/images/profileImg.jpg')}
                style={CommonStyles.image}
              />
            </View>

            <Text style={styles.chatUserName}>The Kop Fans</Text>
          </View>
          {/* header section end */}

          {/* <FlatList
            //inverted
            // ref={(flatList) => (this.flatList = flatList)}
            // onContentSizeChange={() => {
            //   this.flatList.scrollToEnd({animated: true});
            // }}
            style={{flex: 1, marginBottom: 60, paddingHorizontal: '5%'}}
            // data={this.state.currentChats}
            //ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={renderChat}
            showsVerticalScrollIndicator={false}
            // keyExtractor={(item) => item._id}
          /> */}

          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={CommonStyles.container}>
                <View>
                  <View style={styles.receive}>
                    <View style={styles.userImgR}>
                      <Image
                        source={require('../../../assets/images/profileImg.jpg')}
                        style={CommonStyles.image}
                      />
                    </View>
                    <View style={styles.revChat}>
                      <Text style={styles.revChatText}>
                        swarup kumar chakraborty gfh swarup kumar chakraborty
                        nbjh swarup kumar chakraborty hvh swarup kumar
                        chakraborty hgf swarup kumar chakraborty hgjh swarup
                        kumar chakraborty
                      </Text>
                      <Text style={styles.revDate}>11/12/2020</Text>
                    </View>
                  </View>

                  <View style={styles.send}>
                    <View style={styles.sndChat}>
                      <Text style={styles.sndChatText}>Send</Text>
                      <Text style={styles.sndDate}>12/20/2020</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <View style={styles.chatInputSec}>
            <View style={styles.inputHead}>
              <TextInput
                placeholder="Type a message"
                style={[styles.input, {color: '#000000'}]}
              />
              <TouchableOpacity style={styles.icon}>
                <FontAwesome name="send" color="#fff" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ChatListScreen;
