import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './innerPageStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Picker } from '@react-native-community/picker';
import StatusBar from "../../../components/StatusBar" 


class InnerChatting extends Component {
    constructor() {
        super();
        this.state = {
            startDate: '',
            subjectValue: '',
            gradeValue: '',
            showDatePicker: false,
        };
    }

    static navigationOptions = {
        headerShown: false,
    };

    render() {
        return (
            <SafeAreaView>
                <View style={CommonStyles.main}>
                    <StatusBar />
                    {/* header section */}
                    <View style={CommonStyles.header}>
                        <TouchableOpacity style={CommonStyles.hambarIcon} onPress={() => this.props.navigation.openDrawer()}>
                            <Entypo name="menu" color="#71b85f" size={35} />
                        </TouchableOpacity>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={CommonStyles.imageHdr}
                        />
                        <TouchableOpacity style={CommonStyles.bellIcon}>
                            <Feather name="bell" color="#71b85f" size={30} />
                        </TouchableOpacity>
                    </View>
                    {/* header section end */}

                    <View style={CommonStyles.container}>
                        
                        <View>
                            <View>
                                <Image 
                                source={require("./../../../assets/images/profileImg.jpg")}
                                style={styles.userImage}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default InnerChatting;
