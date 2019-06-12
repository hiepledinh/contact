import React, {Component} from 'react';
import {Text, View} from 'react-native';
import getStyles from '../theme';

const styles = getStyles('App');

export default class AddContact extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Module <Text style={styles.accent}>Add Contact</Text>
                </Text>
            </View>
        );
    }
};
