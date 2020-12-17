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
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';

class ProposalFromFreelancer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

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
                        <ScrollView style={styles.scrolling} showsVerticalScrollIndicator={false}>


                            <View>
                                {
                                    new Array(3).fill({ hi: "hi" }).map((data, idx) => (

                                        <Collapse style={styles.collapseWrap} key={idx}>
                                            <CollapseHeader>
                                                <Separator style={styles.separator} bordered>
                                                    <View style={styles.collapseTitle}>
                                                        <Text style={styles.projectHead}>Project Name : </Text>
                                                        <Text style={styles.projectName}>Ui/Ux Designer - Full-time remote position</Text>
                                                    </View>
                                                </Separator>
                                            </CollapseHeader>
                                            <CollapseBody>

                                                <View>
                                                    <View style={styles.studentName}>
                                                        <Text style={styles.namelabel}>Student Name : </Text>
                                                        <Text style={styles.name}>kabir........</Text>
                                                    </View>

                                                    {
                                                        new Array(5).fill({ hi: "hi" }).map((data, index) => (
                                                            <View key={index} style={styles.quesAns}>
                                                                <Text>Q.. Why should hire you for this project ?</Text>
                                                                <Text>because bevause something in  meeee......</Text>
                                                            </View>

                                                        ))
                                                    }

                                                    <View style={styles.reqprSkill}>
                                                        <Text>Required skills for the Project</Text>
                                                        <View style={styles.skillGroup}>
                                                            <Text style={styles.PrSkills}>Ux/Ui</Text>
                                                            <Text style={styles.PrSkills}>React Js</Text>
                                                            <Text style={styles.PrSkills}>Python</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.reqprSkill}>
                                                        <Text>Students Matched skills</Text>
                                                        <View style={styles.skillGroup}>
                                                            <Text style={styles.PrSkills}>Ux/Ui</Text>
                                                            <Text style={styles.PrSkills}>React Js</Text>
                                                            <Text style={styles.PrSkills}>Python</Text>
                                                        </View>
                                                    </View>

                                                    <View style={styles.btnWrapper}>
                                                        <TouchableOpacity style={styles.accbtn}>
                                                            <Text style={styles.btnText}>Accept</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.rejBtn}>
                                                            <Text style={styles.btnText}>Reject</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </CollapseBody>
                                        </Collapse>

                                    ))
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default ProposalFromFreelancer;