import React, {Component} from 'react';
import {Text, View, FlatList, TouchableHighlight} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import CONTACT from 'react-native-contacts';
import {ListItem, SearchBar} from 'react-native-elements';
import colorS from '../config/color';
import {strings} from '../config/locales/i18n';
import {nvl, trimInside} from '../utils/StringUtils.js';
import {createStackNavigator} from 'react-navigation';
import ViewContact from './ViewContact';
import apiClient from 'axios';

const styles = require('../theme')('App');
const requestUrl = 'http://vntelecom.vnta.gov.vn:10245/apps/api/checkNumber?phone_number=';

class MnpContact extends Component {
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
            let holdData = [];
            CONTACT.getAll((err, contactsFromPhone) => {
                if (err === 'denied') {
                    // error
                } else {
                    contactsFromPhone.forEach(async function (contact, index, array) {
                        await getMnp(trimInside(contact.phoneNumbers[0].number))
                            .then((result) => {
                                console.log('arrayxxxs ' + index + '--' + result);
                                array[index].suffix = result;
                            });
                        // apiClient.get(requestUrl + trimInside(contact.phoneNumbers[0].number))
                        //     .then(function (response) {
                        //         return JSON.stringify(response);
                        //     }).then(function (json) {
                        //     let data = JSON.parse(json);
                        //     console.warn('1:' + data.data.origin_telco);
                        //     array[index].suffix = data.data.origin_telco;
                        //     console.warn('2:' + array[index].suffix);
                        // }).catch(function (e) {
                        //     console.warn(e);
                        // }).finally(() => {
                        //     console.warn('done');
                        // });
                    });
                }
                holdData = holdData.concat(contactsFromPhone);
                this.arrayholder = holdData;
                this.setState({contacts: holdData});
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {strings('title.mnpContact')}
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
                                                title={`${nvl(item.givenName, '')} ${nvl(item.middleName, '')} ${nvl(item.familyName, '')} ${nvl(item.suffix, '')}`}
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
        MnpContact: {
            screen: MnpContact, navigationOptions: () => ({
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
        initialRouteName: 'MnpContact',
    });
export default ViewDetailStack;


const getMnp = (phoneNumber) => {
    return new Promise((resolve, reject) => {
        apiClient.get(`requestUrl${phoneNumber}`)
            .then(response => {
                return resolve(response.data.origin_telco)
            })
            .catch(error => {
                return reject(error.message)
            })
    })
}