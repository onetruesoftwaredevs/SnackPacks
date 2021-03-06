/**
 * @author Stephen Davis
 *
 * @description the generic search bar
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../../stylesheet";
import Menu from "../../function/Menu";

export default class SearchBar extends Component {

    onSearch;           // function
    onSort;             // function
    onFilterPrice;      // function
    onFilterAllergy;    // function

    constructor(props) {
        super(props);
        this.state = {
            showFilters: false,
            selectedSearchOption: 'name',
            selectedSortOption: 'popularity',
            selectedPriceRange: 'none',
            selectedAllergy: 'none',
            search: 'none'
        };
    }

    _onFilter = () => {
        this.setState({showFilters: !this.state.showFilters});
    };

    _onSearch = () => {
        if (this.state.search === '') {
            Menu.getInstance().setSearchTerm('none');
        } else {
            Menu.getInstance().setSearchTerm(this.state.search);
        }
        if (this.props.onSearch !== undefined) {
            this.props.onSearch();
        }
    };

    _selectName = () => {
        this.setState({selectedSearchOption: 'name'});
        Menu.getInstance().setSearchFilter('name');
    };

    _selectContents = () => {
        this.setState({selectedSearchOption: 'contents'});
        Menu.getInstance().setSearchFilter('contents');
    };

    _selectAllergy = () => {
        this.setState({selectedSearchOption: 'allergens'});
        Menu.getInstance().setSearchFilter('allergens');
    };

    _selectPopularity = () => {
        this.setState({selectedSortOption: 'popularity'});
        Menu.getInstance().setSortFilter('popularity');
        if (this.props.onSort !== undefined) {
            this.props.onSort();
        }
    };

    _selectReviews = () => {
        this.setState({selectedSortOption: 'reviews'});
        Menu.getInstance().setSortFilter('reviews');
        if (this.props.onSort !== undefined) {
            this.props.onSort();
        }
    };

    _selectNoPriceRange = () => {
        this.setState({selectedPriceRange: 'none'});
        Menu.getInstance().setPriceFilter('none');
        if (this.props.onFilterPrice !== undefined) {
            this.props.onFilterPrice();
        }
    };

    _selectPriceRange1 = () => {
        this.setState({selectedPriceRange: 'range1'});
        Menu.getInstance().setPriceFilter('range1');
        if (this.props.onFilterPrice !== undefined) {
            this.props.onFilterPrice();
        }
    };

    _selectPriceRange2 = () => {
        this.setState({selectedPriceRange: 'range2'});
        Menu.getInstance().setPriceFilter('range2');
        if (this.props.onFilterPrice !== undefined) {
            this.props.onFilterPrice();
        }
    };

    _selectNoAllergy = () => {
        this.setState({selectedAllergy: 'none'});
        Menu.getInstance().setAllergyFilter('none');
        if (this.props.onFilterAllergy !== undefined) {
            this.props.onFilterAllergy();
        }
    };

    _selectPeanutAllergy = () => {
        this.setState({selectedAllergy: 'peanut'});
        Menu.getInstance().setAllergyFilter('peanut');
        if (this.props.onFilterAllergy !== undefined) {
            this.props.onFilterAllergy();
        }
    };

    _selectDairyAllergy = () => {
        this.setState({selectedAllergy: 'dairy'});
        Menu.getInstance().setAllergyFilter('dairy');
        if (this.props.onFilterAllergy !== undefined) {
            this.props.onFilterAllergy();
        }
    };

    renderFilters() {
        let price_ranges = ["< $5", "< $10"];
        //let allergies = ["peanuts", "dairy"];

        let nameStyle = this.state.selectedSearchOption === 'name' ? styles.selected_search_option : styles.not_selected_option;
        let contentsStyle = this.state.selectedSearchOption === 'contents' ? styles.selected_search_option : styles.not_selected_option;
        let allergyStyle = this.state.selectedSearchOption === 'allergens' ? styles.selected_allergy_style : styles.not_selected_option;

        let popularityStyle = this.state.selectedSortOption === 'popularity' ? styles.selected_sort_option : styles.not_selected_option;
        let reviewStyle = this.state.selectedSortOption === 'popularity' ? styles.not_selected_option : styles.selected_sort_option;

        let no_range_style = this.state.selectedPriceRange === 'none' ? styles.selected_price_style : styles.not_selected_option;
        let range_1_style = this.state.selectedPriceRange === 'range1' ? styles.selected_price_style : styles.not_selected_option;
        let range_2_style = this.state.selectedPriceRange === 'range2' ? styles.selected_price_style : styles.not_selected_option;

        //let no_allergy_style = this.state.selectedAllergy === 'none' ? styles.selected_allergy_style : styles.not_selected_option;
        //let allergy_1_style = this.state.selectedAllergy === 'peanut' ? styles.selected_allergy_style : styles.not_selected_option;
        //let allergy_2_style = this.state.selectedAllergy === 'dairy' ? styles.selected_allergy_style : styles.not_selected_option;

        return this.state.showFilters ? (
            <View>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.data_title_style}>Search by</Text>
                    <View style={global_stylesheet.horizontal_container_tight}>
                        <TouchableOpacity onPress={this._selectName}>
                            <Text style={nameStyle}>name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._selectContents}>
                            <Text style={contentsStyle}>contents</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._selectAllergy}>
                            <Text style={allergyStyle}>allergies</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.data_title_style}>Sort by</Text>
                    <View style={global_stylesheet.horizontal_container_tight}>
                        <TouchableOpacity onPress={this._selectPopularity}>
                            <Text style={popularityStyle}>popularity</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._selectReviews}>
                            <Text style={reviewStyle}>reviews</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <Text style={global_stylesheet.data_title_style}>Price Range</Text>
                    <View style={global_stylesheet.horizontal_container_tight}>
                        <TouchableOpacity onPress={this._selectNoPriceRange}>
                            <Text style={no_range_style}>none</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._selectPriceRange1}>
                            <Text style={range_1_style}>{price_ranges[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._selectPriceRange2}>
                            <Text style={range_2_style}>{price_ranges[1]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ) : (<View/>);
    }

    /*
    <View style={global_stylesheet.horizontal_container_loose}>
    <Text style={global_stylesheet.data_title_style}>Allergies</Text>
    <View style={global_stylesheet.horizontal_container_tight}>
    <TouchableOpacity onPress={this._selectNoAllergy}>
    <Text style={no_allergy_style}>none</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={this._selectPeanutAllergy}>
    <Text style={allergy_1_style}>{allergies[0]}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={this._selectDairyAllergy}>
    <Text style={allergy_2_style}>{allergies[1]}</Text>
    </TouchableOpacity>
    </View>
    </View>
    */
    render() {
        let placeholder = this.state.selectedSearchOption === 'name' ?
            'search by name ' :
            this.state.selectedSearchOption === 'contents' ? 'search by contents' : "exclude allergy";

        return (
            <View style={global_stylesheet.basic_container}>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <View style={global_stylesheet.horizontal_container_tight}>
                        <TouchableOpacity onPress={this._onFilter}>
                            <Text style={styles.icon_style}> = </Text>
                        </TouchableOpacity>
                        <TextInput style={styles.header_style} placeholder={placeholder} editable={true}
                                   multiline={false} onChangeText={(text) => this.setState({search: text})}/>
                    </View>
                    <TouchableOpacity onPress={this._onSearch}>
                        <Text style={styles.icon_style}>> </Text>
                    </TouchableOpacity>
                </View>

                {this.renderFilters()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    selected_search_option: {
        color: '#fff',
        backgroundColor: '#4AF',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    selected_sort_option: {
        color: '#fff',
        backgroundColor: '#4AA',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    selected_price_style: {
        color: '#fff',
        backgroundColor: '#4A4',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    selected_allergy_style: {
        color: '#fff',
        backgroundColor: '#F44',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    not_selected_option: {
        color: '#444',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },

    icon_style: {
        color: '#444',
        fontSize: 32,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        paddingHorizontal: 16,
        padding: 4
    },

    header_style: {
        color: '#444',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'justify',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 4
    },
});
