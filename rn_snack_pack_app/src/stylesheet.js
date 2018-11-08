import {StyleSheet} from 'react-native';

export const global_stylesheet = StyleSheet.create({

    horizontal_container_tight: {
        flexDirection: 'row',
    },

    horizontal_container_loose: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    title_style: {
        flex: 1,
        color: '#444',
        backgroundColor: '#fff',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
        marginBottom: 6,
        marginRight: 6,
        marginTop: 6
    },

    menu_style: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        color: '#4AF',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingHorizontal: 24,
        paddingVertical: 4,
        marginVertical: 6
    },

    back_button_style: {
        width: '100%',
    },

    back_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

});