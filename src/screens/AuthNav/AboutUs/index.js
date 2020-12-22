import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import CommonStyle from '../../../../CommonStyles'
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../../components/Header'

class AboutUs extends Component {
    // static navigationOptions = {
    //     headerShown: false,
    // };
    render() {
        return (
            <SafeAreaView style={CommonStyle.safeAreaView}>
                <View style={CommonStyle.main}>
                    <ScrollView showsVerticalScrollIndicator={true}>
                        <View style={{ marginHorizontal: '5%' }}>
                            <Text style={styles.headerText}>Our Story</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>
                                ConnectBud is the world's largest freelancing platform exclusively for the students.
                                Getting the right freelancing and internship projects has become easier than ever before.
                                Every college student gets an opportunity to learn, earn, share, and flourish. The platform has grown into a
                                global creative marketplace for employers and recruiters to pick up the brightest students of the top colleges
                                to execute their projects.
                                </Text>

                            <Text style={styles.subHeaderText}>
                                ConnectBud, a platform that fosters personal development and professional growth
                            </Text>

                            <View>
                                <Text style={styles.headerText}>Our Mission</Text>
                                <Text style={styles.pText}>
                                    We’re on a mission to build the world’s biggest community for college students to work on real projects, showcase their talent, and get hired easily.
                                </Text>
                                <Text style={styles.pText}>
                                    To help new-age companies thrive by connecting them with the large pool of talented college students readily available.
                                </Text>
                                <Text style={styles.pText}>
                                    To reinvent how people share knowledge, tell their success stories, and inspire the next generation of students.
                                </Text>
                            </View>

                            <Text style={styles.subHeaderText}>
                                Amazing freelancing options and high-quality potential candidates just a click away
                            </Text>

                            <View>
                                <Text style={styles.headerText}>Our Values</Text>
                                <Text style={styles.pText}>
                                A commitment to innovation and excellence.
                                </Text>
                                <Text style={styles.pText}>
                                Measuring ourselves against the highest standards of integrity.
                                </Text>
                                <Text style={styles.pText}>
                                Making a positive impact and continuous improvement.
                                </Text>
                            </View>


                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView >
        )
    }
}

export default AboutUs
