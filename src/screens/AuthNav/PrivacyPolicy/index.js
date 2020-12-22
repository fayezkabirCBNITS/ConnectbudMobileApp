import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './style'
import CommonStyle from '../../../../CommonStyles'
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import AntDesign from "react-native-vector-icons/AntDesign";


class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List: [
                { id: 1, point: "To provide and improve the Service, complete your transactions, and address your inquiries, process your registration, verify the information you provide is valid, and for compliance and internal business purposes." },
                { id: 2, point: "To contact you with administrative communications, marketing or promotional materials (on behalf of ConnectBud or third parties) and other information that may be of interest to you." },
                { id: 3, point: "Preventing fraud, spam, and complying with legal obligations." },
                { id: 4, point: "Giving you relevant search results and recommended jobs to allow you to participate in interactive features of our websites when you choose to do so." },
                { id: 5, point: "To provide customer support." },
                { id: 6, point: "To gather analysis or valuable information so that we can improve our websites." },
                { id: 7, point: "To detect, prevent and address technical issues." },
                { id: 8, point: "To provide you with notices about your account, email-instructions, etc." },
                { id: 9, point: "To provide you with news and general information about our websites in any other way we may describe when you provide the information." },
            ]
        }
    }

    static navigationOptions = {
        headerShown: false,
    };

    render() {
        return (
            <SafeAreaView style={CommonStyle.safeAreaView}>
                <View style={CommonStyle.main}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Header />

                        <View style={{ marginHorizontal: '5%' }}>
                            <Text style={styles.headText}>ConnectBud Privacy Policy</Text>

                            <Text style={[styles.fonts, { marginTop: 5 }]}>ConnectBud (“we,” “us,” “our”) values the trust you place in us when you give us access to your Personal Data. This Privacy Policy describes how we work to maintain that trust and details our collection, use and disclosure of the information you give to us when you access or use connectbud.com website. If you do not agree with this Privacy Policy, your choice is not to use connectbud.com website.</Text>

                            <Text style={styles.primaryHead}>INFORMATION WE COLLECT</Text>
                            <Text style={styles.pText}>We collect information from and about you when you use our Site. We may also obtain information about you from our affiliates and business partners, other third-parties and publicly available sources.</Text>

                            <Text style={[styles.SemiBold, { marginTop: 10 }]}>We may request, collect, or process the following information: </Text>

                            <Text style={styles.pText}><Text style={styles.SemiBold}>Account Details - </Text>
                                username, profile picture.
                            </Text>
                            <Text style={styles.pText}><Text style={styles.SemiBold}>Contact Details - </Text>
                                college email address, corporate email address, phone number
                            </Text>
                            <Text style={styles.pText}><Text style={styles.SemiBold}>Location Details - </Text>
                                physical address, time zone.
                            </Text>
                            <Text style={styles.pText}><Text style={styles.SemiBold}>Identity Details -  </Text>
                                full name, proof of identity, proof of address, photograph of the user.
                            </Text>
                            <Text style={styles.pText}><Text style={styles.SemiBold}>Financial Information - </Text>
                                credit card details, wire transfer details, payment processor details, tax numbers
                            </Text>
                            <Text style={styles.pText}><Text style={styles.SemiBold}>Job Applicant Information - </Text>
                                If you apply for a job with us — awesome! You may provide us with information like your name, contact information, resume or CV, and work authorization verification as part of the application process.
                            </Text>
                            <Text style={styles.pText}><Text style={styles.SemiBold}>User Generated Content - </Text>
                                project descriptions and attachments, bid description, user profiles, user reviews, user messages etc.
                            </Text>

                            <Text style={styles.primaryHead}>USE OF INFORMATION</Text>
                            <Text style={styles.pText}>We use information collected through the Service to provide and improve the Service, process your requests, prevent fraud, provide you with information and advertising that may interest you, comply with the law, and as otherwise permitted with your consent.</Text>

                            <Text style={[styles.SemiBold, { marginTop: 10 }]}>We Use Information We Collect - </Text>
                            {
                                this.state.List.map((item, idx) => (
                                    <View style={styles.pointPara} key={idx}>
                                        <AntDesign name="checkcircle"
                                            color="#71b85f"
                                            size={15}
                                            style={{ marginTop: 4 }}
                                        />
                                        <Text style={styles.points}>
                                            {item.point}
                                        </Text>
                                    </View>
                                ))
                            }

                            <Text style={styles.primaryHead}>HOW WE PROCESS PERSONAL DATA</Text>
                            <Text style={styles.fonts}>
                                We will only process your Personal Data if we have a lawful basis for doing so.
                                Lawful bases for processing include consent, contractual necessity and our “legitimate interests”
                                or the legitimate interest of others. In some cases, we process Personal Data based on the consent
                                you expressly grant to us at the time we collect such Personal Data. When we process Personal Data
                                based on your consent, it will be expressly indicated to you at the point and time of collection.
                                From time to time, we may also need to process Personal Data to comply with a legal obligation,
                                if it is necessary to protect the vital interests of you or other data subjects, or if it is
                                necessary for a task carried out in the public interest.
                            </Text>

                            <Text style={styles.primaryHead}>SHARING INFORMATION</Text>
                            <Text style={styles.SemiBold}>How We Share Information</Text>
                            <Text style={styles.fonts}>
                                We share information about you in limited circumstances, and with appropriate safeguards on your privacy.
                            </Text>

                            <Text style={styles.pText}><Text style={styles.SemiBold}>Google Analytics - </Text>
                                We use Google Analytics to track website traffic. Google Analytics is a web analytics
                                service offered by Google. Google uses the data collected to track and monitor the use of our websites.
                                This data is shared with other Google services.
                            </Text>

                            <Text style={styles.pText}><Text style={styles.SemiBold}>Legal and Regulatory Requirements - </Text>
                                We may disclose information about you in response to a subpoena, court order, or other governmental requests. 
                                We may share your personal data with third parties if we are under a duty to disclose or share your 
                                personal data in order to comply with any legal obligation, or in order to enforce or apply our site 
                                terms of use or to protect the rights, property or safety of our site, our users, and others.
                            </Text>

                            <Text style={styles.pText}><Text style={styles.SemiBold}>Business Transfers - </Text>
                                As we develop our business, we might sell or buy businesses or assets. 
                                In the event of a corporate sale, merger, reorganization, dissolution or similar event,
                                Personal Data may be part of the transferred assets.
                            </Text>

                            <Text style={styles.primaryHead}>CHILDREN</Text>
                            <Text style={styles.pText}>
                                The ConnectBud website is intended for children under 18 years old. We do not 
                                knowingly collect personal information from children under 18. No one under the 
                                age of 18 years is allowed to provide any Personal Information to connectbud.com. 
                                If you are less than 18 years old at the time of your first visit to connectbud.com, 
                                you are prohibited from using the website further entirely on your own.
                            </Text>

                            <Text style={styles.primaryHead}>CHANGES TO PRIVACY STATEMENT</Text>
                            <Text style={styles.pText}>
                                Changes to this privacy policy will be made when required in response to changing legal, 
                                technical or business development. We recommend that you regularly check for changes and 
                                that you review this policy when visiting our website. If you do not agree with any aspect of 
                                the updated policy, you must cease using our services.
                            </Text>

                            <Text style={styles.primaryHead}>CONTACT</Text>
                            <Text style={styles.pText}>
                                If you have questions about your User account, job alerts, applications to Job Advertisements, 
                                or any other Services-related questions, please contact us by email at <Text style={{color:'#71b85f'}}>support@connectbud.com</Text>
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default PrivacyPolicy
