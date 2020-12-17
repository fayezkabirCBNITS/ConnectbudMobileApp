import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Picker } from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo";

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];
class StudentProject extends Component {
  constructor() {
    super();

    this.state = {
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        }
      ]
    };
  }

  static navigationOptions = {
    headerShown: false,
  };


  render() {
    return (
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={CommonStyles.main}>
          <View>
            <SearchableDropdown
              onItemSelect={(item) => {
                alert(item)
                const items = this.state.selectedItems;
                items.push(item)
                this.setState({ selectedItems: items });
              }}
              containerStyle={{ padding: 5 , marginVertical : 15 , width : "90%" , marginHorizontal : "5%" }}
              // onRemoveItem={(item, index) => {
              //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              //   this.setState({ selectedItems: items });
              // }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140  }}
              items={items}
              defaultIndex={2}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "Search your project",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              new Array(2).fill({ hi: "hi" }).map((data, idx) => (

                <TouchableOpacity key={idx}>
                  <View style={CommonStyles.container}>
                    <View style={styles.subjectWrapper}>
                      <View style={styles.leftSection}>
                        <FontAwesome
                          name="tv"
                          color="#000"
                          size={25}
                        />
                      </View>
                      <View style={styles.rightSection}>
                        <Text style={styles.boxTitle}>Introduction to java</Text>
                        <Text style={styles.boxTexts}>this is an introductory-level course where students will learn the basic of
                        java programming to build software.then will learn to use.
                        </Text>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <Entypo
                            name="time-slot"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>13 hrs ago</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="tag"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>Java</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="user"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>1 out of 1 skillset matches</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.timeAgo]}>

                          <FontAwesome
                            name="search-plus"
                            color="#000"
                            size={15}
                          />
                          <Text style={styles.iconText}>0 applied</Text>
                        </View>
                        <View style={[styles.flexstyle, styles.moneyContainer]}>
                          <Text style={styles.usdText}>20 USD</Text>
                          <Text style={styles.inrtxt}>(1500 INR)</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              ))
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default StudentProject;
