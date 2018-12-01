var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { I18n } from 'aws-amplify';
import AmplifyTheme, { linkUnderlayColor, errorIconColor } from './AmplifyTheme';
import { Icon } from 'react-native-elements';

export const FormField = props => {
    const theme = props.theme || AmplifyTheme;
    return React.createElement(
        View,
        { style: theme.formField },
        React.createElement(
            Text,
            { style: theme.inputLabel },
            props.label,
            ' ',
            props.required ? '*' : ''
        ),
        React.createElement(TextInput, _extends({
            style: theme.input,
            autoCapitalize: 'none',
            autoCorrect: false
        }, props))
    );
};
export const SectionFooter = props => {
    const theme = props.theme || AmplifyTheme;
    return React.createElement(
        View,
        { style: theme.sectionFooter },
        React.createElement(
            LinkCell,
            { theme: theme, onPress: () => onStateChange('confirmSignUp') },
            I18n.get('Confirm a Code')
        ),
        React.createElement(
            LinkCell,
            { theme: theme, onPress: () => onStateChange('signIn') },
            I18n.get('Sign In')
        )
    );
};

export const LinkCell = props => {
    const theme = props.theme || AmplifyTheme;
    return React.createElement(
        View,
        { style: theme.cell },
        React.createElement(
            TouchableHighlight,
            { onPress: props.onPress, underlayColor: linkUnderlayColor },
            React.createElement(
                Text,
                { style: theme.sectionFooterLink },
                props.children
            )
        )
    );
};

export const Header = props => {
    const theme = props.theme || AmplifyTheme;
    return React.createElement(
        View,
        { style: theme.sectionHeader },
        React.createElement(
            Text,
            { style: theme.sectionHeaderText },
            props.children
        )
    );
};

export const ErrorRow = props => {
    const theme = props.theme || AmplifyTheme;
    if (!props.children) return null;
    return React.createElement(
        View,
        { style: theme.errorRow },
        React.createElement(Icon, { name: 'warning', color: errorIconColor }),
        React.createElement(
            Text,
            { style: theme.errorRowText },
            props.children
        )
    );
};

export const AmplifyButton = props => {
    const theme = props.theme || AmplifyTheme;
    let style = theme.button;
    if (props.disabled) {
        style = theme.buttonDisabled;
    }

    if (props.style) {
        style = [style, props.style];
    }

    return React.createElement(
        TouchableOpacity,
        _extends({}, props, { style: style }),
        React.createElement(
            Text,
            { style: theme.buttonText },
            props.text
        )
    );
};