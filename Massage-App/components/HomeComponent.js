import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        services: state.services,
        promotions: state.promotions
    };
};

function RenderItem({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text
                    style={{margin: 10}}>
                        {item.description}
                    </Text>
                </Card>
        );
    }
    return <View />
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.services.services.filter(service => service.featured)[0]} />
                <RenderItem
                    item={this.props.services.services.filter(service => service.featured)[1]} />
                <RenderItem
                    item={this.props.services.services.filter(service => service.featured)[2]} />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);