import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Schedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            service: 'Massage',
            date: ''
        }
    }

    static navigationOptions = {
        title: 'Reserve Appointment'
    }

    handleSchedule() {
        console.log(JSON.stringify(this.state));
        this.setState({
            service: 'Massage',
            date: ''
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Type of Service</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.service}
                        onValueChange={itemValue => this.setState({service: itemValue})}>
                        <Picker.Item label='Massage' value='Massage' />
                        <Picker.Item label='CranioSacral' value='CranioSacral' />
                        <Picker.Item label='BioEnergetic Stimulation Technique' value='BioEnergetic Stimulation Technique' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => {this.setState({date: date})}}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleSchedule()}
                        title='Search'
                        color='#05668D'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Schedule;