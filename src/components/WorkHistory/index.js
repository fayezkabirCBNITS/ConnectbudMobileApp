import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import styles from './style';
import {Picker} from '@react-native-community/picker';

class WorkHistory extends Component {
  constructor(props) {
    super();
    this.state = {
      userId: '',
      isModalVisible: false,
      orderId: '',
      WorkHistory: [
        {
          workId: 1,
          name: 'John Doe1',
          date: '12-Dec-2020',
          price: 500,
          currency: '$',
          type: 'Contract',
          technology: 'React JS,Java,C++',
          orderStatus: 'Pending',
        },
        {
          workId: 2,
          name: 'John Doe2',
          date: '13-Dec-2020',
          price: 60,
          currency: '$',
          type: 'Full Time',
          technology: 'React JS,Java,C++,React JS,Java,C++',
          orderStatus: 'Completed',
        },
        {
          workId: 3,
          name: 'John Doe3',
          date: '14-Dec-2020',
          price: 450,
          currency: '$',
          type: 'Contract',
          technology: 'React JS,Java,C++',
          orderStatus: 'In Progress',
        },
        {
          workId: 4,
          name: 'John Doe4',
          date: '15-Dec-2020',
          price: 50,
          currency: '$',
          type: 'Full Time',
          technology: 'React JS,Java,C++',
          orderStatus: 'Pending',
        },
      ],
    };
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const {WorkHistory} = this.state;
    return (
      <View style={CommonStyles.container}>
        <Text style={styles.portfolioHead}>Project Details</Text>
        <View style={styles.formGroup1}>
          <View style={[styles.formSubGroup2, {width: '100%'}]}>
            <Picker
              style={{width: '100%', height: 45}}
              selectedValue={this.state.typeValue}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({typeValue: itemValue})
              }>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Pending" value="Pd" />
              <Picker.Item label="Completed" value="cp" />
              <Picker.Item label="In Progress" value="ip" />
            </Picker>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {WorkHistory && WorkHistory.length > 0 ? (
            WorkHistory.map((item) => (
              <View style={styles.cardContainer} key={item.workId}>
                <View style={styles.prodDetails}>
                  <View style={{width: '85%'}}>
                    <Text style={styles.itemTitle}>
                      Name : <Text style={styles.itemContent}>{item.name}</Text>
                    </Text>
                    <Text style={styles.itemTitle}>
                      Type : <Text style={styles.itemContent}>{item.type}</Text>
                    </Text>
                    <Text style={styles.itemTitle}>
                      Date : <Text style={styles.itemContent}>{item.date}</Text>
                    </Text>
                    <Text style={styles.itemTitle}>
                      Technologies :{' '}
                      <Text style={styles.itemContent}>{item.technology}</Text>
                    </Text>
                    <Text style={styles.itemTitle}>
                      Order Status :{' '}
                      {item.orderStatus === 'Completed' ? (
                        <Text
                          style={[
                            styles.itemContent,
                            {color: '#71b85f', fontFamily: 'Poppins-Regular',},
                          ]}>
                          {item.orderStatus}
                        </Text>
                      ) : item.orderStatus === 'In Progress' ? (
                        <Text
                          style={[
                            styles.itemContent,
                            {color: '#ff9900', fontFamily: 'Poppins-Regular',},
                          ]}>
                          {item.orderStatus}
                        </Text>
                      ) : item.orderStatus === 'Pending' ? (
                        <Text
                          style={[
                            styles.itemContent,
                            {color: '#ff0000',fontFamily: 'Poppins-Regular',},
                          ]}>
                          {item.orderStatus}
                        </Text>
                      ) : (
                        <></>
                      )}
                    </Text>
                  </View>
                  <Text style={styles.price}>
                    {item.currency}
                    {item.price}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noData}>
              <Image source={require('../../assets/images/noData.png')} />
              <Text style={styles.noDataText}>No Data Found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default WorkHistory;
