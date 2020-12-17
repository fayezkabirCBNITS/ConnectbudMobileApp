import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Image,
    ImageBackground,
    TextInput,
    FlatList,
    ActivityIndicator
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-community/picker';

class AddPortfolioScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCountry: false,
            Country: [
                { title: 'India' },
                { title: 'USA' },
                { title: 'China' },
            ],
        }
    }

    handleCountry = async () => {
        this.setState({ showCountry: !this.state.showCountry });
    };

    render() {
        const renderCountryItems = ({ item }) => (
            <TouchableOpacity style={styles.headSec}>
                <View style={styles.details}>
                    <Text style={styles.flastListHead}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <SafeAreaView style={CommonStyles.safeAreaView}>
                <View style={CommonStyles.main}>
                    <CommonStatusBar />
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <Text style={styles.headText}>Add a portfolio item</Text>

                        <View style={styles.formInput}>
                            <TextInput
                                returnKeyType="done"
                                placeholder="Portfolio Title eg. Python Development"
                                keyboardType="default"
                                style={styles.formGroup}
                            />
                        </View>

                        <View style={styles.formInput}>
                            <TextInput
                                returnKeyType="done"
                                placeholder="Portfolio Description eg. build ecommerce app using python"
                                keyboardType="default"
                                style={[styles.formGroup, { height: 120 }]}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>

                        <View style={styles.skillView1}>
                            <View style={[styles.formGroup1]}>
                                <Picker
                                    style={{ width: '100%', height: 45, color: '#3B1D25' }}
                                    selectedValue={this.state.typeValue}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ typeValue: itemValue })
                                    }>
                                    <Picker.Item label="Type1" value="1" />
                                    <Picker.Item label="Type2" value="2" />
                                </Picker>
                            </View>
                        </View>


                        <View style={{ marginHorizontal: '5%', marginVertical: '2%', }}>
                            <TextInput
                                returnKeyType="done"
                                placeholder="Live URL"
                                keyboardType="default"
                                style={styles.formGroup}
                            />
                        </View>

                        <View style={[styles.formGroup1, { marginHorizontal: '5%', marginVertical: '4%' }]}>
                            <View style={styles.formSubGroup2Num}>
                                <TextInput
                                    returnKeyType="done"
                                    placeholder="Upload Image"
                                    style={styles.inputGroup}
                                    keyboardType="default"
                                    value={this.state.number}
                                />
                            </View>
                            <View style={styles.formSubGroupNum}>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#595555', borderRadius: 40 }}>
                                    <Text
                                        style={{
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                            color: '#fff',
                                        }}>
                                        Choose
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.btnGrp}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.handleSubmit()}
                                style={[styles.authBtn]}>
                                <Text style={styles.authBtnText}>Cancel</Text>
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
                                <Text style={styles.authBtnText}>Update</Text>
                                {this.state.showLoader && (
                                    <ActivityIndicator
                                        size="large"
                                        color="#fff"
                                    // style={CommonStyles.loader}
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

export default AddPortfolioScreen;