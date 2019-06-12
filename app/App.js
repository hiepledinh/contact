import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';
import ContactList from './modules/ContactList';
import MnpContact from './modules/MnpContact';
import AddContact from './modules/AddContact';
import { strings } from './config/locales/i18n';

const TabNavigator = createBottomTabNavigator({
    ContactList: {
        screen: ContactList,
        navigationOptions: {
            tabBarLabel: `${strings('tab.contact')}`,
            tabBarIcon: ({tintColor}) => <Icon name="bars" type="antdesign" size={25} color={tintColor}/>
        },
    },
    MnpContact: {
        screen: MnpContact,
        navigationOptions: {
            tabBarLabel: `${strings('tab.mnpContact')}`,
            tabBarIcon: ({tintColor}) => <Icon name="sync" type="antdesign" size={25} color={tintColor}/>
        },
    },
    AddContact: {
        screen: AddContact,
        navigationOptions: {
            tabBarLabel: `${strings('tab.addContact')}`,
            tabBarIcon: ({tintColor}) => <Icon name="adduser" type="antdesign" size={25} color={tintColor}/>
        },
    },
});

export default createAppContainer(TabNavigator);

