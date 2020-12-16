import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from "react-native-vector-icons/Entypo";
import styles from './styles'

class SearchClgStu extends Component {
  constructor() {
    super();
    this.state = {
      showSkills: false,
      skillsData: [
        { title: 'C' },
        { title: 'JAVA' },
        { title: 'C++' },
        { title: 'C#' },
      ],
    };
  }

  handleSkills = async () => {
    this.setState({ showSkills: !this.state.showSkills });
  };

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const renderSkillItems = ({ item }) => (
      <TouchableOpacity style={styles.headSec}>
        <View style={styles.details}>
          <Text style={styles.flastListHead}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>

          <Text style={styles.title}>Search</Text>
          <View style={styles.skillView}>
            <View style={[styles.formGroup1]}>
              <View style={[styles.formSubGroup2, { flexWrap: 'wrap' }]}>
                <TextInput
                  returnKeyType="done"
                  placeholder="Java"
                  style={styles.inputGroup}
                  keyboardType="default"
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <FontAwesome
                  name="angle-down"
                  size={28}
                  color="#d7d7d8"
                  onPress={() => this.handleSkills()}
                />
              </View>
            </View>
          </View>
          {this.state.showSkills === true ? (
            <View style={[styles.flatList, { marginTop: -15 }]}>
              <FlatList
                data={this.state.skillsData}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={renderSkillItems}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : (
              <></>
            )}
          <Text style={styles.title}>College Student List</Text>
          <TouchableOpacity style={{ marginTop: -5 }}>
            <View style={CommonStyles.container}>
              <View style={styles.subjectWrapper}>
                <View style={[styles.leftSection]}>
                  <Image
                    source={require('../../assets/images/userPro.jpg')}
                    style={styles.userImg}
                  />
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.boxTitle}>Angad Kumar</Text>
                  <View style={[styles.flexstyle, styles.timeAgo]}>

                    <FontAwesome
                      name="graduation-cap"
                      color="#71b85f"
                      size={15}
                    />
                    <Text style={styles.iconText}>Institute :<Text> San Jose</Text></Text>
                  </View>
                  <View style={[styles.flexstyle, styles.timeAgo]}>

                    <FontAwesome
                      name="institution"
                      color="#71b85f"
                      size={15}
                    />
                    <Text style={styles.iconText}>Prefered :<Text> Data Science</Text></Text>
                  </View>
                  <View style={[styles.flexstyle, styles.timeAgo, { marginLeft: -5, }]}>
                    <Entypo
                      name="location-pin"
                      color="#71b85f"
                      size={25}
                    />
                    <Text style={styles.iconText}>Location :<Text> Kolkata, India</Text></Text>
                  </View>
                  <View style={styles.btnGrp}>
                    <TouchableOpacity style={styles.subBtn}>
                      <Text style={styles.btnText}>Python</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBtn}>
                      <Text style={styles.btnText}>Hive</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subBtn}>
                      <Text style={styles.btnText}>React</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }
}

export default SearchClgStu;
