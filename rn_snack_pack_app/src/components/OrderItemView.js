/**
 * @author Stephen Davis
 *
 * @description this is a view for the order information of a snack-pack item
 *
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Cart from '../function/Cart.js'
import QuantityComponent from "./QuantityComponent";

export default class OrderItemView extends Component {
    spname;     // the name of the snack-pack
    spprice;    // the value of the price
    spquantity; // the quantity of snack-packs

    removeFromCartFunction; // callback function for removing snack-packs
    setQuantityCallback;    // callback function for setting the quantity of a snack-pack

    constructor(props) {
        super();
        this.state = {isModifying: false}
    }

    incrementQuantity = (component) => {
        //Cart.getInstance().setQuantity(component.props.spname, component.state.quantity + 1);
        //() => this.props.setQuantityCallback(this.spname, component.state.quantity + 1);
        component.setState((prevState) =>
                ({quantity: prevState.quantity + 1}),
            this.props.setQuantityCallback(this.spname, component.state.quantity));
    };

    decrementQuantity = (component) => {
        if (component.state.quantity > 0) {
            component.setState(prevState => ({quantity: prevState.quantity - 1}));
        }
        Cart.getInstance().setQuantity(component.props.spname, component.state.quantity);
        if (component.state.quantity === 1) {
            // remove from cart
            this.props.removeFromCartFunction(this.props.spname);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <View>
                        <Text style={styles.name_style}>{this.props.spname}</Text>
                        <View style={styles.horizontal_button_container}>
                            <QuantityComponent
                                spname={this.props.spname}
                                spprice={this.props.spprice}
                                spquantity={this.props.spquantity}
                                defaultText={'Modify'}
                                defaultTextSize={12}
                                buttonPressedFunction={this.incrementQuantity}
                                increaseFunction={this.incrementQuantity}
                                decreaseFunction={this.decrementQuantity}
                            />
                            <TouchableOpacity
                                style={styles.remove_button_style}
                                onPress={() => this.props.removeFromCartFunction(this.props.spname)}
                            >
                                <Text style={styles.button_text_style}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.horizontal_container}>
                        <View>
                            <View style={styles.horizontal_container}>
                                <Text style={styles.information_style}>Quantity: </Text>
                                <Text style={styles.information_style}>{this.props.spquantity}</Text>
                            </View>
                            <View style={styles.horizontal_container}>
                                <Text style={styles.information_style}>Price: </Text>
                                <Text style={styles.information_style}>${this.props.spprice}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 4,
    },

    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DEDEDE'
    },

    horizontal_button_container: {
        flexDirection: 'row',
        backgroundColor: '#DEDEDE'
    },

    name_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 2
    },

    information_style: {
        color: '#444',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 2,
    },

    modify_button_style: {
        backgroundColor: '#4488AA'
    },

    remove_button_style: {
        backgroundColor: '#FF2244'
    },

    button_text_style: {
        color: '#FFF',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    }

});


