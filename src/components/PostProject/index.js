import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity,ActivityIndicator, SafeAreaView } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from "./styles";

class PostProject extends Component {
  constructor() {
    super();
    this.state = {
      showLoader: false,
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

  handleSubmit = async () => {
    this.setState({showLoader: true});
    Toast.show('submit action', Toast.LONG);
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
      <SafeAreaView style={CommonStyles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            <Text style={styles.title}>Project Details</Text>

            <Text style={styles.inputHead}>Title *</Text>
            <View style={styles.formGroup}>
              <TextInput
                returnKeyType="done"
                placeholder="max 10 Chars"
                style={styles.inputGroup}
                keyboardType="default"
              />
            </View>

            <View style={[styles.formGroup, { height: 100, },]}>
              <TextInput
                returnKeyType="done"
                placeholder="Describe your project..."
                style={[
                  styles.inputGroup,
                  {
                    height: 100,
                    justifyContent: 'flex-start',
                    textAlignVertical: 'top',
                  },
                ]}
                keyboardType="default"
                numberOfLines={5}
                multiline={true}
              />
            </View>

            <Text style={styles.inputHead}>Skills *</Text>
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
                <View style={styles.formSubGroup1}>
                  <FontAwesome
                    name="angle-down"
                    size={28}
                    color="#d7d7d8"
                    onPress={() => this.handleSkills()}
                  />
                </View>
                <View style={{ justifyContent: 'center', marginBottom: 0 }}>
                  <AntDesign name="plussquare" size={50} color="#000" />
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
            <Text style={styles.inputHead}>Project Budget *</Text>
            <View style={styles.projectView}>
              <View style={[styles.formGroup, { width: '45%', flexWrap: 'wrap' }]}>
                <TextInput
                  returnKeyType="done"
                  style={[styles.inputGroup, { width: '70%' }]}
                  keyboardType="number-pad"
                />
                <View style={[styles.formSubGroup1, { marginTop: 10 }]}>
                  <FontAwesome
                    name="dollar"
                    size={20}
                    color="#d7d7d8"
                  />
                </View>
              </View>
              <View style={{ width: '10%' }}>
                <Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold' }}>=</Text>
              </View>
              <View style={[styles.formGroup, { width: '45%', flexWrap: 'wrap' }]}>
                <TextInput
                  returnKeyType="done"
                  style={[styles.inputGroup, { width: '70%' }]}
                  keyboardType="number-pad"
                />
                <View style={[styles.formSubGroup1, { marginTop: 10 }]}>
                  <FontAwesome
                    name="rupee"
                    size={20}
                    color="#d7d7d8"
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.handleSubmit()}
              style={[styles.authBtn]}>
              <Text style={styles.authBtnText}>Submit</Text>
              {this.state.showLoader && (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  // style={CommonStyles.loader}
                />
              )}
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PostProject;
