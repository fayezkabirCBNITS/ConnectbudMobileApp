import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import styles from "./styles";

class PostInternship extends Component {
  constructor() {
    super();
    this.state = {
      showLoader: false,
      typeValue: '',
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={{
              fontWeight: 'bold',
              fontSize: 15,
              padding: 20,
              marginBottom: -10,
            }}
            >
              Create Your Job Posting
          </Text>
            <View
              style={{
                borderBottomColor: 'rgba(59,29,37,0.5)',
                borderBottomWidth: 1,
                width: '90%',
                marginHorizontal: '5%',
              }}
            />

            <Text style={[styles.title, { marginTop: 20 }]}>Job Details</Text>
            <View style={{ marginHorizontal: '5%', marginVertical: '2%', }}>
              <TextInput
                returnKeyType="done"
                placeholder="* Title [max 100 Chars]"
                keyboardType="default"
                style={styles.formGroup1}
              />
            </View>
            <View style={{ marginHorizontal: '5%', marginVertical: '2%', }}>
              <TextInput
                returnKeyType="done"
                placeholder="* Company Name [max 40 Chars]"
                keyboardType="default"
                style={styles.formGroup1}
              />
            </View>
            <View style={{ marginHorizontal: '5%', marginVertical: '2%', }}>
              <TextInput
                returnKeyType="done"
                placeholder="* Description [max 500 Chars]"
                keyboardType="default"
                numberOfLines={5}
                multiline={true}
                style={styles.formGroup1}
              />
            </View>

            <Text style={[styles.title]}>Skills </Text>
            <View style={styles.skillView}>
              <View style={[styles.formGroup1]}>
                <Picker
                  style={{ width: '100%', height: 45, color: '#3B1D25' }}
                  selectedValue={this.state.typeValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ typeValue: itemValue })
                  }>
                  <Picker.Item label="Java" value="Java" />
                  <Picker.Item label="Python" value="Python" />
                  <Picker.Item label="React" value="React" />
                </Picker>
                <View style={{ justifyContent: 'center', marginBottom: 0 }}>
                  <AntDesign name="plussquare" size={55} color="#60a84e" style={{ marginLeft: 10 }} />
                </View>
              </View>
            </View>
        
            <Text style={styles.title}>Location</Text>
            <View style={styles.skillView1}>
              <View style={[styles.formGroup1]}>
              <Picker
                  style={{ width: '100%', height: 45, color: '#3B1D25' }}
                  selectedValue={this.state.typeValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ typeValue: itemValue })
                  }>
                  <Picker.Item label="India" value="India" />
                  <Picker.Item label="Pakistan" value="Pakistan" />
                  <Picker.Item label="China" value="China" />
                </Picker>
              </View>
            </View>

            <View style={styles.skillView1}>
              <View style={[styles.formGroup1]}>
              <Picker
                  style={{ width: '100%', height: 45, color: '#3B1D25' }}
                  selectedValue={this.state.typeValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ typeValue: itemValue })
                  }>
                  <Picker.Item label="Full Timer" value="FT" />
                  <Picker.Item label="Part Timer" value="PT" />
                </Picker>
              </View>
            </View>
  
            <View style={{ marginHorizontal: '5%', display: 'flex', flexDirection: 'row', marginVertical: 10, }}>
              <View style={styles.usd}>
                <Text style={{ color: '#60a84e' }}>USD</Text>
              </View>
              <TextInput
                returnKeyType="done"
                placeholder="* CTC"
                keyboardType="default"
                style={{
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4, borderRadius: 4, padding: 10, borderColor: 'rgba(59,29,37,0.5)', backgroundColor: '#f8f8f8', color: '#3B1D25', fontSize: 15, width: '70%'
                }}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() => this.handleSubmit()}
              style={[styles.authBtn]}>
              <Text style={styles.authBtnText}>Submit</Text>
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
      </SafeAreaView>
    );
  }
}

export default PostInternship;
