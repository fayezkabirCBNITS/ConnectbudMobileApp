import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import axios from "axios";
import { API_URL } from "../../config/url";
import { withNavigation } from 'react-navigation'
// import { Link } from "react-router-dom";
import Swiper from 'react-native-swiper'

class PopularServies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [
        {
          "RxDrugName":"Tizanidine HCL 4mg Caps",
          "RxNumber":"6000295",
          "StoreNumber":"254",
          "PatientPay":"15.59"
        },
        {
          "RxDrugName":"Hydroxychloroquine Sulfate 200 Tabs",
          "RxNumber":"6000339",
          "StoreNumber":"201",
          "PatientPay":"16.18"
        },
        {
          "RxDrugName":"Naratriptan HCL 2.5mg Tabs",
          "RxNumber":"6000300",
          "StoreNumber":"111",
          "PatientPay":"39.04"
        },
        {
          "RxDrugName":"Tizanidine HCL 4mg Caps",
          "RxNumber":"6000457",
          "StoreNumber":"08",
          "PatientPay":"15.59"
        },
        {
          "RxDrugName":"Lisinopril 20mg Tabs",
          "RxNumber":"6000318",
          "StoreNumber":"08",
          "PatientPay":"13.46"
        },
        {
          "RxDrugName":"Fluoxetine HCL 40mg Caps",
          "RxNumber":"6000233",
          "StoreNumber":"251",
          "PatientPay":"17.3"
        },
        {
          "RxDrugName":"Tizanidine HCL 4mg Caps",
          "RxNumber":"6000222",
          "StoreNumber":"232",
          "PatientPay":"15.59"
        },
        {
          "RxDrugName":"Memantine HCL 5mg Tabs",
          "RxNumber":"6000212",
          "StoreNumber":"231",
          "PatientPay":"17.99"
        },
        {
          "RxDrugName":"Clonidine HCL 0.1mg Tabs",
          "RxNumber":"6000339",
          "StoreNumber":"07",
          "PatientPay":"12.71"
        },
        {
          "RxDrugName":"Benazepril HCL 5mg Tabs",
          "RxNumber":"6000261",
          "StoreNumber":"06",
          "PatientPay":"13.45"
        },
        {
          "RxDrugName":"Clonidine HCL 0.1mg Tabs",
          "RxNumber":"6000524",
          "StoreNumber":"02",
          "PatientPay":"12.73"
        },
        {
          "RxDrugName":"Timolol Maleate 20mg Tabs",
          "RxNumber":"6000771",
          "StoreNumber":"02",
          "PatientPay":"15.33"
        },
        {
          "RxDrugName":"Benazepril HCL 5mg Tabs",
          "RxNumber":"6002370",
          "StoreNumber":"01",
          "PatientPay":"13.45"
        },
        {
          "RxDrugName":"Eliquis 5mg Tabs",
          "RxNumber":"6002609",
          "StoreNumber":"01",
          "PatientPay":"20.88"
        },
        {
          "RxDrugName":"Atorvastatin Calcium 20mg Tabs",
          "RxNumber":"6002602",
          "StoreNumber":"01",
          "PatientPay":"17.69"
        },
        {
          "RxDrugName":"Astagraf Xl 0.5mg Cp24",
          "RxNumber":"6000232",
          "StoreNumber":"278",
          "PatientPay":"15.33"
        },
        {
          "RxDrugName":"Ropinirole HCL 0.5mg Tabs",
          "RxNumber":"6000067",
          "StoreNumber":"112",
          "PatientPay":"14.75"
        },
        {
          "RxDrugName":"Ciprofloxacin HCL 0.3% Soln",
          "RxNumber":"6000217",
          "StoreNumber":"275",
          "PatientPay":"55.06"
        },
        {
          "RxDrugName":"Sotalol HCL 240mg Tabs",
          "RxNumber":"6000575",
          "StoreNumber":"09",
          "PatientPay":"17.5"
        },
        {
          "RxDrugName":"Tizanidine HCL 4mg Caps",
          "RxNumber":"6000295",
          "StoreNumber":"254",
          "PatientPay":"15.59"
        },
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    await axios.get(API_URL + "landing_tags").then(async (res) => {
      await this.setState({
        categoryList: res.data,
      });
    });
  };

  render() {
    return (
      <View  style={styles.wrap}>
        {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal> */}
        <Swiper
          loop={true}
          showsPagination={false}
          showsButtons
        >
          {this.state.categoryList.map((item, i) => {
            if (i < 4) {
              return (
                <View key={i} style={{width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: '5%'}}>
                <TouchableOpacity key={i} style={styles.popSec} onPress={() => this.props.navigation.navigate('LatestProjectList', {tagName : item.tagName})}>
                  <Image source={{ uri: item.description }} style={styles.image} />

                  <View style={styles.marTop20}>
                    <Text style={styles.smText}>{item.tagName}</Text>
                    {/* <Text style={styles.lgText}>{item.lgText}</Text> */}
                  </View>
                </TouchableOpacity>
                </View>
              );
            }
          })}
          </Swiper>
        {/* </ScrollView> */}
      </View>
    );
  }
}

export default withNavigation(PopularServies);
