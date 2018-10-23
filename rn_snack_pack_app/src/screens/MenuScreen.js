/**
 * @author Stephen Davis
 *
 * @description this is a view for each individual snack-pack
 */

import React, {Component} from 'react';
import {FlatList, Alert, StyleSheet, Text, View} from 'react-native';
import SnackPackView from "../components/menu/SnackPackView";

export default class MenuScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            dataSource: [],
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({dataSource: this.state.dataSource});
        });

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks?command=list", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.setState({
                isLoading: true, //set to true when link isn't working
                dataSource: responseJson
            }));

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loading_text}>Loading Screen</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title_style}>Snack Packs</Text>
                <FlatList
                    style={styles.flatlist_style}
                    data={this.state.dataSource}
                    renderItem={({item}) => <SnackPackView
                        spname={item._name}
                        spprice={item._cost}
                        sprating={3}
                        spallergylist={item._allergens}
                        spimage={item.image_path}
                    />}
                    extraData={this.state}
                    keyExtractor={(item) => item._name}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        width: '100%',
        height: '100%',
    },

    flatlist_style: {
        height: '45%'
    },

    title_style: {
        color: '#444',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
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
});