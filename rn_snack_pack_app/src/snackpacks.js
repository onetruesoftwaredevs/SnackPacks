// snackpacks.js
import React, {Component} from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation'
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import SnackPackMenuView from "./components/SnackPackMenuView";
import CartView from "./components/CartView";
import DriverOrderView from "./components/DriverOrderView";

export const SnackPacks = TabNavigator({
    Menu: {
        screen: SnackPackMenuView,
    },
    Cart: {
        screen: CartView,
    },
    Drivers: {
        screen: DriverOrderView,
    },
});


// legacy code
/*
export class SnackPacks extends Component {
    constructor(props) {
        super();
        this.state = {
            screen: 1,
            isLoading: true,
            dataSource: []
        };
    }

    componentDidMount() {
        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks?command=list", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.setState({
                isLoading: false,
                dataSource: responseJson
            }));
    }

    setMenuScreen = () => {
        this.setState({screen: 1});
    };

    setCartScreen = () => {
        this.setState({screen: 2})
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loading_text}>Loading Screen</Text>
                </View>
            );
        }

        if (this.state.screen === 1) {
            return (
                <View style={styles.container}>
                    <SnackPackMenuView spdata={this.state.dataSource}/>
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

    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loading_text: {
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
*/
