// snackpacks.js
import React, {Component} from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import DriverScreen from "./screens/DriverScreen";
import OrdersView from "./components/driver/OrdersView";
import DetailedOrderView from "./components/driver/DetailedOrderView";
import OrderScreen from "./screens/OrderScreen";
import DriverProfile from "./components/driver/DriverProfile";
import ReviewBuilderView from "./components/misc/ReviewBuilderView";
import CustomSnackPackScreen from "./screens/CustomSnackPackScreen";
import CustomSnackPackView from "./components/custom/CustomSnackPackView";

const DriverNavigation = StackNavigator({
    DriversScreen: {
        screen: DriverScreen,
    },

    OrdersView: {
        screen: OrdersView,
    },
    DetailedOrderView: {
        screen: DetailedOrderView,
    },
    DriverProfile: {
        screen: DriverProfile,
    },
    ReviewBuilderView:{
        screen: ReviewBuilderView,
    }
}, {
    headerMode: 'none',
});

const OrderNavigation = StackNavigator({
    Orders: {
        screen: OrderScreen,
    },

    DetailedOrderView: {
        screen: DetailedOrderView,
    },

    DriverProfile: {
        screen: DriverProfile,
    },
    ReviewBuilderView:{
        screen: ReviewBuilderView,
    },
}, {
    headerMode: 'none',
});

const CustomNavigation = StackNavigator({
    Custom: {
        screen: CustomSnackPackScreen,
    },
    CustomSnackPack: {
        screen: CustomSnackPackView,
    }
},{
    headerMode: 'none',
});


export const SnackPacks = DrawerNavigator({
    Custom: {
        screen: CustomNavigation,
    },

    Menu: {
        screen: MenuScreen,
    },
    Cart: {
        screen: CartScreen,
    },
    Drivers: {
        screen: DriverNavigation,
    },
    Orders: {
        screen: OrderNavigation,
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
                    <MenuScreen spdata={this.state.dataSource}/>
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
                    <CartScreen/>
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
