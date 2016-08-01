import React, { Component, PropTypes, StyleSheet } from 'react';
import { View, Text, Image, IntentAndroid } from 'react-native';
import { Card, Button, COLOR, TYPO } from 'react-native-material-design';
//import CrosswalkWebView from 'react-native-webview-crosswalk';
import AppStore from '../stores/AppStore';
//import WebViewAndroid from 'react-native-webview-android';
export default class Welcome extends Component {

    static contextTypes = {
        navigator: PropTypes.object.isRequired
    };

    render() {
        const { navigator } = this.context;
        const theme = AppStore.getState().theme;
        const local = false;
        return (
          <View>
            <Text>
              empty
            </Text>
          </View>
        );
    }

}
var styles = {
  containerWebView: {
    flex: 1,
  }
};