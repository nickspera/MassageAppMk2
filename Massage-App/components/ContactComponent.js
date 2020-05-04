import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact'
    };

    render() {
        return (
            <ScrollView>
                <Card
                    title='Contact Information'
                    wrapperStyle={{margin: 20}}>
                    <Text>
                        Charleston, SC 29403
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        U.S.A.
                    </Text>
                    <Text>
                        Phone: +1 (843) XXX-XXXX
                    </Text>
                    <Text>
                        email: nick******@gmail.com
                    </Text>
                </Card>
            </ScrollView>
        )
    }
}

export default Contact;