import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import styles from './styles'
import CommonStyle from '../../../../CommonStyles'
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import AntDesign from "react-native-vector-icons/AntDesign";


class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        headerShown: false,
    };

    render() {
        return (
            <SafeAreaView style={CommonStyle.safeAreaView}>
                <View style={CommonStyle.main}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Header />
                        <View style={{ marginHorizontal: '5%', marginTop: 20 }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>
                                Contact Us
                            </Text>

                            <View style={{ marginVertical: '2%', marginTop: 20 }}>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="* Enter your user name"
                                    keyboardType="default"
                                    style={styles.formGroup}
                                />
                            </View>

                            <View style={{ marginVertical: '2%', }}>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="* Enter your Email"
                                    keyboardType="email-address"
                                    style={styles.formGroup}
                                />
                            </View>

                            <View style={{ marginVertical: '2%', }}>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="Write your message"
                                    keyboardType="default"
                                    numberOfLines={5}
                                    multiline={true}
                                    style={styles.formGroup}
                                />
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.authBtn]}>
                                <Text style={styles.authBtnText}>Submit</Text>
                                {this.state.showLoader && (
                                    <ActivityIndicator
                                        size="large"
                                        color="#fff"
                                        style={CommonStyles.loader}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default ContactUs
