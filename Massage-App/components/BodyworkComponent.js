import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        services: state.services
    };
};

class Bodywork extends Component {

    static navigationOptions = {
        title: 'Bodywork'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderBodyworkItem = ({item}) => {
                return (
                    <Tile
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('ServiceInfo', { serviceId: item.id })}
                        imageSrc={{uri: baseUrl + item.image}}
                    />
                );
        };

        return (
            <FlatList
                 data={this.props.services.services}
                 renderItem={renderBodyworkItem}
                 keyExtractor={item => item.id.toString()}
             />
        )
    }
}

export default connect(mapStateToProps)(Bodywork);

// Edit so only the services with feature true are displayed on this page (commented out in shared/services.js)

// Display 5 random comments under the services listed