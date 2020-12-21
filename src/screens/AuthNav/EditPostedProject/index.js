import React, { Component } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-community/picker';
import { Divider } from 'react-native-paper';
import Header from '../../../components/Header'
import styles from "./style";


class EditPostedProject extends Component {
    constructor() {
        super()
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
                            <Text style={styles.Heading}
                            >
                                Edit Your Posted Project
                        </Text>
                            <Divider style={styles.divider} />

                            <Text style={[styles.title, { marginTop: 20 }]}>* Project Title</Text>
                            <View style={styles.inputGrp}>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="UI/UX Designer-Full time Remote Position"
                                    keyboardType="default"
                                    style={styles.formGroup}
                                />
                            </View>

                            <Text style={[styles.title, { marginTop: 10 }]}>* Project Description</Text>
                            <View style={styles.inputGrp}>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="Test test"
                                    keyboardType="default"
                                    numberOfLines={5}
                                    multiline={true}
                                    style={[styles.formGroup, { textAlignVertical: 'top' }]}
                                />
                            </View>

                            <Text style={[styles.title, { marginTop: 10 }]}>* Skills</Text>
                            <View style={styles.Skills}>
                                <Picker
                                    style={{ width: '100%', height: 50, color: '#3B1D25' }}
                                    selectedValue={this.state.typeValue}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ typeValue: itemValue })
                                    }>
                                    <Picker.Item label="Java" value="Java" />
                                    <Picker.Item label="Python" value="Python" />
                                    <Picker.Item label="React" value="React" />
                                </Picker>
                                <View style={{ justifyContent: 'center', marginBottom: 0 }}>
                                    <AntDesign name="plussquare" size={55} color="#60a84e" style={{ marginLeft: 10 }} />
                                </View>
                            </View>

                            <Text style={[styles.title, { marginTop: 10 }]}>* Posted Project for</Text>
                            <View style={styles.Skills1}>
                                <Picker
                                    style={{ width: '100%', height: 50, color: '#3B1D25' }}
                                    selectedValue={this.state.typeValue}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ typeValue: itemValue })
                                    }>
                                    <Picker.Item label="All" value="All" />
                                    <Picker.Item label="Partial" value="Partial" />
                                </Picker>
                            </View>

                            <Text style={[styles.title, { marginTop: 10 }]}>* Posted Budget</Text>
                            <View style={styles.inputGrp}>
                                <View style={styles.icon}>
                                    <FontAwesome name="dollar" size={25} color="#fff" />
                                </View>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="500"
                                    keyboardType="default"
                                    style={styles.budgetInput}
                                />
                            </View>
                            <View style={styles.btnGrp}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => this.handleSubmit()}
                                    style={[styles.authBtn]}>
                                    <Text style={styles.authBtnText}>CANCEL</Text>
                                    {this.state.showLoader && (
                                        <ActivityIndicator
                                            size="large"
                                            color="#fff"
                                        // style={CommonStyles.loader}
                                        />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => this.handleSubmit()}
                                    style={[styles.authBtn]}>
                                    <Text style={styles.authBtnText}>UPDATE</Text>
                                    {this.state.showLoader && (
                                        <ActivityIndicator
                                            size="large"
                                            color="#fff"
                                        // style={CommonStyles.loader}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default EditPostedProject;