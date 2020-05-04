import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

function Mission() {
    return (
        <Card title='Mission'>
            <Text>
                Aliquam ultrices vehicula maximus. Nulla at tellus ac lectus lobortis dignissim. Pellentesque nisi ex, faucibus sit amet risus imperdiet, mollis iaculis quam. Sed gravida quam non massa imperdiet, a elementum justo ultricies. Sed rhoncus mi volutpat urna luctus luctus. In commodo neque vitae enim scelerisque, quis eleifend eros maximus. Nam at turpis et eros consectetur gravida. Vivamus faucibus vulputate tincidunt. Morbi pretium quam id turpis finibus vulputate.
            </Text>
        </Card>
    )
};

class About extends Component {

    static navigationOptions = {
        title: 'About Nick'
    };

    render() {
        return (
            <ScrollView>
                <Mission />
            </ScrollView>
        )
    }
};

export default About;