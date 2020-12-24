import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ApiUrl from '../../config/ApiUrl';
import { makeGetRequest } from '../../services/http-connectors';

class ViewPortfolioExperience extends Component {
  constructor() {
    super();
    this.state = {
      experienceset: [],
      urlprofessional: "",
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    let response = await makeGetRequest(ApiUrl.ExpertProfile + this.props.slugname, false, "");
    if (response) {
      this.setState({
        experienceset: response[0].experiences,
        urlprofessional: response[0].experiences.map(
          (obj) => obj.professionalurls
        ),
      });
    }
  };

  render() {
    return (
      <View style={CommonStyles.main}>
        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Experience</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.experienceset.map((item, i) => {
              if (item.id !== "") {
                return (
                  <View style={styles.portDocSec}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.hdng}>Project Name : </Text>
                      <Text style={styles.proName}>{item.experience}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.hdng}>Project URL : </Text>
                      <Text
                        style={styles.web}
                        onPress={() => Linking.openURL(item.projecturl)}>
                        {item.projecturl}
                      </Text>
                    </View>

                    <Text style={styles.hdng}>Project Description :</Text>
                    <Text style={styles.details}>{item.description}</Text>
                    {this.state.urlprofessional !== "" &&
                      this.state.urlprofessional !== "NULL" && (
                        <>
                          <Text style={styles.hdng}>Additional Url's :</Text>
                          <Text
                            style={[styles.details, styles.blueText]}
                          //onPress={() => Linking.openURL(item.professionalurls.split(",").filter(function (el) { return el; }).map((item) => <> {item}  </>))}
                          >
                            {item.professionalurls.split(",").filter(function (el) { return el; }).map((item) => <> {item} {"\n"} </>)}
                          </Text>
                        </>
                      )}
                  </View>
                );
              } else {
                return (
                  <></>
                );
              }
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ViewPortfolioExperience;
