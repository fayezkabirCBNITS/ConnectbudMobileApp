import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonStyles from '../../../CommonStyles';
import styles from './styles';
import ApiUrl from '../../config/ApiUrl';
import {makePostRequestMultipart} from '../../services/http-connectors';
import {updateViewProfile} from '../../redux/actions/user-data';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
// const screenWidth = Dimensions.get('window').width;
import Swiper from 'react-native-swiper';

class QualityTalent extends Component {
  constructor() {
    super();
    this.state = {
      expertset: [
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
    body.append('user_id', '');

    let response = await makePostRequestMultipart(
      ApiUrl.FeedExpertlist,
      false,
      body,
    );
    if (response) {
      await this.setState({
        expertset: response,
      });
    }
  };

  viewProfile = async (slug, user_id) => {
    this.props.updateViewProfile(slug, user_id);
    this.props.navigation.navigate('ViewUserProfileScreen', {
      username: slug,
      user_id: user_id,
    });
  };

  //   onPress = (index) => {
  //     this.scroll.scrollTo({x: index * screenWidth, y: 0, animated: true})
  //  }

  render() {
    return (
      // <>
      //   <View style={styles.wrap}>
      //     <Swiper
      //       loop={true}
      //       showsPagination={false}
      //       autoplay={true}
      //       showsButtons
      //     >
      //       {this.state.expertset.map((value, i) => (

      //           <View key={i} style={styles.swiperWrap}>
      //             <TouchableOpacity style={styles.main} onPress={() => this.viewProfile(value.slug, value.user_id)}>
      //               <View style={styles.image}>
      //                 <Image
      //                   source={{ uri: value.user_image }}
      //                   style={CommonStyles.image}
      //                 />
      //               </View>
      //               <View style={styles.des}>
      //                 <Text style={styles.name}>{value.expert_Name}</Text>
      //                 <Text style={styles.designation}>{value.collegeName}</Text>
      //               </View>
      //             </TouchableOpacity>
      //           </View>
      //         ))}
      //     </Swiper>
      //   </View>

      // </>

      // <View>
      //   <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      //     {this.state.expertset.map((value, i) => (
      //       <TouchableOpacity key={i} style={styles.main} onPress={() => this.viewProfile(value.slug, value.user_id)}>
      //         <View style={styles.image}>
      //           <Image
      //             source={{ uri: value.user_image }}
      //             style={CommonStyles.image}
      //           />
      //         </View>
      //         <View style={styles.des}>
      //           <Text style={styles.name}>{value.expert_Name}</Text>
      //           <Text style={styles.designation}>{value.collegeName}</Text>
      //         </View>
      //       </TouchableOpacity>
      //     ))}
      //   </ScrollView>
      // </View>

      <View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {this.state.expertset.map((value, i) => (
            <TouchableOpacity
              key={i}
              style={styles.main}
              onPress={() => this.viewProfile(value.slug, value.user_id)}>
              <View style={styles.image}>
                <Image
                  source={{uri: value.user_image}}
                  style={CommonStyles.image}
                />
              </View>
              <View style={styles.des}>
                <Text style={styles.name}>{value.expert_Name}</Text>
                <Text numberOfLines={3} ellipsizeMode="tail" style={styles.designation}>{value.collegeName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateViewProfile: (slug, user_id) =>
      dispatch(updateViewProfile(slug, user_id)),
  };
};
export default connect(null, mapDispatchToProps)(withNavigation(QualityTalent));
