// snackpacks.js
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import SnackPackView from './components/SnackPackView'
import SnackPackMenuView from "./components/SnackPackMenuView";
import CartView from "./components/CartView";
import SnackConnector from './function/SnackConnector.js'

export default class SnackPacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 2
        };

        SnackConnector.init();
    }

    setMenuScreen = () => {
        this.setState({screen: 1});
    }

    setCartScreen = () => {
        this.setState({screen: 2})
    }

    render() {
        if (this.state.screen === 1) {
            return (
                <View style={styles.container}>
                    <SnackPackMenuView/>
                    <View style={styles.horizontal_container}>
                        <TouchableOpacity onPress={this.setMenuScreen}>
                            <Text style={styles.button_text_style}>Menu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.setCartScreen}>
                            <Text style={styles.button_text_style}>Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (this.state.screen === 2) {
            return (
                <View style={styles.container}>
                    <CartView/>
                    <View style={styles.horizontal_container}>
                        <TouchableOpacity onPress={this.setMenuScreen}>
                            <Text style={styles.button_text_style}>Menu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.setCartScreen}>
                            <Text style={styles.button_text_style}>Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    button_text_style: {
        color: '#444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    }
});