/**
 * @author Stephen Davis
 *
 * @description this is a view for each individual snack-pack
 */

import React, {Component} from 'react';
import {FlatList, Alert, StyleSheet, Text, View} from 'react-native';
import SnackPackView from "../components/menu/SnackPackView";
import Menu from "../function/Menu";

export default class MenuScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            dataSource: [],
        };
    }

    loadData(responseJson) {
        Menu.getInstance().setData(responseJson);
        this.setState({
            isLoading: false,
            dataSource: responseJson
        });
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({dataSource: this.state.dataSource});
        });

        return fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks?command=list", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => this.loadData(responseJson));
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
                    data={Menu.getInstance().getData()}
                    extraData={this.state}
                    keyExtractor={(item) => item._name}
                    renderItem={({item}) => <SnackPackView
                        spname={item._name}
                        spprice={item._cost}
                        sprating={3}
                        spallergylist={item._allergens}
                        spimage={item.image_path}
                    />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        width: '100%',
        height: '100%',
    },

    flatlist_style: {
        height: '45%'
    },

    title_style: {
        color: '#444',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4,
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
});