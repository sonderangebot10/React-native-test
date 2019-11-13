import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';

export default class Account extends Component {
    render() {
        return (
            <ScrollView>
                <Text 
                    style={{fontSize: 27}}>
                    Welcome
                </Text>
                <View style={{margin: 10}} />
                <Button
                            onPress={this.props.onLogoutPress}
                            title="Logout"
                        />
            </ScrollView>
                )
    }
}