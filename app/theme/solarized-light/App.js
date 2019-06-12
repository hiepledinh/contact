import {StyleSheet} from 'react-native';
import colorS from '../../config/color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: colorS.background,
    },
    title: {
        textAlign: 'center',
        color: colorS.dark,
        fontSize: 30,
        fontWeight: 'bold',
    },
    title1: {
        textAlign: 'center',
        color: colorS.dark,
        fontSize: 25,
        fontWeight: 'bold',
    },
    accent: {
        color: colorS.shadow,
        fontWeight: 'bold',
    },
    item: {
        fontSize: 20,
        color: colorS.shadow,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    item1: {
        fontSize: 15,
        color: colorS.shadow,
        marginLeft: 20,
    },
    boder:{
        borderWidth: 1,
        borderColor: colorS.shadow,
    }
    ,
    borderBottom:{
        borderBottomColor: colorS.shadow,
        borderBottomWidth: 1,
    }
});