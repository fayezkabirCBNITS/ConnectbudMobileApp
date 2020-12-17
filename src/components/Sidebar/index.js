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
                    <Text>Side Menu</Text>
                   </View>
            </SafeAreaView>

        )
    }
}
