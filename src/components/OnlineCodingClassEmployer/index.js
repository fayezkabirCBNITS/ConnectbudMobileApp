import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StatusBar,
    FlatList,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import CommonStyles from '../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Picker } from '@react-native-community/picker';


class OnlineClassEmployer extends Component {
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
            <View style={CommonStyles.main}>
                <ScrollView  showsVerticalScrollIndicator={false}>
                    <View style={styles.form}>
                        <Text style={styles.inputHead}>Choose a Course</Text>
                        <View style={styles.formGroup1}>
                            <View style={[styles.formSubGroup2, { width: '100%' }]}>
                                <Picker
                                    style={{ width: '100%', height: 45 }}
                                    selectedValue={this.state.subjectValue}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ subjectValue: itemValue })
                                    }>
                                    <Picker.Item label="Python for Biggners" value="python" />
                                    <Picker.Item label="Introduction to java" value="java" />
                                    <Picker.Item label="imtroduction to Html5 and Css3" value="htmlcss" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.syllabusSection}>
                            <Text style={styles.inputHead}>Syllabus</Text>
                            <View>
                                <View style={styles.syllabusHeader}>
                                    <Text>Chapter One/b : </Text>
                                    <Text>Fundamentals of Python</Text>
                                </View>
                                <View style={styles.topics}>
                                    <View style={styles.chapterIndexing}>
                                        <Text style={styles.dotCircle}><FontAwesome name="dot-circle-o" size={15} color="#71b85f" /></Text>
                                        <Text style={styles.chapterName}>Introduction to python language</Text>
                                    </View>
                                    <View style={styles.chapterIndexing}>
                                        <Text style={styles.dotCircle}><FontAwesome name="dot-circle-o" size={15} color="#71b85f" /></Text>
                                        <Text style={styles.chapterName}>Syntax and symentics of python</Text>
                                    </View>
                                    <View style={styles.chapterIndexing}>
                                        <Text style={styles.dotCircle}><FontAwesome name="dot-circle-o" size={15} color="#71b85f" /></Text>
                                        <Text style={styles.chapterName}>will give information on  python enviroment set up</Text>
                                    </View>
                                </View>
                            </View>

                        </View>

                        <Text style={styles.inputHead}>Hire By</Text>
                        <View
                            style={[
                                styles.formSubGroup2,
                                { flexWrap: 'wrap', flexDirection: 'row' , marginBottom : 10 },
                            ]}>
                            <View style={styles.skillTab}>
                                <Text style={styles.skillText}>ConnectBud</Text>
                            </View>
                            <View style={[styles.skillTab, { backgroundColor: '#71b85f' }]}>
                                <Text style={[styles.skillText, { color: '#fff' }]}>
                                    Choose your own
                                        </Text>
                            </View>
                        </View>

                        <View>
                        <View style={styles.courseDetails}>
                            <Text style={styles.inputHead}>Class Duration : </Text>
                            <Text>1 hrs.</Text>
                        </View>
                        <View style={styles.courseDetails}>
                            <Text style={styles.inputHead}>Course Amount : </Text>
                            <Text>$ 20</Text>
                        </View>
                        <View style={styles.courseDetails}>
                            <Text style={styles.inputHead}>Number of Classes : </Text>
                            <Text>4</Text>
                        </View>

                        </View>

                        <View>
                            <Text style={styles.inputHead}>Start Date</Text>
                            {this.state.showDatePicker === true ? (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    placeholder='Select Date'
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                />
                            ) : (
                                    <></>
                                )}

                            <View style={styles.formGroup1}>
                                <View style={[styles.formSubGroup2, { height: 45 }]}>
                                    <Text style={styles.inputHead2}>{this.state.startDate}</Text>
                                </View>
                                <View style={styles.formSubGroup1} >
                                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}>
                                        <FontAwesome name="clock-o" size={25} color="#d7d7d8" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        
                        <Text style={styles.inputHead}>Timing</Text>
                        <View style={styles.formGroup1}>
                            <View style={[styles.formSubGroup2, { width: '100%' }]}>
                                <Picker
                                    style={{ width: '100%', height: 45 }}
                                    selectedValue={this.state.subjectValue}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ subjectValue: itemValue })
                                    }>
                                    <Picker.Item label="9:00" value="9" />
                                    <Picker.Item label="11:00" value="11" />
                                    <Picker.Item label="14:00" value="14" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default OnlineClassEmployer;
