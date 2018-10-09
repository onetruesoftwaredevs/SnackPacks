/**
 * @author Stephen Davis
 *
 * @description this is a view for the order information of a snack-pack item
 *
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Cart from '../function/Cart.js'

export default class OrderItemView extends Component {
    spname;     // the name of the snack-pack
    spprice;    // the value of the price
    spquantity;
    removeFromCartFunction;

    constructor(props) {
        super(props);
        this.state = {state_quantity: this.props.spquantity};
        this.setQuantity = this.setQuantity.bind(this);
    }

    setQuantity = (name, q) => {
        Cart.getInstance().setQuantity(name, q);
        this.setState({state_quantity: q});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <View>
                        <Text style={styles.name_style}>{this.props.spname}</Text>
                        <View style={styles.horizontal_button_container}>
                            <TouchableOpacity style={styles.modify_button_style}>
                                <Text style={styles.button_text_style}>Modify</Text>
                            </TouchableOpacity>
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
