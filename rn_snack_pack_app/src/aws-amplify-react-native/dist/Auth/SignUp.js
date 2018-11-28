/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import React from 'react';
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Auth, I18n, Logger } from 'aws-amplify';
import { FormField, LinkCell, Header, ErrorRow, AmplifyButton } from '../AmplifyUI';
import AuthPiece from './AuthPiece';

const logger = new Logger('SignUp');
export default class SignUp extends AuthPiece {
    constructor(props) {
        super(props);

        this._validAuthStates = ['signUp'];
        this.state = {
            username: null,
            password: null,
            email: null,
            phone_number: null
        };

        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        const { username, password, email, phone_number } = this.state;
        logger.debug('Sign Up for ' + username);
        Auth.signUp(username, password, email, phone_number).then(data => {
            logger.debug(data);
            this.changeState('confirmSignUp', username);
        }).catch(err => this.error(err));
    }

    showComponent(theme) {
        return React.createElement(
            TouchableWithoutFeedback,
            { onPress: Keyboard.dismiss, accessible: false },
            React.createElement(
                View,
                { style: theme.section },
                React.createElement(
                    Header,
                    { theme: theme },
                    I18n.get('Create a new account')
                ),
                React.createElement(
                    View,
                    { style: theme.sectionBody },
                    React.createElement(FormField, {
                        theme: theme,
                        onChangeText: text => this.setState({ username: text }),
                        label: I18n.get('Username'),
                        placeholder: I18n.get('Enter your username'),
                        required: true
                    }),
                    React.createElement(FormField, {
                        theme: theme,
                        onChangeText: text => this.setState({ password: text }),
                        label: I18n.get('Password'),
                        placeholder: I18n.get('Enter your password'),
                        secureTextEntry: true,
                        required: true
                    }),
                    React.createElement(FormField, {
                        theme: theme,
                        onChangeText: text => this.setState({ email: text }),
                        label: I18n.get('Email'),
                        placeholder: I18n.get('Enter your email'),
                        keyboardType: 'email-address',
                        required: true
                    }),
                    React.createElement(FormField, {
                        theme: theme,
                        onChangeText: text => this.setState({ phone_number: text }),
                        label: I18n.get('Phone Number'),
                        placeholder: I18n.get('Enter your phone number'),
                        keyboardType: 'phone-pad',
                        required: true
                    }),
                    React.createElement(AmplifyButton, {
                        text: I18n.get('Sign Up').toUpperCase(),
                        theme: theme,
                        onPress: this.signUp,
                        disabled: !this.state.username || !this.state.password
                    })
                ),
                React.createElement(
                    View,
                    { style: theme.sectionFooter },
                    React.createElement(
                        LinkCell,
                        { theme: theme, onPress: () => this.changeState('confirmSignUp') },
                        I18n.get('Confirm a Code')
                    ),
                    React.createElement(
                        LinkCell,
                        { theme: theme, onPress: () => this.changeState('signIn') },
                        I18n.get('Sign In')
                    )
                ),
                React.createElement(
                    ErrorRow,
                    { theme: theme },
                    this.state.error
                )
            )
        );
    }
}