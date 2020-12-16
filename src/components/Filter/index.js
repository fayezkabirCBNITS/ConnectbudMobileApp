import React, {Component} from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto'

class FilterScreen extends Component {
  constructor() {
    super();
    this.state = {
      category: [{optn: 'Homework'}, {optn: 'Coding'}],
      sort: [{optn: 'Most Relevant'}, {optn: 'Latest'}, {optn: 'Low - High (Amount)'}, {optn: 'High - Low (Amount)'}],
      country: [{optn: 'India'},],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={styles.wrap}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.flexRow, styles.underline]}>
            <Text style={styles.head}>Filters</Text>
            <Pressable>
              <Text style={styles.resetAll}>Reset All</Text>
            </Pressable>
          </View>

          <Collapse>
            <CollapseHeader>
              <View style={[styles.flexRow, styles.height50]}>
                <Text style={styles.head}>Category</Text>
                <Pressable>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    color="#71b85f"
                    size={30}
                  />
                  {/* <MaterialIcons
                    name="keyboard-arrow-up"
                    color="#71b85f"
                    size={30}
                  />                   */}
                </Pressable>
              </View>
            </CollapseHeader>
            <CollapseBody>
            {this.state.category.map((item, i) => (
                <Pressable key={i} style={styles.filterOptnBtn}>
                  <Text style={styles.filterOptn}>{item.optn}</Text>
                  {/* select option text - style={styles.filterOptnSlct} */}
                </Pressable>
              ))}
            </CollapseBody>
          </Collapse>

          <Collapse>
            <CollapseHeader>
              <View style={[styles.flexRow, styles.height50]}>
                <Text style={styles.head}>Sort By</Text>
                <Pressable>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    color="#71b85f"
                    size={30}
                  />
                  {/* <MaterialIcons
                    name="keyboard-arrow-up"
                    color="#71b85f"
                    size={30}
                  />                   */}
                </Pressable>
              </View>
            </CollapseHeader>
            <CollapseBody>
            {this.state.sort.map((item, i) => (
                <Pressable style={styles.filterOptnBtnSlct}key={i} >
                    <Fontisto
                    name="radio-btn-passive"
                    color="#000"
                    size={25}
                  />
                  {/* <Fontisto
                    name="radio-btn-active"
                    color="#000"
                    size={25}
                  /> */}
                  <Text style={styles.filterOptn2}>{item.optn}</Text>
                </Pressable>
              ))}
            </CollapseBody>
          </Collapse>

          <Collapse>
            <CollapseHeader>
              <View style={[styles.flexRow, styles.height50]}>
                <Text style={styles.head}>Country</Text>
                <Pressable>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    color="#71b85f"
                    size={30}
                  />
                  {/* <MaterialIcons
                    name="keyboard-arrow-up"
                    color="#71b85f"
                    size={30}
                  />                   */}
                </Pressable>
              </View>
            </CollapseHeader>
            <CollapseBody>
            {this.state.country.map((item, i) => (
                <Pressable key={i} style={styles.filterOptnBtnSlct}>
                   <Fontisto
                    name="radio-btn-passive"
                    color="#000"
                    size={25}
                  />
                  {/* <Fontisto
                    name="radio-btn-active"
                    color="#000"
                    size={25}
                  /> */}
                  <Text style={styles.filterOptn2}>{item.optn}</Text>
                </Pressable>
              ))}
            </CollapseBody>
          </Collapse>
        </ScrollView>
      </View>
    );
  }
}

export default FilterScreen;
