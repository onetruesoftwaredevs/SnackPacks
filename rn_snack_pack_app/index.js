/** @format */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// disables warnings
console.disableYellowBox = true;
// starts the application
AppRegistry.registerComponent(appName, () => App);
