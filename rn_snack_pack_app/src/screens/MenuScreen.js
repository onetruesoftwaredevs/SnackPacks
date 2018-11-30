/**
 * @author Stephen Davis
 *
 * @description this is a view for each individual snack-pack
 */

import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SnackPackView from "../components/menu/SnackPackView";
import Menu from "../function/Menu";
import ScreenHeader from "../components/misc/ScreenHeader";
import {global_stylesheet} from "../stylesheet";
import SearchBar from "../components/menu/SearchBar";

export default class MenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            search: 'none',
            sort: 'popularity',
            price_filter: 'none',
            allergy_filter: 'none'
        };
    }

    _onSearch = () => {
        this.setState({search: Menu.getInstance().getSearchTerm()});
    };

    _onSort = () => {
        this.setState({sort: Menu.getInstance().getSortFilter()});
    };

    _onFilterPrice = () => {
        this.setState({price_filter: Menu.getInstance().getPriceFilter()});
    };

    _onFilterAllergy = () => {
        this.setState({allergy_filter: Menu.getInstance().getAllergyFilter()});
    };

    _goToCart = () => {
        this.props.navigation.navigate("Cart");
    };

    loadData = (responseJson) => {
        Menu.getInstance().setData(responseJson);
        this.setState({
            isLoading: false,
            dataSource: responseJson
        });
    };

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({isLoading: true});
            fetch("https://hz08tdry07.execute-api.us-east-2.amazonaws.com/prod/snackpacks?command=list", {method: 'GET'})
                .then(response => response.json())
                .then(responseJson => this.loadData(responseJson));
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
                <SearchBar onSearch={this._onSearch} onSort={this._onSort} onFilterPrice={this._onFilterPrice}
                           onFilterAllergy={this._onFilterAllergy}/>
                <ScrollView style={global_stylesheet.scroll_container}>
                    {Menu.getInstance().getData().map((item) =>
                        <SnackPackView
                            spname={item._name}
                            spprice={item._cost}
                            sprating={Menu.getAverageRating(item)}
                            spallergylist={item._allergens}
                            spcontentlist={item._contents}
                            spimage={item.image_path}
                            spkey={item._key}
                            spreviews={JSON.parse(item.reviews)}
                            navigation={this.props.navigation}
                            parent={this}
                        />)
                    }
                    <TouchableOpacity style={global_stylesheet.full_width_margin_style} onPress={this._goToCart}>
                        <Text style={global_stylesheet.blue_button_style}>Go to Cart</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

