/**
 * @author Stephen Davis
 *
 * @description this is a view for the order information of a snack-pack item
 *
 */

import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

export default class OrderItemView extends Component {
    spname;     // the name of the snack-pack
    spprice;    // the value of the price

    constructor(props) {
        super(props);
        this.state = {spquantity: 0}
        this.setQuantity = this.setQuantity.bind(this);
    }

    setQuantity = (q) => {
        this.setState({spquantity: q});
    }

    render() {
        let roundedPrice = Number(`${this.props.spprice * this.state.spquantity}`).toFixed(2);

        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <View>
                        <Text style={styles.name_style}>{this.props.spname}</Text>
                        <Text/>
                    </View>
                    <View style={styles.horizontal_container}>
                        <View>
                            <View style={styles.horizontal_container}>
                                <Text style={styles.information_style}>Quantity: </Text>
                                <Text style={styles.information_style}>{this.state.spquantity}</Text>
                            </View>
                            <View style={styles.horizontal_container}>
                                <Text style={styles.information_style}>Price: </Text>
                                <Text style={styles.information_style}>${this.props.spprice}</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.quantity_button}
                                              onPress={() => this.setQuantity(this.state.spquantity + 1)}>
                                <Text style={styles.quantity_button_text}> + </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.quantity_button}
                                              onPress={() => this.setQuantity(this.state.spquantity - 1)}>
                                <Text style={styles.quantity_button_text}> - </Text>
                            </TouchableOpacity>
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

    quantity_button: {
        backgroundColor: '#4488AA'
    },

    quantity_button_text: {
        color: '#FFF',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
    }

});
