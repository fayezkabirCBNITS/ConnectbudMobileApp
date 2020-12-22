import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './style'
import CommonStyle from '../../../../CommonStyles'
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from "react-native-vector-icons/AntDesign";


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List: [
                { id: 1, point: "Copying, distributing, or disclosing any part of the Services in any medium, including without limitation by any automated or non-automated scraping" },
                { id: 2, point: "Transmitting spam, chain letters, or other unsolicited communications." },
                { id: 3, point: "Attempting to interfere with, compromise the system integrity or security or decipher any transmissions to or from the servers running the Services." },
                { id: 4, point: "Taking any action that imposes, or may impose at our sole discretion an unreasonable or disproportionately large load on our infrastructure." },
                { id: 5, point: "Uploading invalid data, viruses, worms, or other software agents through the Services." },
                { id: 6, point: "Collecting or harvesting any personally identifiable information from the Services, except as expressly permitted by certain features of the Services." },
                { id: 7, point: "Using the Services for any commercial solicitation purposes." },
                { id: 8, point: "Impersonating another person or otherwise misrepresenting your affiliation with a person or entity, conducting fraud, hiding or attempting to hide your identity." },
                { id: 9, point: "Interfering with the proper working of the Services." },
                { id: 10, point: "Accessing any content on the Services through any technology or means other than those provided or authorized by the Services." },
                { id: 11, point: "Bypassing the measures we may use to prevent or restrict access to the Services, including without limitation, features that prevent or restrict use or copying of any content or enforce limitations on use of the Services or the content therein." },
                { id: 12, point: "Disclosing or sharing login credentials." },
                { id: 13, point: "Post or submit any inaccurate, incomplete, or false biographical information or another person's information." },
                { id: 14, point: "Post or submit any material that is unlawful, illegal, defamatory, offensive, discriminatory, threatening, or obscene as determined by ConnectBud." },
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
                            <Text style={styles.headText}>ConnectBud Terms of Service</Text>

                            <Text style={styles.primaryHead}>OVERVIEW</Text>
                            <Text style={styles.fonts}>Connectbud.com is a student freelancing platform that connects college students with the hirers and recruiters. The Website contains features that enable College Students and Employers to do, among other things, the following:</Text>

                            <Text style={styles.pText}><Text style={styles.SemiBold}>Employers: </Text>Employers are generally hirers and recruiters who can Post Jobs, search for College Students, communicate with College Students, negotiate with College Students, award Jobs to College Students, manage Jobs, leave feedback for College Students, and pay College Students.</Text>

                            <Text style={styles.pText}><Text style={styles.SemiBold}>College Students: </Text>
                                Create Profiles, Advertise Capabilities, Submit Quotes, Negotiate with Employers, Obtain Job Awards, Invoice, Obtain Feedback from Employers, and Receive Payment from Employers.
                            </Text>

                            <Text style={styles.pText}>
                                The following terms of service (these "Terms of Service"), govern your access to and use of the ConnectBud website, including any content, functionality and services offered on or through <Text style={{ color: '#71b85f' }}>www.connectbud.com</Text>. Please read the Terms of Service carefully before you start to use the Site. By using the Site, opening an account or by clicking to accept or agree to the Terms of Service when this option is made available to you, you accept and agree to be bound and abide by these Terms of Service and our Privacy Policy.
                            </Text>

                            <Text style={[styles.fonts],{marginTop: 15} }>
                                THESE TERMS PROVIDE THAT ALL DISPUTES BETWEEN YOU AND CONNECTBUD WILL BE RESOLVED BY BINDING ARBITRATION. YOU AGREE TO GIVE UP YOUR RIGHT TO GO TO COURT TO ASSERT OR DEFEND YOUR RIGHTS UNDER OR RELATING TO THIS CONTRACT, DO NOT ACCESS OR USE ANY OF THE SERVICES IF YOU DO NOT AGREE TO THESE TERMS IN THEIR ENTIRETY.
                            </Text>

                            <Text style={styles.primaryHead}>REGISTRATION</Text>

                            <Text style={styles.SemiBold}>(A) Eligibility</Text>
                            <Text style={styles.fonts}>To access our Services through our Website, you must be a legal entity, or an individual of eighteen (18) years of age or older who can form legally binding contracts.</Text>

                            <Text style={[styles.fonts],{marginVertical: 10} }>To become a Registered User, you must accept all of the terms and conditions in, incorporated by reference in, and linked to, these Terms of Service. By becoming a Registered User, you agree to:</Text>
                            <View style={{ flexDirection: 'row', marginHorizontal: '5%' }}>
                                <AntDesign name="checkcircle"
                                    color="#71b85f"
                                    size={15} />
                                <Text style={styles.points}>
                                    Abide by the Terms of Service and the processes, procedures, and guidelines described throughout the Website
                                </Text>

                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: '5%', marginTop: 10 }}>
                                <AntDesign name="checkcircle"
                                    color="#71b85f"
                                    size={15} />
                                <Text style={styles.points}>
                                    Be financially responsible for your use of the Website and the purchase or delivery of services
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: '5%', marginTop: 10 }}>
                                <AntDesign name="checkcircle"
                                    color="#71b85f"
                                    size={15} />
                                <Text style={styles.points}>
                                    Perform your obligations as specified by any Job Agreement that you accept, unless such obligations are prohibited by law or by the Terms of Service.
                                </Text>
                            </View>

                            <Text style={[styles.fonts],{marginVertical: 10} }>connectbud.com reserves the right, in its sole discretion, to refuse, suspend, or terminate Services to anyone.</Text>

                            <Text style={styles.SemiBold}>(B) Registration</Text>
                            <Text style={styles.fonts}>To become a Registered User and to access Services you must register for an Account. You agree to provide true, accurate and complete information as prompted by the registration form and all forms you access on the Website, and to update this information to maintain its truthfulness, accuracy and completeness.</Text>

                            <Text style={styles.SemiBold}>(C) General Rules for Use of Services</Text>
                            <Text style={styles.SemiBold}>You agree not to engage in any of the following prohibited activities:</Text>

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

                            <Text style={styles.primaryHead}>RELATIONSHIP</Text>
                            <Text style={styles.SemiBold}>(A) Employer and College Student</Text>
                            <Text style={styles.fonts}>
                                Job Agreement: The engagement, contracting and management of a Job are between an Employer and a College Student.
                                Upon acceptance of a Quote, the Employer agrees to purchase, and the College Student agrees to deliver,
                                the services and related deliverables in accordance with the following agreements: (a)
                                the Job Agreement between Employer and College Student including the Quote, Job Description,
                                and other terms and conditions as communicated between Employer and College Student on the Website or
                                otherwise, (b) these Terms of Service, and (c) any other content uploaded on the ConnectBud website.
                                You agree not to enter into any contractual provisions in conflict with these Terms of Service.
                                Any provision of a Job Agreement in conflict with these Terms of Service is void.
                                Employer is responsible for managing, inspecting, accepting and paying for satisfactory services and
                                deliverables in accordance with the Job Agreement in a timely manner. College Student is
                                responsible for the performance and quality of the services in accordance with the Job
                                Agreement in a timely manner. Employer and College Student each covenant and agrees to act
                                with good faith and fair dealing in performance of the Job Agreement.
                            </Text>

                            <Text style={styles.pText}><Text style={styles.SemiBold}>Independence: </Text>
                                Employers are generally hirers and recruiters who can Post Jobs, search for College Students, communicate with College Students, negotiate with College Students, award Jobs to College Students, manage Jobs, leave feedback for College Students, and pay College Students.
                            </Text>

                            <Text style={styles.subHeader}>USER CONTENT DISCLAIMER</Text>
                            <Text style={styles.fonts}>
                                We are under no obligation to edit or control User Content that you or other users post or publish,
                                and will not be in any way responsible or liable for User Content.
                                ConnectBud may, however, at any time and without prior notice, screen, remove, edit,
                                or block any User Content that in our sole judgment violates these Terms or is otherwise objectionable.
                                You understand that when using the Service you will be exposed to User Content from a variety of
                                sources and acknowledge that User Content may be inaccurate, offensive, indecent, or objectionable. You agree to waive,
                                and do waive, any legal or equitable right or remedy you have or may have against ConnectBud with respect to User Content.
                                We expressly disclaim any and all liability in connection with User Content. If notified by a user or content owner that User Content allegedly does not conform to these Terms,
                                we may investigate the allegation and determine in our sole discretion whether to remove the User Content, which we reserve the right to do at any time and without notice. For clarity,
                                ConnectBud does not permit copyright-infringing activities on the Service.
                            </Text>

                            <Text style={styles.subHeader}>PRIVACY</Text>
                            <Text style={styles.fonts}>
                                Your personal data will be collected and processed by ConnectBud in accordance with our Privacy Policy.
                                The personal data collected may include, without limitation, your name, address, telephone,
                                and email address and other data obtained from you from time to time.
                            </Text>

                            <Text style={styles.subHeader}>COMPLIANCE WITH LAWS</Text>
                            <Text style={styles.fonts}>
                                You agree to comply with all applicable laws, regulations and ordinances in the use of the Services and the conduct of your activities.
                            </Text>

                            <Text style={styles.subHeader}>SERVICE FEES</Text>
                            <Text style={styles.fonts}>
                                For each payment between each employer and college student, ConnectBud takes a percent of the payment volume as
                                a service fee (“Service Fee”). ConnectBud reserves the right to change its fee structure and payment methods at any time, and will inform Users via the Service.
                            </Text>

                            <Text style={styles.subHeader}>CLOSING YOUR ACCOUNT</Text>
                            <Text style={styles.fonts}>
                                You may close your Account at any time. The option is located in the Account Settings. We may retain some of your personal information to satisfy regulatory requirements and our own external obligations. Closing your account does not necessarily delete or remove all of the information we hold.
                            </Text>

                            <Text style={styles.subHeader}>OWNERSHIP; PROPRIETARY RIGHTS</Text>
                            <Text style={styles.fonts}>
                                The Service is owned and operated by ConnectBud. The visual interfaces, graphics, design, compilation, information, data, computer code (including source code or object code), products, software, services, and all other elements of the Service (“Materials”) provided by ConnectBud are protected by intellectual property and other laws. All Materials included in the Service are the property of ConnectBud or our third-party licensors. Except as expressly authorized by ConnectBud, you may not make use of the Materials. ConnectBud reserves all rights to the Materials not granted expressly in these Terms.
                            </Text>

                            <Text style={styles.subHeader}>FEEDBACK</Text>
                            <Text style={styles.fonts}>
                                If you have any questions about this User Agreement or if you wish to report breaches of this User Agreement, please contact us at <Text style={{color:'#71b85f'}}>support@connectbud.com</Text>
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default index
