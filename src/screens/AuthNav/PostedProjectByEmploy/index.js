import React, { Component } from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TextInput,
    Pressable,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/Header';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';

class PostedProjectByEmployee extends Component {

    static navigationOptions = {
        headerShown: false,
    };
    render() {
        return (
            <SafeAreaView style={[CommonStyles.safeAreaView, styles.bgColorWhite]}>
                <View style={[CommonStyles.main, styles.bgColorWhite]}>
                    <StatusBar
                        backgroundColor="#60a84e"
                        barStyle="light-content"
                        hidden={false}
                        translucent={false}
                    />
                    <Header />
                    <View style={[CommonStyles.container, styles.bgColorWhite]}>
                        <ScrollView>
                            <View style={styles.boxWrapper}>
                                <View>
                                    <Text style={styles.boxtitle}>introduction to java</Text>
                                    <Text style={styles.boxtext}>i am bikran paul ,persuing electronices an communication engineering
                                    .Lorem Ipsum has been the industry's standard dummy text ever since the
                                    1500s, when an unknown printer took a galley of type and scrambled it to make a typ
                                    e specimen boo.
                                    </Text>
                                </View>
                                <View style={styles.subjectPriceCombo}>
                                    <View style={styles.subJectDaysCombo}>
                                        <View style={styles.subject}>
                                            <Text>Java</Text>
                                        </View>
                                        <View>
                                            <Text>11 days Age</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.inrUsd}>
                                    <Text style={styles.usd}>20  USD</Text>
                                    <Text style={styles.inr}>1500 INR</Text>
                                </View>
                                <View style={styles.buttonWrapper}>
                                    <View style={styles.findBtn}>
                                        <TouchableOpacity style={styles.actionBtn}>
                                            <FontAwesome
                                                name="search"
                                                color="#fff"
                                                size={15}
                                                style={styles.findIcon}
                                            />
                                            <Text style={styles.findBtnText}>Find College Students</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.edit}>
                                        <TouchableOpacity style={styles.editBtn}>
                                            <FontAwesome5
                                                name="edit"
                                                color="#000"
                                                size={28}
                                                style={styles.findIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.hozScroll}>
                                    <View style={styles.bgImg}>
                                        <ImageBackground 
                                            source={require("./../../../assets/images/bnr.jpg")}
                                            style={CommonStyles.image}
                                        >
                                        <View style={styles.bgContainer}>
                                            <Text style={styles.catTextHead}>Design Portfolio</Text>
                                            <Text style={styles.catBodyTxt}>there is some dummy text for now , You can use this example for create overlay. 
                                                You can change state for visible and invisible for overlay. Maybe better use ImageBackground
                                            </Text>
                                        </View>
                                        <View style={styles.category}>
                                            <Text style={styles.categoryText}>Wordpress</Text>
                                        </View>

                                        </ImageBackground>
                                    </View>
                                </View>

                            </ScrollView>


                        </ScrollView>


                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default PostedProjectByEmployee;