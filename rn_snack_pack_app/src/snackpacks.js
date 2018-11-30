// snackpacks.js
import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation'
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import DriverScreen from "./screens/DriverScreen";
import OrdersView from "./components/driver/OrdersView";
import DetailedOrderView from "./components/driver/DetailedOrderView";
import CheckoutView from "./payment/CheckoutView";
import OrderScreen from "./screens/OrderScreen";
import DriverProfile from "./components/driver/DriverProfile";
import CustomSnackPackScreen from "./screens/CustomSnackPackScreen";
import CustomSnackPackView from "./components/custom/CustomSnackPackView";
import CustomSnackPackComponentView from "./components/custom/CustomSnackPackComponentView";
import CustomSnackPackComponent from "./components/custom/CustomSnackPackComponent";
import DetailedSnackPackView from "./components/menu/DetailedSnackPackView";
import PaymentView from "./components/cart/PaymentView";
import CustomSnackPackCreatorView from "./components/custom/CustomSnackPackCreatorView";
import ReviewBuilder from "./components/misc/ReviewBuilder";
import AddressBuilder from "./components/cart/AddressBuilder";
import { Auth } from 'aws-amplify';

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
    ReviewBuilder: {
        screen: ReviewBuilder,
    }
}, {
    headerMode: 'none',
});

const PaymentNavigation = StackNavigator({
    CartScreen: {
        screen: CartScreen,
    },
    CheckoutView: {
        screen: CheckoutView,
    },
    PaymentView: {
        screen: PaymentView,
    },
    AddressBuilder: {
        screen: AddressBuilder,
    }
}, {
    headerMode: "none",
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
    ReviewBuilder: {
        screen: ReviewBuilder,
    },
}, {
    headerMode: 'none',
});

const CustomNavigation = StackNavigator({
    Custom: {
        screen: CustomSnackPackScreen,
    },
    CustomSnackPackView: {
        screen: CustomSnackPackView,
    },
    CustomSnackPackComponentView: {
        screen: CustomSnackPackComponentView,
    },
    CustomSnackPackComponent: {
        screen: CustomSnackPackComponent,
    },
    CustomSnackPackCreatorView: {
        screen: CustomSnackPackCreatorView,
    }
}, {
    headerMode: 'none',
});

const MenuNavigation = StackNavigator({
    Menu: {
        screen: MenuScreen,
    },
    DetailedSnackPackView: {
        screen: DetailedSnackPackView,
    },
    ReviewBuilder: {
        screen: ReviewBuilder,
    }
}, {
    headerMode: 'none',
});


export const Users = DrawerNavigator({
    Menu: {
        screen: MenuNavigation,
    },
    Custom: {
        screen: CustomNavigation,
    },
    Cart: {
        screen: PaymentNavigation,
    },
    Orders: {
        screen: OrderNavigation,
    },
    Drivers: {
        screen: DriverNavigation,
    }
});

export const Drivers = DrawerNavigator({
    Drivers: {
        screen: DriverNavigation,
    }
});

export function logout(){
    Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
}


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
