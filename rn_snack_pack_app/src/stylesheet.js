import {StyleSheet} from 'react-native';

export const global_stylesheet = StyleSheet.create({

    screen_container: {
        padding: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#EBEBEB'
    },

    basic_container: {
        backgroundColor: "#FFF",
        marginBottom: 6,
        marginRight: 6,
    },

    thick_basic_container: {
        backgroundColor: "#FFF",
        marginBottom: 6,
        marginRight: 6,
        padding: 4
    },

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

    full_width_style: {
        width: '100%',
    },

    back_style: {
        color: '#fdfdfd',
        backgroundColor: '#4Af',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    data_title_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },

    data_style: {
        color: '#444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },

    loading_text: {
        flex: 1,
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    },

    error_message_style: {
        color: '#F44',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'top',
        textTransform: 'none',
        padding: 4,
    },

    green_button_style: {
        color: '#fff',
        backgroundColor: '#4A4',
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