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
import axios from 'axios';
import { API_URL } from "../../config/url";
import {withNavigation} from 'react-navigation';

class PortfolioExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experienceset: [],
      urlprofessional: "",
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    await axios({
      url: API_URL + "expertProfile/Utkarsh-Sarkar-15",
      method: 'GET',
    })
      .then((response) => {
        this.setState({
          experienceset: response.data[0].experiences,
          urlprofessional: response.data[0].experiences.map(
            (obj) => obj.professionalurls
          ),
        });
      })
      .catch(() => { });
  };

  render() {
    return (
      <View style={CommonStyles.main}>
        <View style={CommonStyles.container}>
          <View style={styles.portHeading2}>
            <Text style={styles.portfolioHead}>Experience</Text>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddExperienceScreen')}>
              <Text style={styles.addPortfolio}>+ Add Experience</Text>
            </TouchableOpacity>
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
                          //onPress={() => Linking.openURL('https://www.facebook.com')}
                          >
                            {item.professionalurls.split(",").filter(function (el) { return el; }).map((item) => <> {item} {"\n"} </>)}
                          </Text>
                        </>
                      )}

                    <TouchableOpacity style={styles.editBtn}>
                      <FontAwesome name="edit" color="#71b85f" size={28} />
                    </TouchableOpacity>
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

export default withNavigation(PortfolioExperience);
