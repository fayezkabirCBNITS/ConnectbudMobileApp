import React, {Component} from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';

class UpdateDocument extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.updateDocument}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Update Document</Text>
          <TouchableOpacity style={CommonStyles.newEditBtn}>
            <AntDesign name="plus" color="#fff" size={16} />
            <Text style={CommonStyles.newEditText}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <TouchableOpacity style={styles.newDocumentSec}>
                <Text>Document</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default UpdateDocument;
