import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {global_stylesheet} from "../stylesheet";
import {Auth} from 'aws-amplify';
import ScreenHeader from "../components/misc/ScreenHeader";
import RNRestart from 'react-native-restart';

export default class LogoutScreen extends Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        Auth.signOut()
            .then(data => {
                console.log(data)
                RNRestart.Restart();
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <View style={global_stylesheet.screen_container}>
                <View>
                    <ScreenHeader title="Logout" navigation={this.props.navigation}
                                  isDefaultScreen={true}/>
                    <TouchableOpacity onPress={this.logout} style={global_stylesheet.full_width_margin_style}>
                        <Text style={styles.back_style}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    back_style: {
        color: '#fdfdfd',
        backgroundColor: '#44AAff',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'none',
        textAlignVertical: 'center',
        textTransform: 'none',
        padding: 8
    },
});
