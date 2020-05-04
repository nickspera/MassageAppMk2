import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        services: state.services,
        reviews: state.reviews
    };
};

function RenderService(props) {

    const {service} = props;

    if (service) {
        return (
            <Card
                featuredTitle={service.name}
                image={{uri: baseUrl + service.image}}>
                <Text style={{margin: 10}}>
                    {service.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

function RenderReviews({reviews}) {

    const renderReviewItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Reviews'>
            <FlatList
                data={reviews}
                renderItem={renderReviewItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
    );
}

class ServiceInfo extends Component {

    constructor(props) {
        super(props);
         this.state= {
         };
    }

    static navigationOptions = {
        title: 'Service Information'
    }

    render() {
        const serviceId = this.props.navigation.getParam('serviceId');
        const service = this.props.services.services.filter(service => service.id === serviceId)[0];
        const reviews = this.props.reviews.reviews.filter(review => review.serviceId === serviceId);
        return (
            <ScrollView>
                <RenderService service={service} />
                <RenderReviews reviews={reviews} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(ServiceInfo);