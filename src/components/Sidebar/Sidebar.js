import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './style'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeAreaView style={styles.sidebar}>
                <View style={styles.sidewrap}>
                    <ImageBackground source={require('../../assets/images/sidebarbg.png')} style={styles.profiletop}>
                        <View style={styles.profileround} >
                            <Image source={require('../../assets/images/profile.png')} style={styles.profileimg} />
                            {/* <TouchableOpacity style={styles.profilebadge}>
                                        <Icon name="camera" color="#1cae81" size={16} />
                                    </TouchableOpacity> */}
                        </View>
                        <View style={styles.procontent}>
                            <Text style={styles.namepro}>John Doe</Text>
                        </View>
                    </ImageBackground>
                    <ScrollView>
                        <View style={styles.menuwrap}>
                            <TouchableOpacity style={styles.menulink}>
                                <View style={styles.imgbx}>
                                    <Image source={require('../../assets/images/micon1.png')} style={styles.micon} />
                                </View>
                                <Text style={styles.linktext}>Notification</Text>
                                <Icon name="chevron-forward" color="#fff" size={22} style={styles.angleicon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menulink}>
                                <View style={styles.imgbx}>
                                    <Image source={require('../../assets/images/micon2.png')} style={styles.micon} />
                                </View>
                                <Text style={[styles.linktext, styles.activetext]}>Profile</Text>
                                <Icon name="chevron-forward" color="#fff" size={22} style={styles.angleicon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menulink}>
                                <View style={styles.imgbx}>
                                    <Image source={require('../../assets/images/micon3.png')} style={styles.micon} />
                                </View>
                                <Text style={styles.linktext}>Edit Profile</Text>
                                <Icon name="chevron-forward" color="#fff" size={22} style={styles.angleicon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menulink}>
                                <View style={styles.imgbx}>
                                    <Image source={require('../../assets/images/micon4.png')} style={styles.micon} />
                                </View>
                                <Text style={styles.linktext}>Services</Text>
                                <Icon name="chevron-forward" color="#fff" size={22} style={styles.angleicon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menulink}>
                                <View style={styles.imgbx}>
                                    <Image source={require('../../assets/images/micon5.png')} style={styles.micon} />
                                </View>
                                <Text style={styles.linktext}>Near Service</Text>
                                <Icon name="chevron-forward" color="#fff" size={22} style={styles.angleicon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menulink}>
                                <View style={styles.imgbx}>
                                    <Image source={require('../../assets/images/micon6.png')} style={styles.micon} />
                                </View>
                                <Text style={styles.linktext}>More</Text>
                                <Icon name="chevron-forward" color="#fff" size={22} style={styles.angleicon} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.menulink}>
                                <View style={styles.imgbx}>
                                    <Image source={require('../../assets/images/micon7.png')} style={styles.micon} />
                                </View>
                                <Text style={styles.linktext}>Logout</Text>
                                <Icon name="chevron-forward" color="#fff" size={22} style={styles.angleicon} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>

        )
    }
}
