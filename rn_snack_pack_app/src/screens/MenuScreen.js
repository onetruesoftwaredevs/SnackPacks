/**
 * @author Stephen Davis
 *
 * @description this is a view for each individual snack-pack
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SnackPackView from "../components/menu/SnackPackView";
import Menu from "../function/Menu";
import ScreenHeader from "../components/misc/ScreenHeader";
import {global_stylesheet} from "../stylesheet";
import SearchBar from "../components/menu/SearchBar";

export default class MenuScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            dataSource: [],
            search: 'none',
        };
    }

    _onSearch = () => {
        this.setState({search: Menu.getInstance().getSearchTerm()});
    };

    _goToCart = () => {
        this.props.navigation.navigate("Cart");
    };

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
                <View style={global_stylesheet.screen_container}>
                    <Text style={global_stylesheet.loading_text}>Loading Screen</Text>
                </View>
            );
        }

        return (
            <View style={global_stylesheet.screen_container}>
                <ScreenHeader title={"SnackPacks"} navigation={this.props.navigation} isDefaultScreen={true}/>
                <SearchBar onSearch={this._onSearch}/>
                <View style={{position: 'relative', zIndex: 0}}>
                    <FlatList
                        data={Menu.getInstance().getData()}
                        extraData={this.state}
                        keyExtractor={(item) => item._name}
                        renderItem={({item}) => <SnackPackView
                            spname={item._name}
                            spprice={item._cost}
                            sprating={3}
                            spallergylist={item._allergens}
                            spcontentlist={item._contents}
                            spimage={item.image_path}
                            navigation={this.props.navigation}
                            parent={this}
                        />}
                    />
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this._goToCart}>
                        <Text style={styles.text_style}>Go to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 12,
        bottom: 6,
        zIndex: 1,
        width: '35%',
    },

    text_style: {
        fontSize: 18,
        padding: 12,
        backgroundColor: '#4AF',
        color: '#FFF',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 4,
    },
});

