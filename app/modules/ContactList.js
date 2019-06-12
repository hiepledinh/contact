import React from 'react';
import {PermissionsAndroid} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {Text, View, FlatList, TouchableHighlight} from 'react-native';
import CONTACT from 'react-native-contacts';
import {createStackNavigator} from 'react-navigation';

import ViewContact from './ViewContact';
import colorS from '../config/color';
import {strings} from '../config/locales/i18n';
import {nvl} from '../utils/StringUtils.js';

const styles = require('../theme')('App');

class ContactList extends React.Component {

    constructor() {
        super();
        this.state = {searchText: '', contacts: []};
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': `${strings('title.contact')}`,
                'message': `${strings('requestPermissionMessage')}`
            }
        ).then(() => {
            CONTACT.getAll((err, contactsFromPhone) => {
                if (err === 'denied') {
                    // error
                } else {
                    this.setState({contacts: contactsFromPhone});
                    this.arrayholder = contactsFromPhone;
                }
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {strings('title.contact')}
                </Text>
                <View style={{marginTop: 5}}>
                    <SearchBar placeholder={strings('search')}
                               containerStyle={{backgroundColor: colorS.bright}}
                               inputContainerStyle={{backgroundColor: colorS.background, borderRadius: 30 / 2}}
                               inputStyle={{backgroundColor: colorS.background, borderRadius: 20 / 2}}
                               onChangeText={text => this.searchFilterFunction(text)}
                               value={this.state.search}

                    />
                </View>
                <View style={{flex: 1}}>
                    <FlatList automaticallyAdjustContentInsets={false}
                              data={this.state.contacts}
                              renderItem={({item}) => (
                                  <TouchableHighlight onPress={() =>
                                      this.props.navigation.navigate('ViewDetail', {contact: {item}})}>
                                      <ListItem titleStyle={styles.item} subtitleStyle={styles.item1}
                                                title={`${nvl(item.givenName, '')} ${nvl(item.middleName, '')} ${nvl(item.familyName, '')}`}
                                                subtitle={item.phoneNumbers[0].number}
                                                containerStyle={{borderBottomWidth: 0}}
                                      />
                                  </TouchableHighlight>
                              )}
                              keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }

    searchFilterFunction = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${nvl(item.givenName, '').toUpperCase()} ${nvl(item.middleName, '').toUpperCase()} ${nvl(item.familyName, '').toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({contacts: newData});
        this.setState({search: text});
    };
}

const ViewDetailStack = createStackNavigator({
        ContactList: {
            screen: ContactList, navigationOptions: () => ({
                gesturesEnabled: false,
            })
        },
        ViewDetail: {
            screen: ViewContact, navigationOptions: () => ({
                gesturesEnabled: false,
            })
        },
    },
    {
        headerMode: 'none',
        initialRouteName: 'ContactList',
    });
export default ViewDetailStack;
