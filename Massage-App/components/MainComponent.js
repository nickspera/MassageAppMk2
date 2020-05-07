import React, { Component } from 'react';
import Home from './HomeComponent';
import Bodywork from './BodyworkComponent';
import ServiceInfo from './ServiceInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Schedule from './ScheduleComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { fetchServices, fetchReviews, fetchPromotions } from '../redux/ActionCreators';
import SafeAreaView from 'react-native-safe-area-view';

const mapDispatchToProps = {
    fetchServices,
    fetchReviews,
    fetchPromotions
};

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#05668D'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const BodyworkNavigator = createStackNavigator(
    {
        Bodywork: {
            screen: Bodywork,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        ServiceInfo: { screen: ServiceInfo }
    },
    {
        //initialRouteName: 'Bodywork',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#05668D'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            }
        }
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
    //    initialRouteName: 'About',
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#05668D'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        //initialRouteName: 'Contact',
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#05668D'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ScheduleNavigator = createStackNavigator(
    {
        Schedule: { screen: Schedule }
    },
    {
        //initialRouteName: 'Schedule',
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#05668D'
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                color: '#FFF'
            },
            headerLeft: <Icon
                name='calendar'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{top: 'always', horiontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/merkaba_white.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Nick Spera, LMT</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
)

const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Bodywork: {
            screen: BodyworkNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Schedule: {
            screen: ScheduleNavigator,
            navigationOptions: {
                drawerLabel: 'Schedule Appointment',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='calendar'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Nick',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#67B3C6',
        contentComponent: CustomDrawerContentComponent
    }
);

class Main extends Component {

    componentDidMount() {
        this.props.fetchServices();
        this.props.fetchReviews();
        this.props.fetchPromotions();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}>
                <MainNavigator />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#05668D',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#FFF',
        fontSize: 24
    },
});

export default connect(null, mapDispatchToProps)(Main);