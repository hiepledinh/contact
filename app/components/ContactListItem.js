import React, {Component} from 'react';
import {ListItem} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import {View, Text, FlatList, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';

import {listRepos} from '../reducer/reducer';
import {nvl} from '../utils/StringUtils.js';
import ViewContact from '../modules/ViewContact';

class ContactListItem extends Component {
    componentDidMount() {
        this.props.listRepos('relferreira');
    }

    render() {
        const {repos} = this.props;
        return (
            <View style={{flex: 1}}>
                <FlatList automaticallyAdjustContentInsets={false}
                          data={this.state.contacts}
                          renderItem={({item}) => (
                              <TouchableHighlight onPress={() =>
                                  this.props.navigation.navigate('ViewDetail', {contact: {item}})}>
                                  <ListItem titleStyle={styles.item} subtitleStyle={styles.item1}
                                            title={`${nvl(item.givenName, '')} ${nvl(item.middleName, '')} ${nvl(item.familyName, '')} ${nvl(' - ' + item.note, '')}`}
                                            subtitle={item.phoneNumbers[0].number}
                                            containerStyle={{borderBottomWidth: 0}}
                                  />
                              </TouchableHighlight>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    let storedRepositories = state.repos.map(repo => ({key: repo.id, ...repo}));
    return {
        repos: storedRepositories
    };
};

const mapDispatchToProps = {
    listRepos
};

const ViewDetailStack = createStackNavigator({
        MnpContact: {
            screen: ContactListItem, navigationOptions: ({navigation}) => ({
                gesturesEnabled: false,
            })
        },
        ViewDetail: {
            screen: ViewContact, navigationOptions: ({navigation}) => ({
                gesturesEnabled: false,
            })
        },
    },
    {
        headerMode: 'none',
        initialRouteName: 'MnpContact',
    });
export default connect(mapStateToProps, mapDispatchToProps)(ViewDetailStack);