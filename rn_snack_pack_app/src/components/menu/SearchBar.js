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
            selectedOption: 'name',
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
        this.setState({selectedOption: 'name'});
        Menu.getInstance().setSearchFilter('name');
    };

    _selectAllergens = () => {
        this.setState({selectedOption: 'allergens'})
    };

    render() {
        let nameStyle = this.state.selectedOption === 'name' ? styles.selected_option : styles.not_selected_option;
        let allergensStyle = this.state.selectedOption === 'name' ? styles.not_selected_option : styles.selected_option;
        let placeholder = this.state.selectedOption === 'name' ? 'search by name ' : 'search by allergens ';

        let filters = this.state.showFilters ? (
            <View style={global_stylesheet.horizontal_container_tight}>
                <TouchableOpacity onPress={this._selectName}>
                    <Text style={nameStyle}>name</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._selectAllergens}>
                    <Text style={allergensStyle}>allergens</Text>
                </TouchableOpacity>
            </View>
        ) : (<View/>);

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

                {filters}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    selected_option: {
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
