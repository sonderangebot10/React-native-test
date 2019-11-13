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
            <View>
                <Text>
                    Technologies used: {"\n"}
                    -React Native {"\n"}
                    -NodeJs {"\n"}
                </Text>
            </View>
            )
    }
}