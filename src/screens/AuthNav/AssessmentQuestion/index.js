import React, { Component } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import CommonStyles from '../../../../CommonStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, ProgressBar, Colors } from 'react-native-paper';
import Header from '../../../components/Header'


class AssessmentQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    static navigationOptions = {
        headerShown: false,
    };


    render() {
        return (
            <SafeAreaView style={CommonStyles.safeAreaView}>
                <View style={CommonStyles.main}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Header />
                        <View>
                            <Text style={styles.Heading}>Assessment Questions</Text>
                            <Divider style={styles.divider} />


                            <Text style={styles.quesHead}>Q : Why should you be hired for this tutoring job?</Text>
                            <View>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="Mention in detail what skills you have for this tutoring job"
                                    keyboardType="default"
                                    style={styles.inputBox}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                            </View>


                            <Text style={styles.quesHead}>Q : Do you have any past experience?</Text>
                            <View>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="Mention in details what past experience you have"
                                    keyboardType="default"
                                    style={styles.inputBox}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                            </View>
                        </View>

                        <Text style={styles.quesHead}>Q : Do you have any queries about this tutoring job?</Text>
                        <View>
                            <TextInput
                                returnKeyType="done"
                                placeholder="Portfolio Description eg. build ecommerce app using python"
                                keyboardType="default"
                                style={styles.inputBox}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>

                        <Text style={styles.quesHead}>Upload Resume (Doxs, pdf - 2MB max)</Text>
                        <View>
                            <TouchableOpacity
                                style={[styles.uploadBtn]}>
                                <Text style={styles.uploadBtnText}>Choose file</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.quesHead}>Video Resume Link :</Text>
                        <View>
                            <TextInput
                                returnKeyType="done"
                                placeholder="Portfolio Description eg. build ecommerce app using python"
                                keyboardType="default"
                                style={styles.inputBox}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity
                                style={[styles.authBtn]}>
                                <Text style={styles.authBtnText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.authBtn]}>
                                <Text style={styles.authBtnText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default AssessmentQuestion
