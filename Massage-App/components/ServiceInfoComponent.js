import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postReview } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        services: state.services,
        reviews: state.reviews
    };
};

const mapDispatchToProps = {
    postReview: (serviceId, rating, author, text) => (postReview(serviceId, rating, author, text))
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
                
                <View style={styles.cardRow}>
                        <Icon
                            name={'pencil'}
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                            style={styles.cardItem}
                        />
                    </View>
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
             showModal: false,
             rating: 5,
             author: '',
             text: ''
         };
    }
//
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
//
    handleReview(serviceId) {
        this.props.postReview(serviceId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
    }
//
    resetForm() {
        this.setState({
            rating: 5,
            author: '',
            text: '',
            showModal: false
        });
    }
//

    static navigationOptions = {
        title: 'Service Information'
    }

    render() {
        const serviceId = this.props.navigation.getParam('serviceId');
        const service = this.props.services.services.filter(service => service.id === serviceId)[0];
        const reviews = this.props.reviews.reviews.filter(review => review.serviceId === serviceId);
        return (
            <ScrollView>
                <RenderService service={service}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderReviews reviews={reviews} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                            style={{paddingVertical: 10}}
                            type='star'
                            ratingCount={5}
                            showRating
                            imageSize={40}
                            // edit 152
                            startingValue={this.state.rating}
                            //
                            onFinishRating={(rating) => this.setState({rating: rating})}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type:'font-awesome', name: 'user-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={value => this.setState({author: value})}
                            value
                        />
                        <Input
                            placeholder='Review'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={text => this.setState({text: text})}
                            value={this.state.text}
                        />
                        <View style={{margin: 10}}>
                            <Button
                                title='Submit'
                                color='#5637DD'
                                onPress={() => {
                                    this.handleReview(serviceId);
                                    this.resetForm();
                                }}
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                title='Cancel'
                                color='#808080'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceInfo);