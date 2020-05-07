import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,
    Picker, Button, Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Schedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            service: 'Massage',
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Appointment'
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleSchedule() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            service: 'Massage',
            date: '',
            showModal: false
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
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>You're Scheduled!</Text>
                        <Text style={styles.modalText}>Service: {this.state.service}</Text>
                        <Text style={styles.modalText}>Date: {this.state.date} </Text>
                        <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#05668D'
                            title='Close'
                        />
                    </View>
                </Modal>
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
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#05668D',
        textAlign: 'center' ,
        color: '#FFF',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Schedule;