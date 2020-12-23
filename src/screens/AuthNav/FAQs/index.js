import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import CommonStyle from '../../../../CommonStyles'
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../../components/Header'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from '../Profile/style';


class FAQsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: { isTrue: false, ind: [] },
            list: [
                {
                    id: 1,
                    title: 'Can students directly register into the ConnectBud platform or they need to come through TPO?',
                    body: 'Students can directly register to ConnectBud platform by using their college email address. For the students who do not have college email address, they can ask their college officials to have their college onboard to ConnectBud platform and upload the personal student email IDs to ConnectBud database.'
                },
                {
                    id: 2,
                    title: 'How do you validate that only genuine students become part of the platform?',
                    body: 'ConnectBud maintains a strict validation process so that only genuine students can access and use our platform. Apart from making it mandatory to register into the platform with proper college email ID, we personally contact with the user and ask relevant questions or asking to furnish documents related to their study in order to verify their claim of being a student. We also directly partner with the colleges and they provided us a valid list of students of their colleges.'
                },
                {
                    id: 3,
                    title: 'Is there any fees to register to the platform for student or for the folks who want to post project?',
                    body: 'No. ConnectBud platform is ABSOLUTELY FREE TO USE for both, the college students and the employers. There are no registration fees or other hidden charges.'
                },
                {
                    id: 4,
                    title: 'If I want to put internship job, can I post it?',
                    body: 'It is very simple to put internship jobs on ConnectBud. For posting internship jobs, go to the “Recruiters” section of the website, log in with your email, fill out the project details section, and publish internship job.'
                },
                {
                    id: 5,
                    title: 'Is there any certificate given for the projects done?',
                    body: 'Yes, ConnectBud provides certificates to the college students after the successful completion of the projects.'
                },
                {
                    id: 6,
                    title: 'Are the projects on the platform paid?',
                    body: 'All the posted projects on the ConnectBud platform are paid with the amount of money clearly stated in the price box.'
                },
                {
                    id: 7,
                    title: 'I dont have a valid college domain email address, can I still register?',
                    body: 'Of course, if you are a current student you can register to ConnectBud without a valid college domain email address. Contact your college officials to onboard the name of the college to the ConnectBud platform and upload your email address to our database, and you’ll be able to use the platform for cashing in freelancing opportunities.'
                },
                {
                    id: 8,
                    title: 'If I have additional questions, which email address should I send my queries to?',
                    body: 'You can send additional questions to support@connectbud.com'
                },
                {
                    id: 9,
                    title: 'Where is the company based out of?',
                    body: 'ConnectBud is a California based company with a state-of-the-art development center in India.'
                },
            ],
        }
    }

    handleCollapse = (cl, id) => {
        const arr = this.state.collapsed.ind;
        arr.push(id);
        this.setState({ collapsed: { ...this.state.collapsed, isTrue: cl, ind: arr } });
    };

    static navigationOptions = {
        headerShown: false,
    };

    render() {
        console.log('rese')
        return (
            <SafeAreaView style={CommonStyle.safeAreaView}>
                <View style={CommonStyle.main}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Header />
                        <View style={styles.mainContainer}>
                            <Text style={styles.headerText}>FAQs</Text>
                            <Text style={styles.subHeadText}>We are sharing some of our most frequently asked questions to help you out</Text>
                            <View>
                                {
                                    this.state.list.map((item, idx) => (
                                        <Collapse style={styles.collapse} key={idx} onToggle={(isCollapsed) =>
                                            this.handleCollapse(isCollapsed, idx)
                                        }>
                                            <CollapseHeader style={styles.collapseHeader}>
                                                <View style={styles.collapseId}>
                                                    <Text style={styles.Ids}>{idx + 1}</Text>
                                                </View>
                                                <View style={styles.collapseTitle}>
                                                    <Text style={styles.collapseTitleText}>{item.title}</Text>
                                                </View>
                                                <View style={{ marginLeft: 30 }}>
                                                    {this.state.collapsed.isTrue &&
                                                        this.state.collapsed.ind.includes(idx) ? (
                                                            <FontAwesome
                                                                name="angle-up"
                                                                color="#71b85f"
                                                                size={25}
                                                            />
                                                        ) : (
                                                            <FontAwesome
                                                                name="angle-down"
                                                                color="#71b85f"
                                                                size={25}
                                                            />
                                                        )}

                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody style={styles.CollapseBody}>
                                                <Collapse>
                                                    <CollapseHeader>
                                                        <Text style={styles.collapseBodyText}>
                                                            {item.body}
                                                        </Text>
                                                    </CollapseHeader>
                                                </Collapse>
                                            </CollapseBody>
                                        </Collapse>
                                    ))
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView >
        )
    }
}

export default FAQsScreen
