import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'
// import { List } from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';

class AddskillScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: {isTrue : false , ind : []},
            selectedCategoy: [],
            dummyCategoryArr: [
                {
                    cat: "software development",
                    icon: <FontAwesome name="connectdevelop" color="#000" size={35} />
                },
                {
                    cat: "online coding",
                    icon: <FontAwesome name="connectdevelop" color="#000" size={35} />
                },
                {
                    cat: "homework",
                    icon: <FontAwesome name="home" color="#000" size={35} />
                },
                {
                    cat: "design",
                    icon: <FontAwesome name="connectdevelop" color="#000" size={35} />
                },
                {
                    cat: "homework",
                    icon: <FontAwesome name="home" color="#000" size={35} />
                },
                {
                    cat: "Language",
                    icon: <FontAwesome name="language" color="#000" size={35} />
                },
                {
                    cat: "music & arts",
                    icon: <FontAwesome name="music" color="#000" size={35} />
                },
                {
                    cat: "homework",
                    icon: <FontAwesome name="home" color="#000" size={35} />
                },
                {
                    cat: "fitness",
                    icon: <FontAwesome name="connectdevelop" color="#000" size={35} />
                },
                {
                    cat: "music & arts",
                    icon: <FontAwesome name="connectdevelop" color="#000" size={35} />
                },
                {
                    cat: "fitness",
                    icon: <FontAwesome name="connectdevelop" color="#000" size={35} />
                },
            ]
        };
    }


    static navigationOptions = {
        headerShown: false,
    };

    handleCollapse = (cl,id) => {
        const arr = this.state.collapsed.ind;
        arr.push(id)
        this.setState({collapsed :{...this.state.collapsed ,isTrue : cl , ind : arr } })
    }

    render() {
        // console.warn(deviceWidth);
        return (
            <SafeAreaView style={CommonStyles.safeAreaView}>
                <View style={CommonStyles.main}>

                    <CommonStatusBar />
                    <Header />
                    <View style={CommonStyles.container}>
                        <View style={styles.selectSkill}>
                            <Text style={styles.selectSkillText}>Select the skills</Text>
                            
                            <Ionicons name="ios-add-circle" color="#000" size={45} />
                        </View>
                        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                            <View>
                                {
                                    new Array(2).fill({ hi: "hello" }).map((data, idx) => (
                                        <Collapse key={idx} onToggle={(isCollapsed) => this.handleCollapse(isCollapsed , idx)}>
                                            <CollapseHeader>
                                                <Separator
                                                    style={styles.accordianhead} bordered>
                                                    <View style={styles.separator}>
                                                        <View style={styles.accordianHeader}>
                                                            <View style={styles.accordianHeadIcon}><FontAwesome name="code" color="#fff" size={25} /></View>
                                                            <Text style={styles.accordianHeadTitle}>Online Coding</Text>
                                                        </View>
                                                        <View style={styles.angle}>
                                                            {
                                                                this.state.collapsed.isTrue && this.state.collapsed.ind.includes(idx) ?
                                                                    <FontAwesome name="angle-up" color="#fff" size={25} />
                                                                    :
                                                                    <FontAwesome name="angle-down" color="#fff" size={25} />
                                                            }
                                                        </View>
                                                    </View>
        
                                                </Separator>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <View style={styles.itemswrapper}>
                                                    <ScrollView showsVerticalScrollIndicator={false}>
                                                        {
                                                            new Array(3).fill({ hi: "hello" }).map((data, idx) => (
                                                                <View style={styles.skillItems} key={idx}>
                                                                    <Text>Al/ML</Text>
                                                                </View>
        
                                                            ))
                                                        }
                                                    </ScrollView>
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    ))
                                }
                            </View>
                        </ScrollView>
                        <View>
                            <TouchableOpacity style={styles.continueBtn} onPress={() =>  this.props.navigation.navigate("ProfileScreen")}>
                                <Text  style={styles.continueText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default AddskillScreen;
