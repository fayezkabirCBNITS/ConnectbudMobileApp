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
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import CommonStyles from '../../../../CommonStyles';
import CommonStatusBar from '../../../components/StatusBar';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Picker } from '@react-native-community/picker';
import { withNavigation } from "react-navigation";
// import { updateslug, updateUserDetails } from "../../../redux/actions/user-data";
import { connect } from "react-redux";
import base64 from "base-64"
// import API_URL from '../../../config/ApiUrl';
import API_URL, { BASE_URL } from "../../../config/ApiUrl";
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";
import {Header} from 'react-navigation-stack'

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
            id: "",
            userID: "",
            profileImageSource: Image.resolveAssetSource(
                API_URL.PLACEHOLDER_SQUARE_IMAGE,
            ).uri,
            // profileImageToUpload: {},
            porfolioTitle: "",
            portfolioDescription: "",
            selectedCategory: "",
            liveUrl: "",
            portfolioId: ""
        }
    }
    componentDidMount = () => {
        console.log(this.props.navigation.state.params, "propsssssss")
        this.setState({ id: this.props.userDeatailResponse.row_id, userID: base64.decode(this.props.userDeatailResponse.user_id) });
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            // if(true) {
            if (this.props.navigation.state.params) {
                let body = new FormData();

                body.append("id", this.state.id);
                body.append("user_id", this.state.userID);

                //For Edit Intro
                body.append("first_name", "");
                body.append("last_name", "");
                body.append("category", "");
                body.append("skills", "");
                body.append("socialurls", "");

                //for Job
                body.append("experience_id", "");
                body.append("experience", "");
                body.append("description", "");
                body.append("projecturl", "");
                body.append("professionalurls", "");
                body.append("employment_type", "");
                body.append("willing_to_relocate", "");
                body.append("country", "");
                body.append("city", "");
                body.append("resumefile", "");
                body.append("videoresume", "");

                // For Education
                body.append("department", "");
                body.append("title", "");
                body.append("type", "");
                body.append("location", "");
                body.append("startDate", "");
                body.append("endDate", "");
                body.append("community", "");

                //For Portfolio
                body.append("portfolio_name", "");
                body.append("portfolio_des", "");
                body.append("portfolio_category", "");
                body.append("portfolio_link", "");
                body.append("image", "");
                body.append("portfolio_id", this.props.navigation.state.params.portfolioID)
                body.append("devices", "mobile");


                console.log(body, "add portfolio bodyyyy")
                axios
                    .post(`${BASE_URL}expertProfile/${base64.decode(this.props.userDeatailResponse.slug)}`, body)
                    .then((res) => {
                        
                        const response = res.data[0].portfolio[0];
                        this.setState({
                            porfolioTitle: response.title, portfolioDescription: response.description, portfolioId: response.id,
                            liveUrl: response.link, profileImageSource: response.image, selectedCategory: response.category
                        })
                        console.log(res.data[0].portfolio, "add portfolio")
                    });
            } else {

            }
        }
        );

    }
    static navigationOptions = {
        headerShown: false,
    };

    handleAddPortfolio = async data => {
        let body = new FormData();

        body.append("id", this.state.id);
        body.append("user_id", this.state.userID);

        //For Edit Intro
        body.append("first_name", "");
        body.append("last_name", "");
        body.append("category", "");
        body.append("skills", "");
        body.append("socialurls", "");

        //for Job
        body.append("experience_id", "");
        body.append("experience", "");
        body.append("description", "");
        body.append("projecturl", "");
        body.append("professionalurls", "");
        body.append("employment_type", "");
        body.append("willing_to_relocate", "");
        body.append("country", "");
        body.append("city", "");
        body.append("resumefile", "");
        body.append("videoresume", "");

        // For Education
        body.append("department", "");
        body.append("title", "");
        body.append("type", "");
        body.append("location", "");
        body.append("startDate", "");
        body.append("endDate", "");
        body.append("community", "");

        //For Portfolio
        body.append("portfolio_name", this.state.porfolioTitle);
        body.append("portfolio_des", this.state.portfolioDescription);
        body.append("portfolio_category", this.state.selectedCategory);
        body.append("portfolio_link", this.state.liveUrl);
        body.append("image", this.state.profileImageSource);
        (body.append("portfolio_id", this.state.portfolioId));
        body.append("devices", "mobile");


        console.log(body, "add portfolio bodyyyy")
        await axios
            .post(`${BASE_URL}expertProfile/${base64.decode(this.props.userDeatailResponse.slug)}`, body)
            .then((res) => {
                if (res.status === 200) this.props.navigation.navigate('ProfileScreen')
                console.log(res, "add portfolio")
            });
    }

    handleStateUpdate = (text, targetState) => {
        if (targetState === "title") {
            this.setState({ porfolioTitle: text.nativeEvent.text })
        } else if (targetState == "description") {
            this.setState({ portfolioDescription: text.nativeEvent.text })
        } else if (targetState == "liveUrl") {
            this.setState({ liveUrl: text.nativeEvent.text })
        }
    }

    handleCountry = async () => {
        this.setState({ showCountry: !this.state.showCountry });
    };
    handleImage = () => {
        let sendImage = []
        ImagePicker.openPicker({
            multiple: false,
            includeBase64: true,
            mediaType: 'photo'
        }).then(images => {
            console.log("images---", images)
            this.setState({ profileImageSource: "data:image/png;base64," + images.data });
            // this.setState({ profileImageSource: images.path });
            // let uploadImageCount = images.length
            // let oldImageCount = this.state.profileImageData.length
            // let totalImageCount = parseInt(uploadImageCount) + parseInt(oldImageCount)
            // console.log("totalImageCount---", totalImageCount)
        })
    }

    render() {
        console.log(this.state, "stateeeeeeeeeeeeeeeee")
        const renderCountryItems = ({ item }) => (
            <TouchableOpacity style={styles.headSec}>
                <View style={styles.details}>
                    <Text style={styles.flastListHead}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <SafeAreaView style={CommonStyles.safeAreaView} >
                <View style={CommonStyles.main}>
                    <CommonStatusBar />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={40}
                                color="#71b85f"
                            />
                        </TouchableOpacity>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={styles.image}
                        />
                        <View style={{ width: 35 }}></View>
                    </View>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={Header.HEIGHT + 90}
                        behavior="padding"
                        style={{flex: 1}}
                    >
                        <Text style={styles.headText}>Add a portfolio item</Text>

                        <View style={styles.formInput}>
                            <TextInput
                                returnKeyType="done"
                                placeholder="Portfolio Title eg. Python Development"
                                keyboardType="default"
                                style={styles.formGroup}
                                defaultValue={this.state.porfolioTitle}
                                onChange={(evt) => this.handleStateUpdate(evt, "title")}
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
                                defaultValue={this.state.portfolioDescription}
                                onChange={(evt) => this.handleStateUpdate(evt, "description")}
                            />
                        </View>

                        <View style={styles.skillView1}>
                            <View style={[styles.formGroup1]}>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={this.state.selectedCategory}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ selectedCategory: itemValue })
                                    }>
                                    <Picker.Item label="HomeWork" value="HomeWork" />
                                    <Picker.Item label="HomeWork" value="HomeWork" />
                                    <Picker.Item label="Online Coding" value="Online Coding" />
                                    <Picker.Item label="Design" value="Design" />
                                    <Picker.Item label="Fitness" value="Fitness" />
                                    <Picker.Item label="Music & Arts" value="Music & Arts" />
                                </Picker>
                            </View>
                        </View>


                        <View style={{ marginHorizontal: '5%', marginVertical: '2%', }}>
                            <TextInput
                                returnKeyType="done"
                                placeholder="Live URL"
                                keyboardType="default"
                                style={styles.formGroup}
                                defaultValue={this.state.liveUrl}
                                onChange={(evt) => this.handleStateUpdate(evt, "liveUrl")}
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
                            <View style={[styles.formSubGroupNum]}>
                                <TouchableOpacity
                                    onPress={this.handleImage}
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
                        <View style={{
                            width: 90,
                            height: 90,
                            marginTop: 10,
                            marginBottom: 20,
                            borderRadius: 15,
                            backgroundColor: 'rgba(152,152,152,0.2)',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image
                                style={styles.uploadImage}
                                source={{
                                    uri: `${this.state.profileImageSource}`,
                                }}
                            />

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
                                onPress={() => this.handleAddPortfolio()}
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
                    </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        userDeatailResponse: state.userData,
    };
};

// export default AddPortfolioScreen;
export default connect(mapStateToProps, null)(withNavigation(AddPortfolioScreen));