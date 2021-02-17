import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import ApiUrl from '../../config/ApiUrl';
import { makeGetRequest } from '../../services/http-connectors';
import base64 from 'base-64';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';


class ViewDocument extends Component {
  constructor() {
    super();
    this.state = {
      profiledataset: []
    };
  }
  componentDidMount = async () => {
    let response = await makeGetRequest(ApiUrl.ExpertProfile + this.props.slugname, false, "");
    if (response) {
      this.setState({
        profiledataset: response[0].resumefile
      });
    }
  };

  render() {
    return (
      <View style={styles.updateDocument}>
        <View style={[CommonStyles.newHdng, styles.padHz5]}>
          <Text style={CommonStyles.newHdngText}>Uploaded Document</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.profiledataset.map((value, i) => {
            if (value.resumefile.length > 0) {
              return (
                <TouchableOpacity style={styles.newDocumentSec}
                  onPress={() => Linking.openURL(value.resumefile)}>
                  <AntDesign name="pdffile1" color="#e95340" size={50} />
                </TouchableOpacity>
              );
            } else {
              return (
                <View style={styles.noData}>
                  <Image source={require('../../assets/images/noData.png')} />
                  <Text style={styles.noDataText}>No Data Found</Text>
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
}

// export default UpdateDocument;

const mapStateToProps = (state) => {
  return {
    userDeatailResponse: state.userData,
  };
};
export default connect(mapStateToProps, null)(withNavigation(ViewDocument));
