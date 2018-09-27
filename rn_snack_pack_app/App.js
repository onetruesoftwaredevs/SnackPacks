/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SnackPacks from "./src/snackpacks";

//ref: https://docs.aws.amazon.com/aws-mobile/latest/developerguide/mobile-hub-react-native-getting-started.html#mobile-hub-react-native-getting-started-configure-aws-amplify
import Amplify, {API, Analytics,Storage} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import aws_exports from './src/aws-exports';

//Allow analytics & other aws backend to connect to mobile hub
Amplify.configure(aws_exports);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <SnackPacks/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
});
