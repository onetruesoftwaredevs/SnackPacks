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

    onSearch; // function

    constructor(props) {
        super();
        this.state = {
            showFilters: false,
            selectedSearchOption: 'name',
            selectedSortOption: 'popularity',
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
        this.setState({selectedSearchOption: 'allergens'});
        Menu.getInstance().setSearchFilter('contents');
    };

    _selectPopularity = () => {
        this.setState({selectedSortOption: 'popularity'});
        Menu.getInstance().setSortFilter('popularity');
    };

    _selectReviews = () => {
        this.setState({selectedSortOption: 'reviews'});
        Menu.getInstance().setSortFilter('reviews');
    };

    renderFilters() {
        let nameStyle = this.state.selectedSearchOption === 'name' ? styles.selected_search_option : styles.not_selected_option;
        let contentsStyle = this.state.selectedSearchOption === 'name' ? styles.not_selected_option : styles.selected_search_option;
        let popularityStyle = this.state.selectedSortOption === 'popularity' ? styles.selected_sort_option : styles.not_selected_option;
        let reviewStyle = this.state.selectedSortOption === 'popularity' ? styles.not_selected_option : styles.selected_sort_option;

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
            </View>
        ) : (<View/>);
    }

    render() {
        let placeholder = this.state.selectedSearchOption === 'name' ? 'search by name ' : 'search by contents ';

        return (
            <View style={global_stylesheet.basic_container}>
                <View style={global_stylesheet.horizontal_container_loose}>
                    <View style={global_stylesheet.horizontal_container_tight}>
                        <TouchableOpacity onPress={this._onFilter}>
                            <Text style={global_stylesheet.header_style}> = </Text>
                        </TouchableOpacity>
                        <TextInput style={global_stylesheet.header_style} placeholder={placeholder} editable={true}
                                   multiline={false} onChangeText={(text) => this.setState({search: text})}/>
                    </View>
                    <TouchableOpacity onPress={this._onSearch}>
                        <Text style={global_stylesheet.header_style}>> </Text>
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
    }
});