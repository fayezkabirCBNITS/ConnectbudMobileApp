import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import {Item} from 'native-base';
import ApiUrl from '../../config/ApiUrl';
import {makePostRequestMultipart} from '../../services/http-connectors';
import {updateJobId} from '../../redux/actions/user-data';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';

class LatestProjects extends Component {
  constructor() {
    super();
    this.state = {
      projectSet: [
        {
          RxDrugName: 'Tizanidine HCL 4mg Caps',
          RxNumber: '6000295',
          StoreNumber: '254',
          PatientPay: '15.59',
        },
        {
          RxDrugName: 'Hydroxychloroquine Sulfate 200 Tabs',
          RxNumber: '6000339',
          StoreNumber: '201',
          PatientPay: '16.18',
        },
        {
          RxDrugName: 'Naratriptan HCL 2.5mg Tabs',
          RxNumber: '6000300',
          StoreNumber: '111',
          PatientPay: '39.04',
        },
        {
          RxDrugName: 'Tizanidine HCL 4mg Caps',
          RxNumber: '6000457',
          StoreNumber: '08',
          PatientPay: '15.59',
        },
        {
          RxDrugName: 'Lisinopril 20mg Tabs',
          RxNumber: '6000318',
          StoreNumber: '08',
          PatientPay: '13.46',
        },
        {
          RxDrugName: 'Fluoxetine HCL 40mg Caps',
          RxNumber: '6000233',
          StoreNumber: '251',
          PatientPay: '17.3',
        },
        {
          RxDrugName: 'Tizanidine HCL 4mg Caps',
          RxNumber: '6000222',
          StoreNumber: '232',
          PatientPay: '15.59',
        },
        {
          RxDrugName: 'Memantine HCL 5mg Tabs',
          RxNumber: '6000212',
          StoreNumber: '231',
          PatientPay: '17.99',
        },
        {
          RxDrugName: 'Clonidine HCL 0.1mg Tabs',
          RxNumber: '6000339',
          StoreNumber: '07',
          PatientPay: '12.71',
        },
        {
          RxDrugName: 'Benazepril HCL 5mg Tabs',
          RxNumber: '6000261',
          StoreNumber: '06',
          PatientPay: '13.45',
        },
        {
          RxDrugName: 'Clonidine HCL 0.1mg Tabs',
          RxNumber: '6000524',
          StoreNumber: '02',
          PatientPay: '12.73',
        },
        {
          RxDrugName: 'Timolol Maleate 20mg Tabs',
          RxNumber: '6000771',
          StoreNumber: '02',
          PatientPay: '15.33',
        },
        {
          RxDrugName: 'Benazepril HCL 5mg Tabs',
          RxNumber: '6002370',
          StoreNumber: '01',
          PatientPay: '13.45',
        },
        {
          RxDrugName: 'Eliquis 5mg Tabs',
          RxNumber: '6002609',
          StoreNumber: '01',
          PatientPay: '20.88',
        },
        {
          RxDrugName: 'Atorvastatin Calcium 20mg Tabs',
          RxNumber: '6002602',
          StoreNumber: '01',
          PatientPay: '17.69',
        },
        {
          RxDrugName: 'Astagraf Xl 0.5mg Cp24',
          RxNumber: '6000232',
          StoreNumber: '278',
          PatientPay: '15.33',
        },
        {
          RxDrugName: 'Ropinirole HCL 0.5mg Tabs',
          RxNumber: '6000067',
          StoreNumber: '112',
          PatientPay: '14.75',
        },
        {
          RxDrugName: 'Ciprofloxacin HCL 0.3% Soln',
          RxNumber: '6000217',
          StoreNumber: '275',
          PatientPay: '55.06',
        },
        {
          RxDrugName: 'Sotalol HCL 240mg Tabs',
          RxNumber: '6000575',
          StoreNumber: '09',
          PatientPay: '17.5',
        },
        {
          RxDrugName: 'Tizanidine HCL 4mg Caps',
          RxNumber: '6000295',
          StoreNumber: '254',
          PatientPay: '15.59',
        },
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount = async () => {
    let body = new FormData();
    body.append('type', 'freelancer');

    let response = await makePostRequestMultipart(
      ApiUrl.LandingProjects,
      false,
      body,
    );
    if (response) {
      this.setState({
        projectSet: response,
      });
    }
  };

  viewProject = (Id) => {
    this.props.updateJobId(Id);
    this.props.navigation.navigate('ProjectDetailsFreelancerNA', {JobId: Id});
  };

  render() {
    return (
      <>
        {/* <View style={styles.wrap2}>
        <Swiper
          loop={true}
          showsPagination={false}
          showsButtons
        >
          {this.state.projectSet.map((item, i) => (
             <View key={i} style={styles.swiperWrap}>
              <View style={styles.wrap}>
                <View style={styles.imgSec}>
                  <Image
                    source={require('../../assets/images/bnr.jpg')}
                    style={CommonStyles.image}
                  />
                  <View style={styles.priceCircle}>
                    <Text style={styles.priceCircleText}>${item.price_amount}</Text>
                  </View>
                </View>
                <View style={styles.content}>
                  <Text style={styles.hdng}>{item.name}</Text>
                  <Text style={styles.boldText}>{item.category}</Text>
                  <TouchableOpacity style={styles.knowMoreBtn} onPress={() => this.viewProject(item.id)}>
                    <Text style={styles.knowMoreBtnText}>KNOW MORE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Swiper>
      </View> */}

        <View style={CommonStyles.main}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {this.state.projectSet.map((item, i) => (
              <View key={i} style={styles.wrap}>
                <View style={styles.imgSec}>
                  <Image
                    source={require('../../assets/images/bnr.jpg')}
                    style={CommonStyles.image}
                  />
                  <View style={styles.priceCircle}>
                    <Text style={styles.priceCircleText}>
                      ${item.price_amount}
                    </Text>
                  </View>
                </View>
                <View style={styles.content}>
                  <Text style={styles.hdng}>{item.name}</Text>
                  <Text numberOfLines={2} ellipsizeMode='tail' style={styles.boldText}>{item.category}</Text>
                  <TouchableOpacity
                    style={styles.knowMoreBtn}
                    onPress={() => this.viewProject(item.id)}>
                    <Text style={styles.knowMoreBtnText}>Know More</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateJobId: (data) => dispatch(updateJobId(data)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(withNavigation(LatestProjects));
