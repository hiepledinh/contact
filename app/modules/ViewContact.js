import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {Clipboard} from 'react-native';
import {Image} from 'react-native-elements';
import {Container, Content, Button} from 'native-base';
import call from 'react-native-phone-call';

import colorS from '../config/color';
import {strings} from '../config/locales/i18n';
import {nvl, trimInside} from '../utils/StringUtils.js';

const styles = require('../theme')('App');

export default class ViewContact extends Component {
    calla = (number) => {
        //handler to make a call
        const args = {
            number: number,
            prompt: false,
        };

        call(args).catch(console.error);
    };

    render() {
        const {navigation} = this.props;
        const contact = navigation.getParam('contact').item;
        let phoneNumber = trimInside(contact.phoneNumbers[0].number);
        if (phoneNumber.startsWith('0')) {
            phoneNumber = '+84' + phoneNumber.substring(1);
        }
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
            }}>
                <View style={{
                    flex: 2,
                    backgroundColor: colorS.background,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: colorS.shadow,
                    borderBottomWidth: 1,
                }}>
                    <Image source={{uri: contact.thumbnailPath}}
                           style={{width: 120, height: 120, borderRadius: 120 / 2}}/>

                    <Text style={styles.title}>
                        {contact.givenName} {contact.middleName} {contact.familyName}
                    </Text>

                    {contact.company ? <Text style={styles.title1}>
                        {nvl(contact.company, '')}
                    </Text> : <Text/>}
                </View>
                <View
                    style={{
                        flex: 3,
                        backgroundColor: colorS.bright,
                        borderBottomColor: colorS.shadow,
                        borderBottomWidth: 1,
                    }}>
                    <TouchableHighlight underlayColor={colorS.highlight} onPress={() => {
                        this.calla(phoneNumber)
                    }} onLongPress={() => {
                        this.writeToClipboard(contact.phoneNumbers[0].number)
                    }}>
                        <View>
                            <Text style={{marginLeft: 20}}>{contact.phoneNumbers[0].label}</Text>
                            <Text style={styles.item}>{contact.phoneNumbers[0].number}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{
                    flex: 2,
                    backgroundColor: colorS.background,
                    borderBottomColor: colorS.shadow,
                    borderBottomWidth: 1,
                    alignItems: 'center'
                }}>
                    <Container style={{fontSize: 15, justifyContent: 'center', alignItems: 'stretch',}}>
                        <Content>
                            <Button info style={{width: '100%', marginBottom: 5, marginTop: 2}}>
                                <Text style={{
                                    fontSize: 15,
                                    color: colorS.background,
                                    textAlign: 'center',
                                    width: '100%',
                                }}>{strings('sendMessage')}</Text>
                            </Button>
                            <Button info style={{width: '100%', marginBottom: 5}}>
                                <Text style={{
                                    fontSize: 15,
                                    color: colorS.background,
                                    textAlign: 'center',
                                    width: '100%',
                                }}>{strings('blockContact')}</Text>
                            </Button>
                            <Button danger style={{width: '100%', marginBottom: 5}}>
                                <Text style={{
                                    fontSize: 15,
                                    color: colorS.background,
                                    textAlign: 'center',
                                    width: '100%',
                                }}>{strings('deleteContact')}</Text>
                            </Button>
                        </Content>
                    </Container>
                </View>
                <View>

                </View>
            </View>
        );
    }

    writeToClipboard = async (text) => {
        await Clipboard.setString(text);
        alert(`${strings('copied')}`);
    };
};
